# Nexavoris GEO Technical Audit

Audit date: 2026-09-05  
Audit scope: Phase 1 technical SEO/GEO readiness of the existing production website and repository  
Overall Score: **83 / 100**  
Overall Status: **READY WITH MINOR FIXES**

The score reflects the repository, a successful production build, raw server-rendered responses for all 40 route/language combinations, and live crawler requests. Unknown hosting-dashboard controls and field performance data are warnings, not passes.

## Score Summary

| Category | Score | Maximum | Status | Reason |
| --- | ---: | ---: | --- | --- |
| Crawlability & Technical Access | 18 | 20 | PASS | Robots, sitemap, HTTPS Site origin, server navigation, and all public routes are crawlable; the purchased custom domain does not currently resolve. |
| Indexability & Canonicals | 18 | 20 | PASS | Every tested page has one correct self-canonical and index/follow metadata; locale parameters are controlled. No dedicated industry routes exist. |
| Multilingual SEO/GEO | 18 | 20 | PASS | Four indexable locale variants, correct HTML language, localized metadata, self/reciprocal hreflang, x-default, and persistence are implemented. Stored-language fallback can briefly translate an English URL client-side. |
| Semantic Content | 11 | 15 | WARNING | All routes have one H1, crawlable links, HTML copy, and complete image alt text. Full industry narratives are supplied through a client modal rather than semantic server-visible article bodies. |
| Structured Data | 6 | 10 | WARNING | Valid Organization/ProfessionalService, WebSite, and OfferCatalog data exists without ratings/reviews. Page-level WebPage, Service, and BreadcrumbList markup is absent, and the global service catalog remains English on translated pages. |
| Performance & Mobile | 8 | 10 | PASS | Responsive images, dimensions, lazy loading, viewport support, and lazy locale chunks are present. Several PNGs are oversized and no field CWV data is available. |
| AI/Search Crawler Access | 4 | 5 | PASS | OAI-SearchBot, Googlebot, and Bingbot are explicitly allowed and received HTTP 200 on all ten public routes. Hosting firewall/bot controls require dashboard verification. |
| **TOTAL** | **83** | **100** | **READY WITH MINOR FIXES** | Phase 1 infrastructure is sound; trust labeling, industry crawlability, domain configuration, and richer schema remain. |

## Findings Register

| Result | Finding | Reason / evidence | Exact file or component | Recommended fix | Priority |
| --- | --- | --- | --- | --- | --- |
| PASS | Public crawler policy | Explicit `Allow: /` rules exist for OAI-SearchBot, Googlebot, Bingbot, and `*`; only the internal locale implementation path is excluded. | `app/robots.ts` | Retain current rules and re-test after hosting/security changes. | Low |
| PASS | Generated multilingual sitemap | 40 intended URLs and 200 hreflang relationships are generated from one route inventory; no admin/test routes are listed. | `app/sitemap.ts`, `lib/seo.ts` | Keep `marketingRoutes` current when routes change. | Low |
| PASS | No global noindex | Root metadata is index/follow and all 40 audited responses lacked accidental noindex behavior. | `app/layout.tsx` | Retain explicit robots metadata. | Low |
| WARNING | Purchased domain is not production-ready | `nexavoris.ai` did not resolve during the audit. Canonicals correctly use the reachable Sites origin for now, but brand-domain authority cannot accrue until DNS and hosting are connected. | `lib/seo.ts`; external DNS/Sites custom-domain settings | Connect and verify `nexavoris.ai`, redirect the Sites hostname to it if supported, then change `SITE_URL` once and republish. | High |
| PASS | Canonical isolation | Each route self-canonicalizes; translated pages canonicalize to their own language URL rather than English or the homepage. | `lib/seo.ts`, localized route metadata | Keep query handling limited to the supported `lang` values. | Low |
| WARNING | Industry content has no dedicated routes | Six industries share `/industries`; there are no crawlable industry-specific URLs, titles, canonicals, or H1s. This limits precise retrieval by search/answer engines. | `app/industries/page.tsx`, `components/industry-stories.tsx` | In Phase 2, consider a deliberate industry-route architecture with unique factual content; do not mass-generate thin pages. | High |
| WARNING | Full industry stories depend on client UI | Short cards are semantic in initial HTML. Full narratives are passed in the React server payload but enter the visible DOM only after opening a modal, which is weaker than server-rendered article content. | `components/industry-stories.tsx` | Render each complete story in semantic HTML (for example, an accessible disclosure or dedicated route) while keeping the modal as enhancement. | High |
| WARNING | Representative-story disclosure is ambiguous | The UI says “CLIENT STORIES” and says names are omitted for confidentiality, but does not state whether the scenarios are representative composites. This could imply verified customers. No fake names, ratings, review schema, or numeric outcomes were found. | `app/industries/page.tsx`, `components/industry-stories.tsx` | Obtain a business/legal decision and label the stories accurately as real anonymized accounts or representative workflow examples. | High |
| PASS | Four-language URL model | English, zh-CN, zh-TW, and es have distinct public URLs; the proxy preserves the public URL and rewrites only internally. | `proxy.ts`, localized route | Retain this public/internal separation. | Low |
| PASS | Hreflang graph | Every response emits x-default, en-US, zh-CN, zh-TW, and es alternates in HTTP `Link`; the sitemap repeats the complete relationship graph. | `proxy.ts`, `app/sitemap.ts` | Optionally add equivalent HTML link elements if future tooling requires them, but avoid duplicate/conflicting sets. | Low |
| PASS | Localized search metadata | Titles, descriptions, canonical URLs, Open Graph URLs, and Open Graph locale values are localized after the automatic fixes in this audit. | localized route metadata, `locales/overrides.ts` | Add explicit translated metadata with each future route. | Medium |
| WARNING | Stored-language fallback can change an English URL after hydration | If no `lang` parameter exists, localStorage can translate the English response and mutate its canonical client-side. Crawlers receive stable SSR, but users can momentarily see content whose URL started as English. | `components/language-runtime.tsx` | On a later architecture pass, redirect stored-language visitors to the corresponding language URL before translating content. | Medium |
| PASS | Semantic route headings | All 40 route/language responses contain exactly one H1. Core pages have logical H2/H3 support, except Contact appropriately has only its H1. | All route page components | Preserve one-H1 discipline. | Low |
| PASS | Text and navigation are indexable | Core claims and service descriptions are HTML text. Primary navigation and CTAs are real anchors, and each page exposes 11–22 internal links in raw SSR. | `app/layout.tsx`, route components | Prefer descriptive route-specific anchor text as content expands. | Low |
| PASS | Image alternatives | Raw SSR found matching alt attributes on every rendered image across all 40 URLs. Responsive `sizes` are used throughout content images. | Route components, gallery components | Continue writing concise, purpose-specific alt text. | Low |
| PASS | Core accessibility baseline | Skip link, labelled primary navigation, labelled form controls, keyboard-operable native controls, modal Escape support, and focus return exist. Language-selector accessible text was localized in this audit. | `app/layout.tsx`, `app/contact/page.tsx`, `components/industry-stories.tsx`, `components/language-runtime.tsx` | Add focus trapping/inert background behavior to the industry dialog. | Medium |
| WARNING | Page-specific schema is limited | Global entity schema is valid, but pages do not emit WebPage, Service, or BreadcrumbList entities tied to their visible content. | `app/layout.tsx` | Add factual per-page JSON-LD from the same metadata/content source; use BreadcrumbList only where visible/useful. | Medium |
| WARNING | Global schema language | Global OfferCatalog/`knowsAbout` values remain English on translated pages. The organization identity itself is consistent. | `app/layout.tsx` | Localize descriptive schema values and set appropriate `inLanguage` on page-level entities. | Medium |
| PASS | No deceptive schema | No AggregateRating, Review, invented person/customer identity, or performance claim schema exists. | `app/layout.tsx` | Keep structured data limited to visible, supportable facts. | Low |
| WARNING | Large raster files | `og.png` is about 958 KB, the logo about 890 KB, and one Open WebUI screenshot about 577 KB. Total raster assets are about 8.22 MB, though routes do not load all assets at once. | `public/og.png`, `public/nexavoris-logo.png`, `public/showcase/open-webui/chat-dashboard.png` | Re-encode oversized PNGs losslessly or as suitable WebP/AVIF while preserving the current appearance. | Medium |
| PASS | Locale bundle splitting | Non-English catalogs are dynamic chunks (about 74 KB for each Chinese catalog and 84 KB for Spanish) and are not loaded for default English until needed. | `lib/i18n.ts`, build output | Keep locale imports dynamic. | Low |
| WARNING | Lab and field performance are unverified | Production build passes, but Lighthouse is not installed locally and no Search Console/CrUX data is represented in the repository. | Runtime environment; production monitoring | Run Lighthouse/PageSpeed against the final custom domain and monitor Search Console/CrUX after sufficient traffic. | Medium |
| WARNING | Edge bot controls are outside the repository | Repository rules and live requests pass, but Sites/CDN firewall and bot-management dashboards are not represented in code. | Production hosting dashboard | Verify no managed rule challenges or blocks OAI-SearchBot, Googlebot, or Bingbot. | Medium |

## Critical Issues

None found.

## High Priority Issues

1. Connect and verify the purchased `nexavoris.ai` domain before switching canonical infrastructure away from the currently reachable Sites URL.
2. Decide and disclose whether the industry stories are real anonymized accounts or representative composites.
3. Make full industry narratives semantic and server-visible without relying on a modal interaction.
4. Consider dedicated industry routes only as a deliberate Phase 2 content architecture, not as bulk-generated thin pages.

## Medium Priority Issues

1. Add factual page-specific WebPage and Service JSON-LD.
2. Localize descriptive JSON-LD fields.
3. Redirect stored-language visitors to a locale URL before client translation.
4. Re-encode the three largest PNG assets.
5. Add a complete modal focus trap and inert background behavior.
6. Run production Lighthouse/PageSpeed and begin field CWV monitoring.
7. Verify managed bot/firewall settings in the hosting dashboard.

## Low Priority Improvements

1. Add visible breadcrumbs only if dedicated nested service or industry routes are introduced.
2. Continue replacing repeated generic CTA anchor text with route-specific wording where natural.
3. Maintain the central route inventory whenever a page is added or removed.
4. Retest sitemap, hreflang, metadata, and alt coverage in CI after future changes.
5. Consider HTML hreflang links only if external audit tools fail to recognize the valid HTTP and sitemap implementation.

## Passed Checks

- Production build completed successfully.
- All 40 public route/language combinations returned HTTP 200 locally.
- All ten public routes returned HTTP 200 live for OAI-SearchBot, Googlebot, and Bingbot.
- Exactly one H1, one canonical, metadata, Open Graph data, schema output, and complete image alt coverage were found on every audited route/language response.
- HTTPS is used for the production Site origin.
- No redirect loops were observed.
- No public route requires JavaScript-only navigation for discovery.
- No accidental public noindex, admin route, private route, or test route was found in the sitemap.
- Brand name, address, telephone, and email are consistent across footer and Organization schema.
- The site clearly describes Private AI, AI knowledge systems, Odoo ERP, AI + ERP integration, workflow automation, equipment, and website services.

## Route Audit

Status key: **PASS** = technically indexable and complete; **WARNING** = indexable with a documented limitation.

| Route | Language | Indexable | Canonical | Metadata | H1 | Schema | Internal Link | Status |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| `/` | en-US | PASS | PASS | PASS | PASS | Global | PASS | PASS |
| `/` | zh-CN | PASS | PASS | PASS | PASS | Global/English descriptors | PASS | PASS |
| `/` | zh-TW | PASS | PASS | PASS | PASS | Global/English descriptors | PASS | PASS |
| `/` | es | PASS | PASS | PASS | PASS | Global/English descriptors | PASS | PASS |
| `/ai-solutions` | en-US | PASS | PASS | PASS | PASS | Global; no Service | PASS | WARNING |
| `/ai-solutions` | zh-CN | PASS | PASS | PASS | PASS | Global/English; no Service | PASS | WARNING |
| `/ai-solutions` | zh-TW | PASS | PASS | PASS | PASS | Global/English; no Service | PASS | WARNING |
| `/ai-solutions` | es | PASS | PASS | PASS | PASS | Global/English; no Service | PASS | WARNING |
| `/erp-solutions` | en-US | PASS | PASS | PASS | PASS | Global; no Service | PASS | WARNING |
| `/erp-solutions` | zh-CN | PASS | PASS | PASS | PASS | Global/English; no Service | PASS | WARNING |
| `/erp-solutions` | zh-TW | PASS | PASS | PASS | PASS | Global/English; no Service | PASS | WARNING |
| `/erp-solutions` | es | PASS | PASS | PASS | PASS | Global/English; no Service | PASS | WARNING |
| `/website-design` | en-US | PASS | PASS | PASS | PASS | Global; no Service | PASS | WARNING |
| `/website-design` | zh-CN | PASS | PASS | PASS | PASS | Global/English; no Service | PASS | WARNING |
| `/website-design` | zh-TW | PASS | PASS | PASS | PASS | Global/English; no Service | PASS | WARNING |
| `/website-design` | es | PASS | PASS | PASS | PASS | Global/English; no Service | PASS | WARNING |
| `/ai-erp` | en-US | PASS | PASS | PASS | PASS | Global; no Service | PASS | WARNING |
| `/ai-erp` | zh-CN | PASS | PASS | PASS | PASS | Global/English; no Service | PASS | WARNING |
| `/ai-erp` | zh-TW | PASS | PASS | PASS | PASS | Global/English; no Service | PASS | WARNING |
| `/ai-erp` | es | PASS | PASS | PASS | PASS | Global/English; no Service | PASS | WARNING |
| `/equipment` | en-US | PASS | PASS | PASS | PASS | Global | PASS | PASS |
| `/equipment` | zh-CN | PASS | PASS | PASS | PASS | Global/English descriptors | PASS | WARNING |
| `/equipment` | zh-TW | PASS | PASS | PASS | PASS | Global/English descriptors | PASS | WARNING |
| `/equipment` | es | PASS | PASS | PASS | PASS | Global/English descriptors | PASS | WARNING |
| `/industries` | en-US | PASS | PASS | PASS | PASS | Global | PASS | WARNING: modal stories |
| `/industries` | zh-CN | PASS | PASS | PASS | PASS | Global/English descriptors | PASS | WARNING: modal stories |
| `/industries` | zh-TW | PASS | PASS | PASS | PASS | Global/English descriptors | PASS | WARNING: modal stories |
| `/industries` | es | PASS | PASS | PASS | PASS | Global/English descriptors | PASS | WARNING: modal stories |
| `/pricing` | en-US | PASS | PASS | PASS | PASS | Global | PASS | PASS |
| `/pricing` | zh-CN | PASS | PASS | PASS | PASS | Global/English descriptors | PASS | WARNING |
| `/pricing` | zh-TW | PASS | PASS | PASS | PASS | Global/English descriptors | PASS | WARNING |
| `/pricing` | es | PASS | PASS | PASS | PASS | Global/English descriptors | PASS | WARNING |
| `/about` | en-US | PASS | PASS | PASS | PASS | Global | PASS | PASS |
| `/about` | zh-CN | PASS | PASS | PASS | PASS | Global/English descriptors | PASS | WARNING |
| `/about` | zh-TW | PASS | PASS | PASS | PASS | Global/English descriptors | PASS | WARNING |
| `/about` | es | PASS | PASS | PASS | PASS | Global/English descriptors | PASS | WARNING |
| `/contact` | en-US | PASS | PASS | PASS | PASS | Global | PASS | PASS |
| `/contact` | zh-CN | PASS | PASS | PASS | PASS | Global/English descriptors | PASS | WARNING |
| `/contact` | zh-TW | PASS | PASS | PASS | PASS | Global/English descriptors | PASS | WARNING |
| `/contact` | es | PASS | PASS | PASS | PASS | Global/English descriptors | PASS | WARNING |

The prompt’s example paths `/private-ai`, `/odoo-erp`, and `/ai-erp-integration` are not actual routes. Their implemented equivalents are `/ai-solutions`, `/erp-solutions`, and `/ai-erp`. They were not added as aliases because changing URL architecture was outside this audit.

## Industry Audit

| Industry | Dedicated page | Correct title/H1 | Unique description | Full story crawlability | CTA | Four languages | Duplication | Status |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Wholesale & Distribution | FAIL | Shared page only | PASS | WARNING: client modal/RSC payload | PASS | PASS | PASS | WARNING |
| HVAC & Field Service | FAIL | Shared page only | PASS | WARNING: client modal/RSC payload | PASS | PASS | PASS | WARNING |
| Construction | FAIL | Shared page only | PASS | WARNING: client modal/RSC payload | PASS | PASS | PASS | WARNING |
| Retail | FAIL | Shared page only | PASS | WARNING: client modal/RSC payload | PASS | PASS | PASS | WARNING |
| Manufacturing | FAIL | Shared page only | PASS | WARNING: client modal/RSC payload | PASS | PASS | PASS | WARNING |
| Service Companies | FAIL | Shared page only | PASS | WARNING: client modal/RSC payload | PASS | PASS | PASS | WARNING |

The six narratives and teasers are meaningfully distinct. No copied numeric outcomes, ratings, customer names, or company names were found.

## Language Audit

| Language | URL | HTML `lang` | Hreflang | Canonical | Title | Description | OG locale | Server HTML content | Persistence | Status |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| English | Clean path | PASS `en-US` | PASS | PASS | PASS | PASS | PASS `en_US` | PASS | WARNING: stored locale may replace it | PASS |
| Simplified Chinese | `?lang=zh-cn` | PASS `zh-CN` | PASS | PASS | PASS | PASS after fix | PASS `zh_CN` after fix | PASS | PASS | PASS |
| Traditional Chinese | `?lang=zh-tw` | PASS `zh-TW` | PASS | PASS | PASS | PASS after fix | PASS `zh_TW` after fix | PASS | PASS | PASS |
| Spanish | `?lang=es` | PASS `es` | PASS | PASS | PASS | PASS after fix | PASS `es_ES` after fix | PASS | PASS | PASS |

Translation catalogs contain 740 matching base keys for each language. The audit found one deliberate localization bypass around the language selector; its screen-reader label was hard-coded in English and was localized automatically. The remaining hard-coded visitor-facing strings are translated through the established server/client catalog lookup rather than imported key constants. This works, but exact English sentences as keys make copy edits fragile; a later i18n refactor to stable semantic keys would improve maintainability without changing URLs.

## Structured Data Audit

| Page type | Present | Validity | Match to visible content | Status |
| --- | --- | --- | --- | --- |
| All pages | Organization + ProfessionalService | Valid JSON-LD | Company identity/contact/services match | PASS |
| All pages | WebSite | Valid JSON-LD | Name, publisher, and supported languages match | PASS |
| All pages | OfferCatalog | Valid JSON-LD | Visible service categories match; descriptions remain English | WARNING |
| Service pages | Service | Missing | Recommended, not required | WARNING |
| Individual pages | WebPage | Missing | Recommended for clearer page identity | WARNING |
| Nested pages | BreadcrumbList | Missing | Not necessary in current shallow UI; useful with future nested routes | LOW |
| Industries | Review/AggregateRating | Correctly absent | No supported review/rating data exists | PASS |

`LocalBusiness` was not added because the repository does not establish walk-in/local-service facts beyond the company address. `Article` was not added because no dedicated editorial articles exist.

## Metadata Audit

All ten route types have distinct English titles and descriptions through `pageMetadata()`. Each localized variant has a translated title and, after this audit’s safe fixes, a translated description and localized Open Graph locale. Every response has one canonical, Open Graph title/description/image, Twitter card data, language information, and index/follow behavior. The shared branded social image is appropriate for these non-detail marketing pages.

## Performance Findings

- Production build: PASS.
- Responsive image declarations and intrinsic dimensions/fill containers: PASS.
- Below-fold lazy loading through the image component: PASS; selected above-fold/gallery images are intentionally prioritized.
- Locale code splitting: PASS.
- Viewport/mobile CSS foundation: PASS by framework and responsive stylesheet inspection.
- Excessive initial animation risk: no blocking large scripted animation was found; motion is primarily CSS.
- Largest asset risks: `og.png` ~958 KB, logo ~890 KB, Open WebUI chat screenshot ~577 KB.
- Lighthouse was not available in the local environment, so no Lighthouse score is claimed.
- **Field Core Web Vitals data requires production monitoring/Search Console and cannot be verified from the local codebase alone.**

## AI Crawler Findings

| Crawler | Repository rule | Live public routes | Meta robots | CDN/firewall | Status |
| --- | --- | --- | --- | --- | --- |
| OAI-SearchBot | Allowed | 10/10 HTTP 200 | Index/follow | Not represented in repository | PASS with production-dashboard WARNING |
| Googlebot | Allowed | 10/10 HTTP 200 | Index/follow | Not represented in repository | PASS with production-dashboard WARNING |
| Bingbot | Allowed | 10/10 HTTP 200 | Index/follow | Not represented in repository | PASS with production-dashboard WARNING |

Existing intended robots rules:

```text
User-agent: OAI-SearchBot
Allow: /
Disallow: /localized-content/

User-agent: Googlebot
Allow: /
Disallow: /localized-content/

User-agent: Bingbot
Allow: /
Disallow: /localized-content/

User-agent: *
Allow: /
Disallow: /localized-content/

Sitemap: https://nexavoris-ai-erp.l-leung.chatgpt.site/sitemap.xml
Host: https://nexavoris-ai-erp.l-leung.chatgpt.site
```

These rules are appropriate for the current architecture. `/localized-content/` is an internal duplicate rendering route and should remain excluded. OAI-SearchBot is correctly distinguished from other OpenAI crawler user agents.

## Changes Automatically Made

1. Added translated meta descriptions for the nine non-contact metadata descriptions in Simplified Chinese, Traditional Chinese, and Spanish.
2. Corrected Open Graph locale and alternate-locale values on translated pages.
3. Localized the language selector’s visible-to-assistive-technology label.
4. Added this measurable audit report.

No route, design, pricing, marketing narrative, or hosting architecture was changed.

## Changes Requiring Production Verification

1. DNS and custom-domain connection for `nexavoris.ai`.
2. Redirect/canonical behavior after the custom domain becomes live.
3. Sites/CDN managed firewall and bot-protection policy.
4. Google Search Console and Bing Webmaster Tools ownership, sitemap submission, indexing, and URL inspection.
5. Lighthouse/PageSpeed results and field Core Web Vitals on the final domain.
6. Business/legal classification of the anonymized industry stories.

## Recommended Next Actions

1. Connect `nexavoris.ai`, verify HTTPS, switch the central production URL, and republish.
2. Resolve industry-story disclosure and render the full stories as semantic server-visible content.
3. Add conservative page-level WebPage and Service JSON-LD sourced from visible page content.
4. Optimize the three largest PNG files without changing their appearance.
5. Run PageSpeed Insights and register the final domain in Google Search Console and Bing Webmaster Tools.

