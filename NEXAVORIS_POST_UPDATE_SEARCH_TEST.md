# Nexavoris post-update SEO + GEO verification

Verification date: **2026-09-09**  
Production target: **https://nexavoris.ai**  
Secondary hostname tested: **https://www.nexavoris.ai**  
Evidence boundary: live HTTP/DNS responses, rendered production HTML, `robots.txt`, XML sitemap, the production regression suite, and a non-platform-specific web-search sample. No Google Search Console, Bing Webmaster Tools, Google AI Overview, ChatGPT, or Copilot account-level data was available. Unavailable measurements are explicitly marked **MANUAL DATA REQUIRED**.

## Executive result

| Measure | Score | Evidence-based interpretation |
|---|---:|---|
| SEO TECHNICAL READINESS | **88/100** | Apex implementation is strong and the production regression suite passed 964/964 checks. The broken `www` hostname is a critical domain-level defect. |
| SEO ACTUAL VISIBILITY | **5/100** | No verified Google/Bing ranking, impression, click, or CTR data was available. The independent web-search sample did not surface Nexavoris for exact-brand or `site:` queries. This is not a Google ranking measurement. |
| GEO ACTUAL VISIBILITY | **0/100** | No reproducible ChatGPT citation, Google AI mention, or Copilot mention was verified. Technical eligibility is not actual visibility. |
| BRANDED SEARCH STRENGTH | **8/100** | Brand/entity optimization exists on-site, but current branded placement was not verified and the independent search sample returned similarly named competitors instead. |
| AI ERP COMPETITIVENESS | **45/100** | `/ai-erp` has focused title/H1/meta, answer-first copy, FAQs, Service/FAQ JSON-LD, and internal support. Rankings, links, citations, and engagement evidence remain unavailable. |

The visibility scores are intentionally conservative. They should be recalculated only after importing verifiable platform data.

## 1. Domain and canonical-host verification

| Check | Live result | Status |
|---|---|---|
| Apex HTTPS | `https://nexavoris.ai/` returned `200 OK` | PASS |
| Apex HTTP | `http://nexavoris.ai/` returned `302` to `https://nexavoris.ai/` | PASS |
| `www` DNS | `www.nexavoris.ai` is a CNAME to `nexavoris.ai` | WARNING |
| `www` HTTPS | TLS negotiation failed; no page or redirect was served | **FAIL — CRITICAL** |
| `www` HTTP | Returned `409 Conflict`; no apex redirect | **FAIL — CRITICAL** |
| Canonical host | Rendered canonicals use `https://nexavoris.ai` | PASS |
| Sitemap host | Every inspected `<loc>` uses `https://nexavoris.ai` | PASS |
| hreflang host | HTTP `Link` headers and rendered alternates use the apex host for `en-US`, `zh-CN`, `zh-TW`, `es`, and `x-default` | PASS |
| Open Graph host | `og:url` and images use `https://nexavoris.ai` | PASS |
| JSON-LD host | Organization, WebSite, Service, Article, FAQ, and breadcrumb references inspected use `https://nexavoris.ai` | PASS |
| `robots.txt` host | `Host` and `Sitemap` directives use `https://nexavoris.ai` | PASS |

**CRITICAL:** `www` and non-`www` do not resolve consistently. Configure `www.nexavoris.ai` as a valid custom hostname with TLS, then issue a permanent `301` or `308` redirect from every `www` URL to the equivalent apex URL, preserving path and query string. A DNS CNAME alone is not sufficient.

## 2. Crawlability, indexing controls, and technical regression

- Production regression command: `npm run audit:seo -- https://nexavoris.ai`
- Result: **964/964 checks passed** for canonical, hreflang, sitemap, robots, private isolation, and mobile-navigation source checks.
- Public pages tested returned `200`, `index, follow`, self-referencing apex canonicals, and crawlable server-rendered HTML.
- `robots.txt` explicitly allows `OAI-SearchBot`, `Googlebot`, and `Bingbot` on public content.
- `/account`, `/admin`, and `/admin/users` returned `403` to unauthenticated requests and exposed `noindex,nofollow` on the returned protection page.
- Private/member/admin/auth/API routes are disallowed in `robots.txt` and absent from the XML sitemap.
- The sitemap includes English, Simplified Chinese, Traditional Chinese, and Spanish alternates for public multilingual routes.

### Google indexing status

The site is technically indexable, but actual Google index inclusion cannot be proven from an HTTP crawl. Google Search Console URL Inspection and Page Indexing reports are required for each target URL. The independent web-search sample on 2026-09-09 returned no result for `"nexavoris.ai"`, the exact organization name, or `site:nexavoris.ai`; that sample is a discovery warning, **not** a substitute for Google Search Console or a Google position measurement.

## 3. Keyword ownership and on-page intent audit

| Query cluster | Intended owner | Ownership / intent result | Internal-link and cannibalization result |
|---|---|---|---|
| Nexavoris / Nexavoris AI / branded AI ERP | `/` | Title, H1, description, Organization/WebSite schema, and contact entity are aligned | `/about`, `/contact`, `/ai-erp`, and solution pages support the entity. No alternate branded owner should be created. |
| AI ERP / AI ERP integration / AI ERP system / small business | `/ai-erp` | Strong commercial/informational match; concise definition, workflow, FAQs, and Service/FAQ schema | `/resources/ai-erp` is a supporting guide. Keep `/ai-erp` as the broad commercial owner to avoid cannibalization. |
| Private AI for business | `/ai-solutions` | Strong title/H1/meta match and focused private-company-knowledge proposition | `/resources/private-ai` and `/equipment` support it. Maintain commercial versus educational intent separation. |
| Odoo AI integration | `/ai-erp` | Integration intent is addressed; `/erp-solutions` provides ERP implementation context | Do not let `/resources/odoo-erp` become a second commercial integration landing page. |
| Wholesale terms | `/resources/industries/wholesale-distribution` | Title/H1/meta and operations copy align with distribution intent | `/industries`, `/ai-erp`, and `/erp-solutions` support the guide. The generic industries page should remain a hub. |
| HVAC terms | `/resources/industries/hvac-field-service` | Title/H1/meta and dispatch, equipment, parts, warranty, and invoicing copy align | `/industries`, `/ai-erp`, and `/erp-solutions` support the guide. Avoid a duplicate HVAC sales page without query evidence. |
| Private AI vs ChatGPT; Odoo edition/accounting comparisons | `/resources/comparisons` | Comparison title/H1/meta match buyer research intent | Keep comparisons consolidated until Search Console demonstrates a distinct query deserves its own page. |
| AI/Private AI/Odoo implementation cost | `/resources/guides` | Guide matches research intent; `/pricing` supplies current commercial prices | Potential intent split is controlled by using `/resources/guides` for explanatory cost queries and `/pricing` for pricing/quote intent. Monitor both in Search Console. |

### Concise answer-first GEO content

- **PASS:** `/ai-erp` gives a direct definition and explains governed connection, workflow, value, fit, cost factors, and FAQs.
- **PASS:** industry guides lead with operational problems and practical use cases rather than generic marketing language.
- **PASS:** comparisons and cost guides provide direct buyer-oriented explanations.
- **WARNING:** actual third-party citations, independent evidence, named-author expertise, and externally corroborated outcomes remain limited. Structured copy alone does not establish GEO visibility.

## 4. Search-visibility measurement framework

Use exact-match queries from a neutral/incognito location consistent with the target market. Record only observed values. Google impressions, clicks, and CTR must come from Google Search Console. Bing positions should be checked separately and validated in Bing Webmaster Tools where possible. ChatGPT, Google AI, and Copilot tests should use fresh sessions, record the full prompt, model/product, location where relevant, visible sources, and screenshots.

| Query | Target URL | Google Position | Google Impressions | Google Clicks | CTR | ChatGPT Mention | ChatGPT Citation | Google AI Mention | Bing Position | Copilot Mention | Date | Notes |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Nexavoris | `https://nexavoris.ai/` | MANUAL DATA REQUIRED | MANUAL DATA REQUIRED | MANUAL DATA REQUIRED | MANUAL DATA REQUIRED | MANUAL DATA REQUIRED | MANUAL DATA REQUIRED | MANUAL DATA REQUIRED | MANUAL DATA REQUIRED | MANUAL DATA REQUIRED | 2026-09-09 | Branded owner; inspect exact result and sitelinks. |
| Nexavoris AI | `https://nexavoris.ai/` | MANUAL DATA REQUIRED | MANUAL DATA REQUIRED | MANUAL DATA REQUIRED | MANUAL DATA REQUIRED | MANUAL DATA REQUIRED | MANUAL DATA REQUIRED | MANUAL DATA REQUIRED | MANUAL DATA REQUIRED | MANUAL DATA REQUIRED | 2026-09-09 | Branded AI variant. |
| Nexavoris AI ERP | `https://nexavoris.ai/` | MANUAL DATA REQUIRED | MANUAL DATA REQUIRED | MANUAL DATA REQUIRED | MANUAL DATA REQUIRED | MANUAL DATA REQUIRED | MANUAL DATA REQUIRED | MANUAL DATA REQUIRED | MANUAL DATA REQUIRED | MANUAL DATA REQUIRED | 2026-09-09 | Homepage owns branded phrase; `/ai-erp` supports. |
| Nexavoris ERP | `https://nexavoris.ai/` | MANUAL DATA REQUIRED | MANUAL DATA REQUIRED | MANUAL DATA REQUIRED | MANUAL DATA REQUIRED | MANUAL DATA REQUIRED | MANUAL DATA REQUIRED | MANUAL DATA REQUIRED | MANUAL DATA REQUIRED | MANUAL DATA REQUIRED | 2026-09-09 | Homepage owns branded phrase; `/erp-solutions` supports. |
| Nexavoris Private AI | `https://nexavoris.ai/ai-solutions` | MANUAL DATA REQUIRED | MANUAL DATA REQUIRED | MANUAL DATA REQUIRED | MANUAL DATA REQUIRED | MANUAL DATA REQUIRED | MANUAL DATA REQUIRED | MANUAL DATA REQUIRED | MANUAL DATA REQUIRED | MANUAL DATA REQUIRED | 2026-09-09 | Private AI commercial owner. |
| AI ERP | `https://nexavoris.ai/ai-erp` | MANUAL DATA REQUIRED | MANUAL DATA REQUIRED | MANUAL DATA REQUIRED | MANUAL DATA REQUIRED | MANUAL DATA REQUIRED | MANUAL DATA REQUIRED | MANUAL DATA REQUIRED | MANUAL DATA REQUIRED | MANUAL DATA REQUIRED | 2026-09-09 | Broad, highly competitive, long-term query. |
| AI ERP integration | `https://nexavoris.ai/ai-erp` | MANUAL DATA REQUIRED | MANUAL DATA REQUIRED | MANUAL DATA REQUIRED | MANUAL DATA REQUIRED | MANUAL DATA REQUIRED | MANUAL DATA REQUIRED | MANUAL DATA REQUIRED | MANUAL DATA REQUIRED | MANUAL DATA REQUIRED | 2026-09-09 | Primary commercial query. |
| AI ERP system | `https://nexavoris.ai/ai-erp` | MANUAL DATA REQUIRED | MANUAL DATA REQUIRED | MANUAL DATA REQUIRED | MANUAL DATA REQUIRED | MANUAL DATA REQUIRED | MANUAL DATA REQUIRED | MANUAL DATA REQUIRED | MANUAL DATA REQUIRED | MANUAL DATA REQUIRED | 2026-09-09 | Monitor intent against informational guide. |
| AI ERP for small business | `https://nexavoris.ai/ai-erp` | MANUAL DATA REQUIRED | MANUAL DATA REQUIRED | MANUAL DATA REQUIRED | MANUAL DATA REQUIRED | MANUAL DATA REQUIRED | MANUAL DATA REQUIRED | MANUAL DATA REQUIRED | MANUAL DATA REQUIRED | MANUAL DATA REQUIRED | 2026-09-09 | Add evidence only when verified. |
| Private AI for business | `https://nexavoris.ai/ai-solutions` | MANUAL DATA REQUIRED | MANUAL DATA REQUIRED | MANUAL DATA REQUIRED | MANUAL DATA REQUIRED | MANUAL DATA REQUIRED | MANUAL DATA REQUIRED | MANUAL DATA REQUIRED | MANUAL DATA REQUIRED | MANUAL DATA REQUIRED | 2026-09-09 | Strong on-page fit. |
| Odoo AI integration | `https://nexavoris.ai/ai-erp` | MANUAL DATA REQUIRED | MANUAL DATA REQUIRED | MANUAL DATA REQUIRED | MANUAL DATA REQUIRED | MANUAL DATA REQUIRED | MANUAL DATA REQUIRED | MANUAL DATA REQUIRED | MANUAL DATA REQUIRED | MANUAL DATA REQUIRED | 2026-09-09 | `/erp-solutions` and Odoo guide support. |
| AI ERP for wholesale distribution | `https://nexavoris.ai/resources/industries/wholesale-distribution` | MANUAL DATA REQUIRED | MANUAL DATA REQUIRED | MANUAL DATA REQUIRED | MANUAL DATA REQUIRED | MANUAL DATA REQUIRED | MANUAL DATA REQUIRED | MANUAL DATA REQUIRED | MANUAL DATA REQUIRED | MANUAL DATA REQUIRED | 2026-09-09 | Exact industry owner. |
| AI for wholesale distribution | `https://nexavoris.ai/resources/industries/wholesale-distribution` | MANUAL DATA REQUIRED | MANUAL DATA REQUIRED | MANUAL DATA REQUIRED | MANUAL DATA REQUIRED | MANUAL DATA REQUIRED | MANUAL DATA REQUIRED | MANUAL DATA REQUIRED | MANUAL DATA REQUIRED | MANUAL DATA REQUIRED | 2026-09-09 | Exact industry owner. |
| Odoo for wholesale distribution | `https://nexavoris.ai/resources/industries/wholesale-distribution` | MANUAL DATA REQUIRED | MANUAL DATA REQUIRED | MANUAL DATA REQUIRED | MANUAL DATA REQUIRED | MANUAL DATA REQUIRED | MANUAL DATA REQUIRED | MANUAL DATA REQUIRED | MANUAL DATA REQUIRED | MANUAL DATA REQUIRED | 2026-09-09 | Exact industry owner; ERP page supports. |
| AI ERP for HVAC | `https://nexavoris.ai/resources/industries/hvac-field-service` | MANUAL DATA REQUIRED | MANUAL DATA REQUIRED | MANUAL DATA REQUIRED | MANUAL DATA REQUIRED | MANUAL DATA REQUIRED | MANUAL DATA REQUIRED | MANUAL DATA REQUIRED | MANUAL DATA REQUIRED | MANUAL DATA REQUIRED | 2026-09-09 | Exact industry owner. |
| AI for HVAC | `https://nexavoris.ai/resources/industries/hvac-field-service` | MANUAL DATA REQUIRED | MANUAL DATA REQUIRED | MANUAL DATA REQUIRED | MANUAL DATA REQUIRED | MANUAL DATA REQUIRED | MANUAL DATA REQUIRED | MANUAL DATA REQUIRED | MANUAL DATA REQUIRED | MANUAL DATA REQUIRED | 2026-09-09 | Exact industry owner. |
| Odoo for HVAC | `https://nexavoris.ai/resources/industries/hvac-field-service` | MANUAL DATA REQUIRED | MANUAL DATA REQUIRED | MANUAL DATA REQUIRED | MANUAL DATA REQUIRED | MANUAL DATA REQUIRED | MANUAL DATA REQUIRED | MANUAL DATA REQUIRED | MANUAL DATA REQUIRED | MANUAL DATA REQUIRED | 2026-09-09 | Exact industry owner; ERP page supports. |
| Private AI vs ChatGPT | `https://nexavoris.ai/resources/comparisons` | MANUAL DATA REQUIRED | MANUAL DATA REQUIRED | MANUAL DATA REQUIRED | MANUAL DATA REQUIRED | MANUAL DATA REQUIRED | MANUAL DATA REQUIRED | MANUAL DATA REQUIRED | MANUAL DATA REQUIRED | MANUAL DATA REQUIRED | 2026-09-09 | Comparison owner. |
| Odoo Community vs Enterprise | `https://nexavoris.ai/resources/comparisons` | MANUAL DATA REQUIRED | MANUAL DATA REQUIRED | MANUAL DATA REQUIRED | MANUAL DATA REQUIRED | MANUAL DATA REQUIRED | MANUAL DATA REQUIRED | MANUAL DATA REQUIRED | MANUAL DATA REQUIRED | MANUAL DATA REQUIRED | 2026-09-09 | Comparison owner; revalidate claims after vendor changes. |
| Odoo vs QuickBooks | `https://nexavoris.ai/resources/comparisons` | MANUAL DATA REQUIRED | MANUAL DATA REQUIRED | MANUAL DATA REQUIRED | MANUAL DATA REQUIRED | MANUAL DATA REQUIRED | MANUAL DATA REQUIRED | MANUAL DATA REQUIRED | MANUAL DATA REQUIRED | MANUAL DATA REQUIRED | 2026-09-09 | Comparison owner. |
| AI ERP implementation cost | `https://nexavoris.ai/resources/guides` | MANUAL DATA REQUIRED | MANUAL DATA REQUIRED | MANUAL DATA REQUIRED | MANUAL DATA REQUIRED | MANUAL DATA REQUIRED | MANUAL DATA REQUIRED | MANUAL DATA REQUIRED | MANUAL DATA REQUIRED | MANUAL DATA REQUIRED | 2026-09-09 | Guide owns explanatory query; pricing supports. |
| Private AI cost | `https://nexavoris.ai/resources/guides` | MANUAL DATA REQUIRED | MANUAL DATA REQUIRED | MANUAL DATA REQUIRED | MANUAL DATA REQUIRED | MANUAL DATA REQUIRED | MANUAL DATA REQUIRED | MANUAL DATA REQUIRED | MANUAL DATA REQUIRED | MANUAL DATA REQUIRED | 2026-09-09 | Guide owns cost research; `/pricing` owns quote intent. |
| Odoo implementation cost | `https://nexavoris.ai/resources/guides` | MANUAL DATA REQUIRED | MANUAL DATA REQUIRED | MANUAL DATA REQUIRED | MANUAL DATA REQUIRED | MANUAL DATA REQUIRED | MANUAL DATA REQUIRED | MANUAL DATA REQUIRED | MANUAL DATA REQUIRED | MANUAL DATA REQUIRED | 2026-09-09 | Guide owns cost research; `/pricing` owns quote intent. |

## 5. Manual test protocol

1. Export Google Search Console Performance data for the last 28 days and preceding 28 days with query, page, country, device, clicks, impressions, CTR, and average position.
2. Run URL Inspection for every target URL and record `URL is on Google`, selected canonical, last crawl, and any enhancement warnings.
3. Export Bing Webmaster Tools search-performance and URL-inspection data for the same dates.
4. Check every query in a clean Google session and clean Bing session from the target geography. Record the exact rank or `Not in top 100`; do not use personalized results.
5. Test ChatGPT and Copilot in fresh sessions using the exact queries plus a buyer-style prompt such as “Which firms help small businesses connect private AI with Odoo ERP?” Record mention and citation separately.
6. Check whether a Google AI Overview appears. Record presence, Nexavoris mention, cited URL, screenshot, geography, device, and date.
7. Recalculate scores from observed evidence; preserve the raw exports and screenshots with the report date.

## 6. Striking-distance validation queue

There are **no verified striking-distance keywords** without Search Console/Bing position data. The following are the top five *validation priorities*, not ranking claims. Promote a term to “striking distance” only if verified average position is approximately 8–30 with meaningful impressions.

1. `Nexavoris` → `/`
2. `AI ERP integration` → `/ai-erp`
3. `Private AI for business` → `/ai-solutions`
4. `AI ERP for wholesale distribution` → `/resources/industries/wholesale-distribution`
5. `AI ERP for HVAC` → `/resources/industries/hvac-field-service`

Status for all five: **MANUAL DATA REQUIRED**.

## 7. Prioritized actions

### Top 5 SEO actions

1. Fix `www` TLS/hostname provisioning and enforce a path-preserving permanent redirect to the apex host.
2. Verify domain ownership in Google Search Console and Bing Webmaster Tools; submit `https://nexavoris.ai/sitemap.xml` and inspect the homepage plus every target owner URL.
3. Import 28-day query/page data into this framework; identify genuine positions 8–30 and resolve only evidence-backed CTR, intent, or cannibalization problems.
4. Earn relevant third-party authority through verified business profiles, local/company citations, implementation-partner listings, and editorial links to the exact target pages.
5. Monitor `/resources/guides` versus `/pricing`, `/ai-erp` versus `/resources/ai-erp`, and industry guides versus `/industries`; consolidate or retarget only if Search Console shows page competition.

### Top 5 GEO actions

1. Run and archive repeatable ChatGPT, Google AI, and Copilot tests monthly; separate a brand mention from a clickable/cited Nexavoris URL.
2. Add independently verifiable proof as it becomes available: named methodology owners, dates, source references, implementation constraints, and consented case evidence.
3. Strengthen entity corroboration across authoritative third-party profiles using one exact company name, apex URL, Stafford address, phone, and service description.
4. Keep answer-first definitions, comparison tables, FAQs, and industry-specific workflows current; add `dateModified` only when material content changes.
5. Seek citations from relevant Odoo, private-AI, distribution, HVAC, and Texas business publications instead of producing high-volume generic AI pages.

## Final status report

**WWW STATUS:** FAIL — CRITICAL. DNS aliases to apex, but HTTPS fails TLS and HTTP returns 409 instead of redirecting.  
**APEX DOMAIN STATUS:** PASS. HTTPS returns 200; HTTP redirects to HTTPS.  
**CANONICAL:** `https://nexavoris.ai` is consistently used in canonical, sitemap, hreflang, Open Graph, JSON-LD, robots host, and sitemap directives.  
**GOOGLE INDEXING:** MANUAL DATA REQUIRED. Technically indexable; Google Search Console URL Inspection is required to verify actual inclusion and Google-selected canonicals.  
**BRANDED SEARCH:** MANUAL DATA REQUIRED. The independent web-search sample did not surface Nexavoris for exact-brand/domain queries; no Google position is claimed.  
**AI ERP:** MANUAL DATA REQUIRED for rank/visibility. Correct owner is `https://nexavoris.ai/ai-erp`; on-page readiness is strong.  
**AI ERP INTEGRATION:** MANUAL DATA REQUIRED for rank/visibility. Correct owner is `https://nexavoris.ai/ai-erp`.  
**WHOLESALE:** MANUAL DATA REQUIRED for rank/visibility. Correct owner is `https://nexavoris.ai/resources/industries/wholesale-distribution`.  
**HVAC:** MANUAL DATA REQUIRED for rank/visibility. Correct owner is `https://nexavoris.ai/resources/industries/hvac-field-service`.  
**CHATGPT GEO:** MANUAL DATA REQUIRED; no verified mention or citation.  
**GOOGLE AI GEO:** MANUAL DATA REQUIRED; no verified AI Overview mention or citation.  
**BING/COPILOT:** MANUAL DATA REQUIRED; no verified Bing rank, Copilot mention, or Copilot citation.  
**TOP 5 STRIKING-DISTANCE KEYWORDS:** No verified terms. Validation queue: Nexavoris; AI ERP integration; Private AI for business; AI ERP for wholesale distribution; AI ERP for HVAC.  
**TOP 5 SEO ACTIONS:** Fix `www`; verify Search Console/Bing; import measured query/page data; earn relevant authority; monitor the documented intent splits.  
**TOP 5 GEO ACTIONS:** Run repeatable assistant/AI tests; add verifiable evidence; corroborate the business entity; maintain answer-first structured content; earn relevant third-party citations.
