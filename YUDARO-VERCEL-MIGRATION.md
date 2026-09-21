> Publishing update: Production is now deployed and verified. See [YUDARO-PUBLISH-STATUS.md](YUDARO-PUBLISH-STATUS.md) for the current status and exact remaining DNS records. The earlier status below is retained as the implementation audit.

# Yudaro Vercel migration

## Verified local state — 2026-09-21

Working project: `C:\Users\l.leung\Documents\nexavoris-website`.
Reference actually found: `K:\08 Subsidiaries\AI ERP Implementation Corp (Name subject to change)\10 User Data and Files\Damian\Nexavoris (Vercel Compatible)` at commit `726bbf6`.

- Current Vercel project: **not linked/detectable locally**; no `.vercel/project.json` and no Vercel CLI on PATH.
- Reference README names team `nexavoris`, project `nexavoris-site-vercel-compatible`; this is historical reference information, not account verification.
- Local production domain before: `https://nexavoris.ai` in source metadata. Reference redirect pointed old hosts to `https://yuhoo.ai`. Neither live binding was verified.
- Intended canonical: `https://www.yudaro.com`.
- Apex redirect: `https://yudaro.com/:path*` → `https://www.yudaro.com/:path*`, permanent, implemented in Next.js configuration.
- Status: **configuration ready; manual service setup and deployment required**. No preview/production deployment or DNS change was made.
- Git remote remains the existing repository. Do not push this Vercel conversion into an automatic Cloudflare deployment pipeline without coordinating that pipeline.
- Existing `.openai` deployment metadata remains untouched. The unused Vite config is preserved in `docs/legacy/vite.config.ts.txt`; npm scripts now use Next.js.

## Link and inspect the existing Vercel project

Run in PowerShell on local disk:

```powershell
Set-Location -LiteralPath 'C:\Users\l.leung\Documents\nexavoris-website'
npx vercel login
npx vercel whoami
npx vercel project ls --scope nexavoris
npx vercel link --scope nexavoris --project nexavoris-site-vercel-compatible
npx vercel project inspect nexavoris-site-vercel-compatible --scope nexavoris
npx vercel domains ls --scope nexavoris
```

Use that project only if inspection confirms it is the intended existing project. If it does not exist, create `yudaro-website` in the intended team and link to it instead. Preserve existing IDs, Git connections, and old domain bindings. Renaming is optional; no project name was changed locally or remotely.

Dashboard → Settings → Build and Deployment: Framework **Next.js**, install `npm ci`, build `npm run build`, output default. Remove any dashboard override pointing to `dist` or a Wrangler/Vite command. Use Node.js 22 or newer compatible LTS.

## Backend configuration (required before public launch)

The old working project used Cloudflare D1 and trusted platform-authenticated headers. Those cannot be used as authentication on Vercel. The reference's verified Supabase session adapter and Postgres compatibility layer are now used. Header impersonation is rejected by proxy middleware.

Configure these in the Vercel project for Preview and Production, using the approved existing Supabase service where available:

- `SUPABASE_URL` (or `NEXT_PUBLIC_SUPABASE_URL`)
- `SUPABASE_PUBLISHABLE_KEY` (or its supported public/legacy anon-key alias)
- `POSTGRES_URL`: approved pooled PostgreSQL connection
- `YUDARO_ADMIN_EMAILS`: approved bootstrap administrators; legacy `NEXAVORIS_ADMIN_EMAILS` remains a fallback

No secrets were read, printed, invented, or changed. No matching backend environment variables were available in this session. Do not store secrets on the shared drive. Do not replace an existing database or assume D1 user IDs map to Supabase identities.

Review and apply `supabase/migrations/20260911120000_nexavoris_member_platform.sql` only to the intended Supabase database if its tables are not already present. The original migration filename is retained for migration history. It enables RLS and denies public/anonymous table access. Existing D1 data needs a separately verified export/import and identity mapping; no data migration has been performed.

Supabase Auth:

1. Keep email confirmation enabled; administrator grants require confirmed addresses.
2. Minimum password length must match the application (7 currently).
3. Site URL: `https://www.yudaro.com` after verified cutover.
4. Allow redirect URLs for `https://www.yudaro.com/**`, the exact approved preview hostname, and `http://localhost:3000/**` for local testing. Preserve working old callbacks through transition.
5. Confirmation template link: `{{ .RedirectTo }}&token_hash={{ .TokenHash }}&type=email`.
6. Recovery template link: `{{ .RedirectTo }}&token_hash={{ .TokenHash }}&type=recovery`.
7. Keep the existing verified SMTP sender until a Yudaro sender is verified. Brand the sender display name Yudaro; do not invent an operational mailbox.

The contact form still posts to `/api/consultations` and stores requests in the member database. It does not send to an invented email address. The footer's neutral “Contact our team” link retains `info@nexavoris.ai` intentionally until a replacement is verified.

## Preview first

```powershell
npm ci
npm run typecheck
npm run test:restaurant
npm run test:sql
npm run build
npx vercel --scope nexavoris
```

Use the exact URL returned by Vercel with:

```powershell
npm run audit:seo -- 'https://YOUR-ACTUAL-PREVIEW-HOST'
```

Before promotion, verify real sign-up, email confirmation, login/logout, password recovery, saving each assessment/tool, admin authorization, and contact request persistence using approved test accounts. These live-service checks were not possible without backend configuration. Resolve or explicitly review the inherited lint backlog recorded in `YUDARO-VALIDATION.md` before release.

## Add domains and obtain the actual DNS values

After confirming the linked project (substitute `yudaro-website` only if that is the verified project):

```powershell
npx vercel domains add www.yudaro.com nexavoris-site-vercel-compatible --scope nexavoris
npx vercel domains add yudaro.com nexavoris-site-vercel-compatible --scope nexavoris
npx vercel domains inspect www.yudaro.com --scope nexavoris
npx vercel domains inspect yudaro.com --scope nexavoris
```

Dashboard → Project → Settings → Domains: assign **www.yudaro.com** to Production; edit **yudaro.com** to redirect permanently to **www.yudaro.com**. The application also supplies the host-specific apex redirect. Preview hostnames remain usable.

At the authoritative DNS provider, enter **only the exact records Vercel displays for these domains**. Record type, host, target/value, and ownership verification record are not available without authenticated inspection; no IP address or CNAME target has been guessed. Leave unrelated MX/TXT records intact. Do not remove Nexavoris/Yuhoo bindings or redirect their traffic until the new deployment and authentication callbacks have passed verification.

After preview acceptance and service validation:

```powershell
npx vercel --prod --scope nexavoris
curl.exe -I https://www.yudaro.com
curl.exe -I 'https://yudaro.com/ai-solutions?lang=es'
npm run audit:seo -- https://www.yudaro.com
```

Confirm a valid certificate, canonical metadata, apex redirect preserving path/query, image loading, and backend operations. Only then configure any legacy-host redirects. The reference's premature old-host → Yuhoo redirect was deliberately not adopted.

Official references: [Vercel domains CLI](https://vercel.com/docs/cli/domains), [domain setup](https://vercel.com/docs/domains/set-up-custom-domain), [domain redirects](https://vercel.com/docs/domains/working-with-domains/deploying-and-redirecting), [Next.js redirects](https://nextjs.org/docs/app/api-reference/config/next-config-js/redirects).

