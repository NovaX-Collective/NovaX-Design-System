# Migrazione sul hosting NovaX — 1 ottobre 2026

Sorgenti della migrazione nella PR #2; asset pubblicati via GitHub Actions OIDC al gateway Preview. DNS CNAME design.novaxhosting.com aggiornato dal pannello Cloudflare da just-nova23.github.io al tunnel f5f8e447-3fc4-4a65-8b6f-b1f3226cc903.cfargotunnel.com, proxied. Il vecchio certificato CLI del tunnel non aveva più autorizzazione DNS; non è stato sostituito né esposto.

Gateway NovaX-Preview dfeb65d, porta locale 12020, hostname Design esplicito; ingresso tunnel già esistente. Cookie host-only, handoff NovaX ID, accessi Preview conservati. HTML e app.js senza sessione restituiscono 302 verso Preview con ritorno al dominio Design. Browser autenticato mostra tutte le 54 palette e il link Preview; ritorno al dashboard riuscito. GitHub Pages eliminato tramite API solo dopo queste verifiche; successiva lettura della configurazione Pages HTTP 404. CNAME storico rimosso dal branch.

Backup sorgenti/database/immagine/config tunnel in /srv/novax/projects/preview/backups/2026-10-01-workspace-133154; configurazione Pages precedente salvata localmente nel file temporaneo novax-design-pages-before-migration.json. Nessun cambiamento alle allowlist o ai volumi.
