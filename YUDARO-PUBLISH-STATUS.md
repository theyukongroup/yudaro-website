# Yudaro publishing status — 2026-09-21

The previous local-only migration status is superseded by this publishing update.

- Authenticated Vercel account: yuhooerp; team: nexavoris.
- Linked existing project: nexavoris-site-vercel-compatible (prj_Odi6yh6gSrzI7C7dZMiwhLyxTwCz).
- Existing Production/Preview Supabase and PostgreSQL environment variables are configured. Their values were not printed or changed.
- Preview deployment READY: https://nexavoris-site-vercel-compatible-imi118j6c-nexavoris.vercel.app . Verified homepage HTTP 200, Yudaro title/canonical, and signed-out member API HTTP 401.
- Dependency security patch: updated transitive undici within its supported range; npm audit reports zero vulnerabilities.
- Production deployment initiated: https://nexavoris-site-vercel-compatible-bo0y6l645-nexavoris.vercel.app . Final readiness is recorded below when verified.
- Both www.yudaro.com and yudaro.com were added to this project. Existing domain bindings were retained.

## Bluehost DNS required

Vercel verified domain ownership for this team but reports invalid DNS configuration. Current nameservers: ns1.bluehost.com / ns2.bluehost.com. Both hostnames currently resolve to 204.11.56.246.

Use the exact records supplied by `vercel domains verify` on 2026-09-21:

| Type | Host | Value |
| --- | --- | --- |
| A | @ | 216.198.79.1 |
| A | @ | 64.29.17.1 |
| CNAME | www | a300f7e90ddc3436.vercel-dns-017.com |

Replace conflicting website records for @ and www; preserve mail-related MX/TXT records and unrelated hostnames. No Bluehost DNS records were changed by this task because authenticated DNS tooling was unavailable. Do not change nameservers just to apply these records.

After DNS changes:

```powershell
npx vercel domains verify www.yudaro.com --scope nexavoris
npx vercel domains verify yudaro.com --scope nexavoris
curl.exe -I https://www.yudaro.com
curl.exe -I 'https://yudaro.com/ai-solutions?lang=es'
```

The application already redirects apex to www permanently, preserving path/query. Review Supabase Auth Site URL, allowed callbacks, and verified SMTP sender for www.yudaro.com before relying on sign-up or recovery email at the new domain. Existing backend credentials are present, but live sign-up/email delivery and saved-data workflows were not exercised using real accounts in this publishing pass.

The inherited 141 lint findings remain documented in YUDARO-VALIDATION.md. Build and TypeScript checks pass; lint rules have not been suppressed.

## Production verified

Vercel reports deployment `dpl_5NHJHpeb4122xWSe632DsXcTVZsL` READY with target `production`.

Public URL: https://nexavoris-site-vercel-compatible.vercel.app
Existing domain retained: https://nexavoris.ai
Both returned HTTP 200 with the title “Yudaro | Private AI, ERP & Business Automation”.

Production build and TypeScript checks passed. Its dependency audit reported zero vulnerabilities.

Aliases include yudaro.com and www.yudaro.com, but alias assignment alone does not complete DNS migration. Bluehost records listed above remain required before claiming either Yudaro hostname is live.
