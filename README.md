# Yudaro website

Private AI, ERP, Odoo implementation and business automation.

This existing repository was reconciled with the Damian Vercel-compatible reference and rebranded for https://www.yudaro.com. It now runs standard Next.js with the reference's Supabase authentication/Postgres adapters.

```powershell
npm ci
npm run dev
npm run typecheck
npm run test:restaurant
npm run test:sql
npm run build
npm run start
npm run audit:seo -- http://localhost:3000
```

Read `YUDARO-VERCEL-MIGRATION.md` before deploying. Backend-backed forms, accounts and administration require the approved Supabase environment and schema. Public pages can render without credentials.

See `YUDARO-RECONCILIATION.json` for selected reference changes and preserved newer files, and `YUDARO-VALIDATION.md` for results and remaining limitations. Existing unrelated brochure scripts, generated output and local backups were preserved.

## Local files and GitHub sync

The working folder is `C:\Users\l.leung\Documents\yudaro-website`.
The private repository is https://github.com/theyukongroup/yudaro-website, on branch `main`.

Save website edits in this folder. A Codex background task checks every five minutes and runs `npm run sync:github` to commit and push saved changes. The computer and Codex must be running, with GitHub access available. You can also run that command manually for an immediate sync.

Environment files, dependencies, build output, local backups, and generated catalogs are excluded. Sync stops on conflicts or divergent changes and never force-pushes. If GitHub is ahead and the local folder is clean, it updates the folder with a fast-forward. Offline changes remain local until a later successful sync. Saved changes may be unfinished: this is source backup, not a build or deployment approval.

The original repository remains available as the `legacy-nexavoris` remote. Publishing through Vercel is configured separately.
