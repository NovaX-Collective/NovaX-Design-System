# NovaX Design System

Sito canonico: https://design.novaxhosting.com, servito sul hosting NovaX tramite il gateway Preview e protetto da NovaX ID (allowlist Preview). HTML, script e palette passano dalla stessa autenticazione; nessuna credenziale nel bundle.

GitHub conserva sorgenti e versioni. `.github/workflows/preview.yml` pubblica gli asset tramite GitHub Actions OIDC. Le versioni sono raggruppate nel progetto NovaX-Design-System sul dashboard https://preview.novaxhosting.com. Il collegamento Preview Ã¨ presente nella testata del sito.

Migrazione richiesta dal proprietario il 1 ottobre 2026: DNS del dominio dal vecchio GitHub Pages al tunnel NovaX, gateway con hostname Design esplicito e ritorno di accesso conservato. GitHub Pages è stato disabilitato dopo il riscontro del dominio autenticato; non riattivare Pages per questo dominio.
