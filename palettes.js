const PALETTES = [
  ["luanet","LuaNet","Green","fresh calm","#087A37","#4F6354","#3B6472"],
  ["emerald","Emerald","Green","bright confident","#007A5A","#52634F","#316A73"],
  ["forest","Forest","Green","deep grounded","#356A38","#59624D","#53657A"],
  ["mint","Mint","Green","soft friendly","#16866B","#58645D","#5B637C"],
  ["sage","Sage","Green","quiet natural","#5D7258","#61625B","#5C6870"],
  ["lime","Lime","Green","energetic playful","#5D7800","#5C6351","#626000"],
  ["moss","Moss","Green","earthy focused","#5A6F2F","#626052","#6D5C40"],
  ["jade","Jade","Green","polished balanced","#008060","#4F635D","#4C6475"],
  ["nova-blue","Nova Blue","Blue","clear universal","#1769AA","#56616B","#665A78"],
  ["cobalt","Cobalt","Blue","bold technical","#2455B5","#5A5F70","#73566D"],
  ["azure","Azure","Blue","bright open","#0075C4","#536271","#675A79"],
  ["ocean","Ocean","Blue","deep trustworthy","#006B86","#566269","#4E6476"],
  ["ice","Ice","Blue","cool minimal","#3A7197","#59626A","#6B5D75"],
  ["navy","Navy","Blue","serious premium","#38558A","#5D6070","#70586B"],
  ["denim","Denim","Blue","casual capable","#3E6594","#5B626A","#735A65"],
  ["steel","Steel","Blue","industrial neutral","#4B687B","#5F6265","#6A5E73"],
  ["violet","Violet","Purple","creative modern","#7651C8","#635D6B","#81536A"],
  ["amethyst","Amethyst","Purple","rich expressive","#8152A8","#665E69","#795A55"],
  ["orchid","Orchid","Purple","soft creative","#8D4F91","#695E68","#7D594D"],
  ["plum","Plum","Purple","deep elegant","#7A4D78","#675F65","#765B4B"],
  ["indigo","Indigo","Purple","focused intelligent","#5856A8","#606071","#765768"],
  ["lavender","Lavender","Purple","gentle welcoming","#766398","#64606A","#7A5B62"],
  ["grape","Grape","Purple","vivid social","#8748A5","#685D68","#845647"],
  ["crimson","Crimson","Red","strong urgent","#B3263E","#72575B","#765B45"],
  ["ruby","Ruby","Red","luxurious bold","#A52F51","#70585E","#765B45"],
  ["coral","Coral","Red","warm friendly","#B84D42","#705A57","#6C6041"],
  ["rose","Rose","Red","soft emotional","#AA3F67","#6E5961","#785B44"],
  ["cherry","Cherry","Red","bright lively","#B5224E","#72575D","#795A43"],
  ["raspberry","Raspberry","Red","playful rich","#A93568","#6E5962","#795A46"],
  ["magenta","Magenta","Red","electric creative","#A63A91","#6B5B67","#805746"],
  ["blush","Blush","Red","subtle warm","#9A5067","#695D61","#735D48"],
  ["amber","Amber","Warm","warm attention","#9A6700","#685F50","#5D624B"],
  ["sunrise","Sunrise","Warm","optimistic bright","#A85D18","#6B5E55","#586550"],
  ["tangerine","Tangerine","Warm","energetic direct","#B35316","#6D5D55","#566650"],
  ["copper","Copper","Warm","crafted mature","#945B36","#695F59","#5C6450"],
  ["honey","Honey","Warm","friendly comfortable","#8B6B16","#645F54","#56654E"],
  ["gold","Gold","Warm","premium confident","#806C00","#625F54","#58644F"],
  ["lemon","Lemon","Warm","fresh energetic","#727600","#606158","#59644C"],
  ["sand","Sand","Warm","soft neutral","#7C684C","#655F58","#556650"],
  ["aqua","Aqua","Teal","clean contemporary","#007A78","#536361","#665C70"],
  ["cyan","Cyan","Teal","digital bright","#00728A","#546269","#695A72"],
  ["turquoise","Turquoise","Teal","fresh expressive","#007D70","#52635F","#695B70"],
  ["lagoon","Lagoon","Teal","calm immersive","#006E70","#566260","#625E76"],
  ["petrol","Petrol","Teal","deep technical","#28696C","#596260","#685C72"],
  ["arctic","Arctic","Teal","cool spacious","#2D7182","#596268","#6D5A70"],
  ["marine","Marine","Teal","stable aquatic","#176C78","#586266","#675C75"],
  ["graphite","Graphite","Neutral","dark precise","#4D606A","#606164","#695D69"],
  ["slate","Slate","Neutral","cool professional","#566270","#606164","#6C5C67"],
  ["zinc","Zinc","Neutral","minimal balanced","#606368","#626160","#675E67"],
  ["stone","Stone","Neutral","warm restrained","#69625A","#64615E","#5C645F"],
  ["cocoa","Cocoa","Neutral","warm grounded","#725B50","#675F5B","#59655C"],
  ["paper","Paper","Neutral","light editorial","#5E6460","#626260","#5F626A"],
  ["mono","Monochrome","Neutral","strict minimal","#545F5A","#606360","#626060"],
  ["midnight","Midnight","Neutral","dark cinematic","#455C70","#5E6165","#6C5C6B"]
].map(([id,name,family,mood,seed,secondary,tertiary]) => ({id,name,family,mood,seed,secondary,tertiary}));

function hexToRgb(hex) {
  const value = parseInt(hex.slice(1), 16);
  return {r:(value >> 16) & 255, g:(value >> 8) & 255, b:value & 255};
}

function rgbToHex({r,g,b}) {
  return `#${[r,g,b].map(v => Math.round(Math.max(0, Math.min(255, v))).toString(16).padStart(2,"0")).join("")}`.toUpperCase();
}

function mix(a, b, amount) {
  const x = hexToRgb(a), y = hexToRgb(b);
  return rgbToHex({r:x.r+(y.r-x.r)*amount,g:x.g+(y.g-x.g)*amount,b:x.b+(y.b-x.b)*amount});
}

function luminance(hex) {
  const c = Object.values(hexToRgb(hex)).map(v => { const n=v/255; return n<=.03928?n/12.92:((n+.055)/1.055)**2.4; });
  return .2126*c[0]+.7152*c[1]+.0722*c[2];
}

function onColor(hex) { return luminance(hex) > .36 ? "#101411" : "#FFFFFF"; }

function paletteTokens(palette, dark=false) {
  const p=palette.seed, s=palette.secondary, t=palette.tertiary;
  if (dark) return {
    primary:mix(p,"#FFFFFF",.35), onPrimary:"#07120A", primaryContainer:mix(p,"#000000",.47), onPrimaryContainer:mix(p,"#FFFFFF",.68),
    secondary:mix(s,"#FFFFFF",.42), secondaryContainer:mix(s,"#000000",.48), tertiary:mix(t,"#FFFFFF",.40),
    background:mix("#080B09",p,.06), surface:mix("#101411",p,.055), surfaceVariant:mix("#1B211D",p,.09),
    onSurface:"#E4E9E5", onSurfaceVariant:"#BBC3BD", outline:"#858E88", error:"#FFB4AB", onError:"#690005"
  };
  return {
    primary:p, onPrimary:onColor(p), primaryContainer:mix(p,"#FFFFFF",.72), onPrimaryContainer:mix(p,"#000000",.68),
    secondary:s, secondaryContainer:mix(s,"#FFFFFF",.76), tertiary:t,
    background:mix(p,"#FFFFFF",.975), surface:mix(p,"#FFFFFF",.975), surfaceVariant:mix(p,"#FFFFFF",.89),
    onSurface:"#1A1C1A", onSurfaceVariant:mix("#414942",p,.08), outline:mix("#727972",p,.08), error:"#BA1A1A", onError:"#FFFFFF"
  };
}
