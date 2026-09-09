# Domain canonical audit

Audit date: 2026-09-09

- **CURRENT GOOGLE-FACING HOST:** Google has reportedly shown `www.nexavoris.ai` for the branded query. Search Console confirmation is required.
- **RECOMMENDED CANONICAL HOST:** `https://nexavoris.ai`
- **REDIRECT STATUS:** Warning — the apex is consistently declared in site code, but the `www` DNS/TLS redirect must be configured at the DNS/hosting edge and verified live.
- **CANONICAL STATUS:** Pass in source — metadata, Open Graph, JSON-LD, hreflang and internal absolute references use the apex host.
- **SITEMAP STATUS:** Pass in source — sitemap entries use `https://nexavoris.ai`.
- **ACTION REQUIRED:** Configure `www.nexavoris.ai` on the hosting/DNS provider and return a permanent 301 redirect to `https://nexavoris.ai$request_uri`. Do not serve a second indexable copy. Then inspect both variants in Google Search Console.

## Verification checklist

1. `https://www.nexavoris.ai/anything` returns one 301 to the same apex path.
2. The destination returns 200 and declares an apex canonical.
3. Search Console Domain property includes both hosts.
4. Only apex URLs appear in the XML sitemap and internal navigation.
5. Google-selected canonical matches the user-declared apex canonical.
