const state = {
  selected: new URLSearchParams(location.search).get("palette") || localStorage.getItem("novax-palette") || "luanet",
  dark: (new URLSearchParams(location.search).get("theme") || localStorage.getItem("novax-theme") || "light") === "dark",
  family: "All",
  query: ""
};

const $ = selector => document.querySelector(selector);
const $$ = selector => [...document.querySelectorAll(selector)];
const TOKEN_LABELS = {
  primary:"Primary",onPrimary:"On primary",primaryContainer:"Primary container",onPrimaryContainer:"On primary container",
  secondary:"Secondary",secondaryContainer:"Secondary container",tertiary:"Tertiary",background:"Background",surface:"Surface",
  surfaceVariant:"Surface variant",onSurface:"On surface",onSurfaceVariant:"On surface variant",outline:"Outline",error:"Error",onError:"On error"
};

function selectedPalette() { return PALETTES.find(p => p.id === state.selected) || PALETTES[0]; }

function filteredPalettes() {
  const q=state.query.trim().toLowerCase();
  return PALETTES.filter(p => (state.family === "All" || p.family === state.family) && (!q || `${p.name} ${p.family} ${p.mood}`.toLowerCase().includes(q)));
}

function renderFilters() {
  const families=["All",...new Set(PALETTES.map(p=>p.family))];
  $("#family-filters").innerHTML=families.map(f=>`<button type="button" class="filter-chip ${state.family===f?"active":""}" data-family="${f}">${f}</button>`).join("");
  $$("[data-family]").forEach(button=>button.addEventListener("click",()=>{state.family=button.dataset.family;renderFilters();renderList();}));
}

function renderList() {
  const items=filteredPalettes();
  $("#palette-count").textContent=`${items.length}/${PALETTES.length}`;
  $("#no-results").hidden=items.length>0;
  $("#palette-list").innerHTML=items.map(p=>{
    const light=paletteTokens(p,false);
    return `<button type="button" class="palette-card ${p.id===state.selected?"selected":""}" data-palette="${p.id}" aria-pressed="${p.id===state.selected}">
      <span class="mini-palette"><i style="background:${light.primary}"></i><i style="background:${light.primaryContainer}"></i><i style="background:${light.secondary}"></i><i style="background:${light.tertiary}"></i><i style="background:${light.surfaceVariant}"></i></span>
      <span><strong>${p.name}</strong><small>${p.mood}</small></span><span class="check">✓</span></button>`;
  }).join("");
  $$("[data-palette]").forEach(button=>button.addEventListener("click",()=>selectPalette(button.dataset.palette)));
}

function applyTokens() {
  const p=selectedPalette(), tokens=paletteTokens(p,state.dark), root=document.documentElement;
  Object.entries(tokens).forEach(([key,value])=>root.style.setProperty(`--${key.replace(/[A-Z]/g,m=>`-${m.toLowerCase()}`)}`,value));
  root.dataset.theme=state.dark?"dark":"light";
  $("meta[name=theme-color]").content=tokens.background;
  $("#theme-toggle").setAttribute("aria-label",state.dark?"Switch to light theme":"Switch to dark theme");
  $("#palette-title").textContent=p.name;
  $("#palette-meta").textContent=`${p.family} · ${state.dark?"Dark":"Light"}`;
  $("#palette-description").textContent=p.mood.replace(/^./,c=>c.toUpperCase());
  $("#swatches").innerHTML=Object.entries(tokens).map(([key,value])=>`<button type="button" class="swatch" data-copy="${value}" aria-label="Copy ${TOKEN_LABELS[key]} ${value}"><i style="background:${value}"></i><span><strong>${TOKEN_LABELS[key]}</strong><code>${value}</code></span></button>`).join("");
  $$('[data-copy]').forEach(button=>button.addEventListener("click",()=>copyText(button.dataset.copy,`${button.dataset.copy} copied`)));
}

function selectPalette(id) {
  state.selected=id; localStorage.setItem("novax-palette",id);
  const params=new URLSearchParams(location.search);params.set("palette",id);params.set("theme",state.dark?"dark":"light");history.replaceState(null,"",`${location.pathname}?${params}`);
  renderList();applyTokens();
}

function exportCss() {
  const tokens=paletteTokens(selectedPalette(),state.dark);
  return `:root {\n${Object.entries(tokens).map(([k,v])=>`  --${k.replace(/[A-Z]/g,m=>`-${m.toLowerCase()}`)}: ${v};`).join("\n")}\n}`;
}

function copyText(text,message) {
  navigator.clipboard.writeText(text).then(()=>showToast(message)).catch(()=>showToast("Copy failed"));
}

let toastTimer;
function showToast(message) { const toast=$("#toast");toast.textContent=message;toast.classList.add("show");clearTimeout(toastTimer);toastTimer=setTimeout(()=>toast.classList.remove("show"),1800); }

$("#palette-search").addEventListener("input",event=>{state.query=event.target.value;renderList();});
$("#theme-toggle").addEventListener("click",()=>{state.dark=!state.dark;localStorage.setItem("novax-theme",state.dark?"dark":"light");selectPalette(state.selected);});
$("#copy-css").addEventListener("click",()=>copyText(exportCss(),"CSS copied"));
$("#copy-json").addEventListener("click",()=>copyText(JSON.stringify({id:state.selected,theme:state.dark?"dark":"light",tokens:paletteTokens(selectedPalette(),state.dark)},null,2),"JSON copied"));

$$("#component-nav button").forEach(button=>button.addEventListener("click",()=>{
  $$("#component-nav button").forEach(item=>item.setAttribute("aria-selected",item===button?"true":"false"));
  $$(".component-panel").forEach(panel=>panel.classList.toggle("active",panel.dataset.panel===button.dataset.panel));
}));

renderFilters();renderList();applyTokens();
