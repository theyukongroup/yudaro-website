# Nexavoris Phase 1 GEO + SEO Re-Audit

Audit date: September 8, 2026  
Production domain: https://nexavoris.ai

Initial score: **74 / 100**  
Post-fix score: **87 / 100**  
Status: **READY WITH MINOR FIXES**

The initial score is intentionally reduced because the live custom domain was serving canonical, sitemap, Open Graph, robots, and structured-data URLs for the former `chatgpt.site` hostname. The post-fix score reflects the corrected production build, not a claim that the unpublished build is already live.

## Score table

| Category | Initial | Post-fix | Max |
| --- | ---: | ---: | ---: |
| Crawlability & Technical Access | 13 | 14 | 15 |
| Indexability & Canonicals | 7 | 14 | 15 |
| Multilingual SEO | 10 | 12 | 15 |
| Content / GEO Readability | 13 | 13 | 15 |
| Structured Data | 6 | 8 | 10 |
| Internal Linking | 8 | 9 | 10 |
| Performance / Mobile | 8 | 8 | 10 |
| AI/Search Crawler Access | 4 | 4 | 5 |
| Member/Auth Isolation | 5 | 5 | 5 |
| **TOTAL** | **74** | **87** | **100** |

## Audit checks and remediation

| Result | Check and exact issue | Location | Fix / recommendation | Priority | Automatically changed |
| --- | --- | --- | --- | --- | --- |
| PASS | All 25 public routes and all four language variants return HTTP 200 in the corrected production build. | `app/**/page.tsx`, `proxy.ts`, `lib/seo.ts` | Preserve the central route inventory and validate it after new routes are added. | Low | No |
| PASS | Googlebot, Bingbot, and OAI-SearchBot each received HTTP 200 from all 25 current live public routes. | Live production; `app/robots.ts` | Confirm managed bot controls in the hosting dashboard. | Medium | No |
| FAIL → PASS | Live robots, sitemap, canonical, Open Graph, Twitter, and JSON-LD URLs used the former Sites hostname instead of the apex domain. | `lib/seo.ts` and all consumers | `SITE_URL` now uses `https://nexavoris.ai`. Publish the corrected build and resubmit the sitemap. | High | Yes |
| PASS | The corrected sitemap contains 100 unique public URLs: 25 routes × four languages. Private, API, admin, and internal rewrite routes are absent. | `app/sitemap.ts`, `lib/seo.ts` | Keep sitemap generation based on the explicit public route inventory. | Low | No |
| PASS | Public locale URLs have self-canonicals and reciprocal x-default, en-US, zh-CN, zh-TW, and es alternatives. | `lib/seo.ts`, localized/resource metadata, `proxy.ts` | Hreflang is now present in HTML metadata as well as HTTP headers and the sitemap. | Medium | Yes |
| PASS | Query parameters are constrained to the supported `lang` values in the indexable URL model. | `proxy.ts`, `lib/i18n.ts` | Avoid introducing indexable tracking/query variants. | Low | No |
| WARNING | `https://www.nexavoris.ai` does not complete TLS negotiation; `http://www.nexavoris.ai` does not redirect cleanly to the apex. | DNS/Sites custom-domain configuration, outside repository | Add the `www` custom domain and certificate, then permanently redirect it to the HTTPS apex. | High | No |
| WARNING | The apex HTTP endpoint redirects to HTTPS with 302 rather than a permanent 301/308. | Sites/Cloudflare edge configuration | Configure a permanent equivalent-path redirect if supported. | Medium | No |
| PASS | Every corrected public response has one H1, at least one description, one canonical, and no old-host reference. | All public page components and metadata helpers | Preserve these assertions in future regression tests. | Low | No |
| PASS | All 133 discovered internal destinations resolve without HTTP 4xx/5xx in the corrected build. | Public page and navigation components | Continue using crawlable anchors for destinations. | Low | Yes—localized resource links were corrected |
| PASS | Resource articles contain an early direct answer, operational explanation, example, limitations, FAQs, related links, Article schema, and breadcrumbs. | `app/resources/[[...slug]]/page.tsx`, `lib/resource-content.ts` | Retain this format; do not mass-generate shallow variants. | Low | No |
| WARNING | Full industry narratives enter the visible DOM only after a modal interaction. Teasers are server-visible, but complete stories are a weaker crawl surface. | `components/industry-stories.tsx` | Render full narratives in semantic disclosures or dedicated factual routes while retaining the modal only as enhancement. | High | No |
| WARNING | Industry stories are presented as client stories with confidentiality wording, but the repository cannot prove whether they are real anonymized accounts or representative composites. | `app/industries/page.tsx`, `components/industry-stories.tsx` | Obtain a business/legal classification and label each story accurately. Do not add Review schema without evidence. | High | No |
| WARNING | Service pages rely on global Organization/WebSite schema and do not emit page-specific `WebPage`/`Service` entities. | Service page components; `app/layout.tsx` | Add factual page-level schema from the same visible copy during a later structured-data pass. | Medium | No |
| PASS | Resource Article and BreadcrumbList schema use visible content and the corrected production domain. No ratings, fake reviews, awards, or customer counts are present. | Resource page schema | Validate after publication with a schema validator. | Low | Domain fixed |
| WARNING | Descriptive fields in global Organization/OfferCatalog schema remain English on localized pages. | `app/layout.tsx` | Add locale-aware page schema rather than duplicating Organization entities. | Medium | No |
| WARNING | Main localized content and metadata are server-rendered, but shared navigation/footer translation is completed client-side. | localized route, `components/language-runtime.tsx`, `app/layout.tsx` | Move shared chrome to locale-aware server rendering in a future i18n architecture pass. | Medium | No |
| WARNING | A stored language can translate an initially English clean URL after hydration. | `components/language-runtime.tsx` | Redirect stored-language visitors to the matching `?lang=` URL before rendering when the platform supports it. | Medium | No |
| PASS | zh-CN and zh-TW have separate catalogs, tags, canonical URLs, and hreflang values; Spanish has its own catalog and URL. | `lib/i18n.ts`, `locales/*`, localized route | Keep the catalogs synchronized when source copy changes. | Low | No |
| PASS | Meaningful public images rendered in the 100-page audit have alt attributes. | Public page/image components | Keep decorative imagery empty-alt and informative imagery concise. | Low | No |
| PASS | Mobile navigation exposes crawlable links, Services/Industries/Resources disclosures, assessment CTA, account state, and language selector. It opens, its Services disclosure works, and Escape closes it. | `components/mobile-navigation.tsx` | Preserve native details/summary semantics and focus behavior. | Low | No |
| PASS | No horizontal overflow and a visible hamburger were found at 320, 360, 375, 390, 412, 430, and 768 px. | Mobile navigation and shared CSS | Repeat this check after header changes. | Low | No |
| PASS | Member and admin bundles are emitted as route-specific chunks rather than being included in the public homepage route. | Build output; account/admin imports | Maintain route boundaries and avoid importing dashboard code into the root layout. | Low | No |
| WARNING | Real Lighthouse scores and field Core Web Vitals are unavailable in the repository. | Production monitoring | Run PageSpeed Insights and monitor Search Console CWV after publication. | Medium | No |
| WARNING | Several PNG assets remain relatively large, particularly the logo/social card and an Open WebUI screenshot. | `public/nexavoris-logo.png`, `public/og.png`, `public/showcase/open-webui/chat-dashboard.png` | Re-encode only if lab tests show a material transfer/render cost. | Medium | No |
| PASS | `/account`, `/admin`, and `/admin/users` require authentication; admin APIs require a server-side administrator role. | account/admin pages, `lib/admin-auth.ts`, `app/api/admin/route.ts` | Keep authorization on every protected request. | Critical | No |
| PASS | Account and admin layouts specify noindex/nofollow/nocache; private and API paths are excluded from sitemap and robots. | `app/account/layout.tsx`, `app/admin/layout.tsx`, `app/robots.ts` | Authentication and potential future password routes were added to robots exclusions defensively. | High | Yes |
| PASS | Personalized member data is requested only from authenticated APIs, has no public personalized URL, no canonical, and no sitemap entry. | member platform/API | Do not serialize profile data into public pages or structured data. | Critical | No |
| WARNING | CDN/firewall/bot-management settings cannot be proven from source code. | Sites/Cloudflare management plane | Confirm verified-bot access and review production logs. | Medium | No |

## Route inventory

PUBLIC marketing routes: `/`, `/ai-solutions`, `/erp-solutions`, `/website-design`, `/ai-erp`, `/equipment`, `/industries`, `/pricing`, `/about`, `/contact`, `/free-account`, `/assessment`.

PUBLIC GEO/resource routes: `/resources`, `/resources/private-ai`, `/resources/odoo-erp`, `/resources/ai-erp`, `/resources/business-automation`, `/resources/comparisons`, `/resources/guides`, and six `/resources/industries/*` guides.

PRIVATE: `/account` and all member tools/results rendered inside it.  
ADMIN: `/admin`, `/admin/users`, and `/api/admin`.  
AUTH/DISPATCH: `/signin-with-chatgpt`, `/signout-with-chatgpt`, callback handling.  
INTERNAL/NOT INDEXABLE: `/localized-content/*`, `/api/*`.

### Public route table

Every row was checked in en-US, zh-CN, zh-TW, and es. “Self” means each language URL canonicalizes to its own URL.

| Route | Languages | Indexable | Canonical | Status |
| --- | --- | --- | --- | --- |
| `/` | en-US / zh-CN / zh-TW / es | Yes | Self | PASS |
| `/ai-solutions` | all four | Yes | Self | PASS |
| `/erp-solutions` | all four | Yes | Self | PASS |
| `/website-design` | all four | Yes | Self | PASS |
| `/ai-erp` | all four | Yes | Self | PASS |
| `/equipment` | all four | Yes | Self | PASS |
| `/industries` | all four | Yes | Self | WARNING—full stories modal-dependent |
| `/pricing` | all four | Yes | Self | PASS |
| `/about` | all four | Yes | Self | PASS |
| `/contact` | all four | Yes | Self | PASS |
| `/free-account` | all four | Yes | Self | PASS |
| `/assessment` | all four | Yes | Self | PASS |
| `/resources` | all four | Yes | Self | PASS |
| `/resources/private-ai` | all four | Yes | Self | PASS |
| `/resources/odoo-erp` | all four | Yes | Self | PASS |
| `/resources/ai-erp` | all four | Yes | Self | PASS |
| `/resources/business-automation` | all four | Yes | Self | PASS |
| `/resources/comparisons` | all four | Yes | Self | PASS |
| `/resources/guides` | all four | Yes | Self | PASS |
| `/resources/industries/wholesale-distribution` | all four | Yes | Self | PASS |
| `/resources/industries/hvac-field-service` | all four | Yes | Self | PASS |
| `/resources/industries/construction` | all four | Yes | Self | PASS |
| `/resources/industries/manufacturing` | all four | Yes | Self | PASS |
| `/resources/industries/retail` | all four | Yes | Self | PASS |
| `/resources/industries/professional-services` | all four | Yes | Self | PASS |

## Language audit

| Language | Routing | Hreflang | Canonical | Metadata | Main content | Shared chrome | Status |
| --- | --- | --- | --- | --- | --- | --- | --- |
| English | PASS | PASS | PASS | PASS | PASS | PASS | PASS |
| Simplified Chinese | PASS | PASS | PASS | PASS | PASS | Client-completed | WARNING |
| Traditional Chinese | PASS | PASS | PASS | PASS | PASS | Client-completed | WARNING |
| Spanish | PASS | PASS | PASS | PASS | PASS | Client-completed | WARNING |

## Industry audit

| Industry | Unique guide | Story teaser crawlable | Full story | Internal links | Four languages | Status |
| --- | --- | --- | --- | --- | --- | --- |
| Wholesale Distribution | PASS | PASS | Modal-dependent | PASS | PASS | WARNING |
| HVAC / Field Service | PASS | PASS | Modal-dependent | PASS | PASS | WARNING |
| Construction | PASS | PASS | Modal-dependent | PASS | PASS | WARNING |
| Manufacturing | PASS | PASS | Modal-dependent | PASS | PASS | WARNING |
| Retail | PASS | PASS | Modal-dependent | PASS | PASS | WARNING |
| Professional Services | PASS | PASS | Modal-dependent | PASS | PASS | WARNING |

## Orphan and broken-link report

No broken internal destination was found among 133 discovered links. All sitemap routes are reachable from navigation, the resources library, related-resource blocks, homepage/service CTAs, or the sitemap. The six industry guides are reachable from mobile navigation and the Resources library. No major public orphan was found.

## GEO quotability

- **PASS:** Private AI, Odoo ERP, AI + ERP, automation, comparisons, guides, and each industry guide use an early “Direct answer” block followed by self-contained context, example, limitations, and questions.
- **PASS:** No invented benchmarks, ratings, savings percentages, awards, or customer counts were found.
- **WARNING:** Marketing service pages are useful but less directly quotable than the resource guides; route-level Service/WebPage schema is also absent.
- **WARNING:** Industry story classification must be verified before search engines are encouraged to interpret those narratives as customer evidence.

## Duplicate/thin-content findings

The resource topics are distinct and sufficiently developed. Industry resources share a deliberate editorial structure but contain different operational terminology and examples. No thin keyword-only route was found. The dynamic industry resource generator creates a manageable six-page set rather than bulk SEO pages. No consolidation was required.

## Regression comparison

### Improvements

- The apex custom domain is now active.
- The route inventory expanded from 10 route types/40 localized URLs to 25 routes/100 localized URLs.
- Resource pages add direct answers, limitations, FAQs, related links, Article schema, and breadcrumbs.
- Member/admin content remains isolated despite major authenticated-platform growth.
- Mobile navigation now exposes the complete public information architecture.

### Regressions

- The old Sites hostname remained in the central SEO constant after the custom-domain launch, affecting live canonical infrastructure.
- New public/authenticated features increased the importance of explicit private/auth route exclusions.

### Newly introduced issues

- `www` is not configured with working HTTPS and canonical redirect behavior.
- Shared localized navigation/footer remain dependent on client translation.
- Industry-story full text remains interaction-dependent.

### Previously fixed issues that returned

- Production-domain consistency returned as a regression when the custom domain changed but `SITE_URL` did not.

## Changes automatically made

1. Replaced the old Sites hostname with `https://nexavoris.ai` in the central production SEO configuration.
2. Added reciprocal HTML metadata hreflang entries while retaining HTTP and sitemap hreflang.
3. Strengthened robots exclusions for private, admin, API, authentication, password, member, and dashboard paths.
4. Preserved language parameters in resource-library, breadcrumb, related-resource, and assessment links.
5. Added this re-audit and the production manual checklist.

Issues fixed: **5**  
Issues remaining: **10**  
Critical remaining: **0**  
High remaining: **3**  
Medium remaining: **7**

## Production checks still required

See `PRODUCTION_GEO_SEO_CHECKLIST.md`. The most important are publishing the corrected canonical infrastructure, configuring `www`, validating managed bot controls, submitting the corrected sitemap, validating schema, and obtaining real PageSpeed/Core Web Vitals data.

## Final terminal summary

NEXAVORIS PHASE 1 GEO + SEO RE-AUDIT

- Production Domain: https://nexavoris.ai
- Initial Score: 74/100
- Post-Fix Score: 87/100
- Status: READY WITH MINOR FIXES
- Critical: 0
- High: 3
- Medium: 7
- Low: 0 material remaining
- Public Pages Audited: 25
- Localized Pages Audited: 100
- Broken Links Fixed: 0 (none found)
- Metadata Issues Fixed: 1 central domain defect affecting all pages
- hreflang Issues Fixed: 100 pages strengthened with HTML alternates
- Structured Data Issues Fixed: production-domain references
- Private Pages Protected: YES
- OAI-SearchBot: PASS with production-dashboard WARNING
- Googlebot: PASS with production-dashboard WARNING
- Bingbot: PASS with production-dashboard WARNING

Top remaining actions:

1. Publish the corrected production-domain metadata and sitemap.
2. Configure valid HTTPS and a permanent apex redirect for `www`.
3. Verify and accurately classify the industry stories.
4. Run PageSpeed Insights and monitor field Core Web Vitals.
5. Confirm managed crawler/firewall policies and submit the sitemap to Google and Bing.

