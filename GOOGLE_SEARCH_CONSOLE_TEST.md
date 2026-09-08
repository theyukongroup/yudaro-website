# Google Search Console Test Framework

Status: **MANUAL ACTION REQUIRED**

1. Verify the `nexavoris.ai` Domain property using DNS.
2. Submit `https://nexavoris.ai/sitemap.xml`.
3. Confirm Google fetches the sitemap successfully and compare discovered versus indexed URLs.
4. Inspect `/`, verify Google-selected canonical equals the user-declared apex canonical, then request indexing if appropriate.
5. Inspect `/ai-erp`, `/ai-solutions`, and `/erp-solutions`.
6. Inspect `/resources/ai-erp`, `/resources/private-ai`, `/resources/odoo-erp`, `/resources/comparisons`, and `/resources/guides`.
7. Inspect wholesale and HVAC industry guides.
8. Inspect representative `?lang=zh-cn`, `?lang=zh-tw`, and `?lang=es` URLs and confirm rendered content plus canonical.
9. Verify `/account`, `/admin`, API, authentication, and internal rewrite routes are not indexed.
10. Request indexing only for canonical public pages; do not repeatedly resubmit unchanged URLs.

## Weekly record

| Week | Valid indexed | Not indexed | Sitemap discovered | Clicks | Impressions | CTR | Avg. position | Branded impressions | Non-branded impressions | Notes |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- |
| — | — | — | — | — | — | — | — | — | — | Awaiting Search Console access |

Track top queries and pages separately for brand, AI ERP, Private AI, Odoo, industry, local, and multilingual intent. Investigate crawl/indexing causes before changing content. Validate the live URL, rendered HTML, canonical, and referring internal links for any excluded priority page.

## Branded query checks

Record exact Google observations; do not infer a rank from Search Console average position.

| Query | Google result? | Position | Correct URL | Correct description | Date |
| --- | --- | ---: | --- | --- | --- |
| Nexavoris | MANUAL SEARCH REQUIRED | — | — | — | — |
| Nexavoris AI | MANUAL SEARCH REQUIRED | — | — | — | — |
| Nexavoris AI ERP | MANUAL SEARCH REQUIRED | — | — | — | — |
| Nexavoris ERP | MANUAL SEARCH REQUIRED | — | — | — | — |
| Nexavoris Private AI | MANUAL SEARCH REQUIRED | — | — | — | — |
| Nexavoris Odoo | MANUAL SEARCH REQUIRED | — | — | — | — |
| Nexavoris AI & ERP Systems | MANUAL SEARCH REQUIRED | — | — | — | — |
