# Nexavoris GEO + SEO Regression Verification

Production Domain: https://nexavoris.ai  
Verification Date: September 8, 2026

## Score History

Initial Re-Audit: **74/100**  
Post-Fix Release Candidate: **87/100**  
Current Verified Production: **74/100**  
Net Production Improvement: **0**  
Corrected Release Candidate After This Verification: **88/100**

The prior report correctly stated that 87/100 described an unpublished corrected build. Production still serves the older hostname configuration. The score therefore cannot be credited to production until the corrected version is deployed and retested.

| Category | Initial | Post-Fix | Current Production | Corrected Candidate | Change in Production |
| --- | ---: | ---: | ---: | ---: | ---: |
| Crawlability & Technical Access | 13/15 | 14/15 | 13/15 | 14/15 | 0 |
| Indexability & Canonicals | 7/15 | 14/15 | 7/15 | 14/15 | 0 |
| Multilingual SEO | 10/15 | 12/15 | 10/15 | 13/15 | 0 |
| Content / GEO Readability | 13/15 | 13/15 | 13/15 | 13/15 | 0 |
| Structured Data | 6/10 | 8/10 | 6/10 | 8/10 | 0 |
| Internal Linking | 8/10 | 9/10 | 8/10 | 9/10 | 0 |
| Performance / Mobile | 8/10 | 8/10 | 8/10 | 8/10 | 0 |
| AI/Search Crawler Access | 4/5 | 4/5 | 4/5 | 4/5 | 0 |
| Member/Auth Isolation | 5/5 | 5/5 | 5/5 | 5/5 | 0 |
| **TOTAL** | **74/100** | **87/100** | **74/100** | **88/100** | **0** |

## Five Critical Systems Summary

| Critical Area | Before Fix | After Fix Candidate | Verified Now | Status |
| --- | --- | --- | --- | --- |
| Canonicals | Old Sites hostname | Apex self-canonicals | Candidate passes; production still old | **FAIL in production** |
| hreflang | Old-host alternates | Reciprocal EN/zh-CN/zh-TW/ES/x-default | Candidate passes; production still old | **FAIL in production** |
| Sitemap | 100 URLs on old host | 100 apex URLs | Production has 100 unique URLs, zero on apex | **FAIL in production** |
| Mobile Navigation | Complete responsive drawer | Preserved | Tested at all seven widths | **PASS** |
| Private Isolation | Server-protected and excluded | Preserved and robots strengthened | Live anonymous access denied; candidate isolation passes | **PASS** |

## Regression Classification

### Fixed and verified in the corrected candidate

- The central canonical host is `https://nexavoris.ai`.
- All 100 localized public responses have the expected self-canonical and reciprocal `x-default`, `en-US`, `zh-CN`, `zh-TW`, and `es` links.
- The sitemap contains 100 unique intended public URLs and excludes private, authentication, API, and internal rewrite routes.
- Resource library, breadcrumb, related-resource, and assessment links retain locale context.
- Account and admin layouts remain `noindex`, `nofollow`, and `nocache`.
- Admin pages require a signed-in user and server-side administrator actor; sensitive role changes call `requireAdminActor('admin')` in the API.
- The mobile drawer contains complete navigation, language selection, account state, assessment CTA, and functional nested groups.

### Fixed but regressed

None in the tested source. The domain correction was never deployed, rather than deployed and later lost.

### Partially fixed

1. **Production-domain consistency.** Fixed in source, not on the live site. Production HTML, sitemap, robots host, Open Graph, and JSON-LD still use the observed legacy host `nexavoris-ai-erp.l-leung.chatgpt.site`.
2. **Localized free-account and assessment metadata.** Their visible content changed by locale, but their canonical previously remained English. This verification added locale-aware metadata; the candidate now passes.
3. **Crawler exclusions.** Live robots excludes account/admin/API/internal routes, while the candidate additionally excludes authentication, password, member, and dashboard route families.

### Still open

- Full industry-story narratives remain modal-dependent.
- Industry-story factual classification requires management/legal confirmation.
- Service pages still lack page-specific `WebPage`/`Service` schema.
- Global Organization/OfferCatalog descriptions remain English on localized pages.
- Shared navigation/footer translation remains client-completed.
- Stored-language hydration can translate a clean English URL before navigation to a locale URL.
- Large PNG assets remain candidates for measured optimization.

### Cannot verify in code

- Google Search Console ownership, selected canonicals, sitemap acceptance, and indexing.
- Bing Webmaster ownership, sitemap acceptance, and indexing.
- Managed CDN/firewall verified-bot policy and complete crawler logs.
- Field Core Web Vitals and real-user performance.
- Correct `www` TLS/DNS/redirect configuration.

## Canonical Deep Verification

The table shows representative major page types; the automated candidate test checked all 25 routes in all four languages.

| Page | Language | Expected Canonical | Candidate Actual | Production Actual | Result |
| --- | --- | --- | --- | --- | --- |
| `/` | en-US | `https://nexavoris.ai` | Expected | Legacy host | Production FAIL |
| `/ai-solutions` | zh-CN | `https://nexavoris.ai/ai-solutions?lang=zh-cn` | Expected | Legacy host | Production FAIL |
| `/erp-solutions` | zh-TW | `https://nexavoris.ai/erp-solutions?lang=zh-tw` | Expected | Legacy host | Production FAIL |
| `/website-design` | es | `https://nexavoris.ai/website-design?lang=es` | Expected | Legacy host | Production FAIL |
| `/resources/private-ai` | en-US | `https://nexavoris.ai/resources/private-ai` | Expected | Legacy host | Production FAIL |
| `/resources/comparisons` | es | `https://nexavoris.ai/resources/comparisons?lang=es` | Expected | Legacy host | Production FAIL |
| `/resources/industries/wholesale-distribution` | zh-CN | apex path plus `?lang=zh-cn` | Expected | Legacy host | Production FAIL |
| `/resources/industries/hvac-field-service` | zh-TW | apex path plus `?lang=zh-tw` | Expected | Legacy host | Production FAIL |
| `/free-account` | es | `https://nexavoris.ai/free-account?lang=es` | Expected after fix | English canonical before fix | Candidate PASS |
| `/assessment` | zh-TW | `https://nexavoris.ai/assessment?lang=zh-tw` | Expected after fix | English canonical before fix | Candidate PASS |

Unsupported query parameters are not added to canonical URLs. Supported locale parameters identify distinct localized content. No Vercel, Netlify, GitHub Pages, localhost, or `127.0.0.1` SEO output exists in the corrected candidate. Root trailing slash presentation is normalized consistently by the framework; no distinct duplicate document was found.

## Hreflang Verification

| Page Group | EN | zh-CN | zh-TW | ES | Self/Reciprocal | Candidate | Production |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Homepage | PASS | PASS | PASS | PASS | PASS | PASS | FAIL—old host |
| Services | PASS | PASS | PASS | PASS | PASS | PASS | FAIL—old host |
| Pricing/About/Contact | PASS | PASS | PASS | PASS | PASS | PASS | FAIL—old host |
| Resource library/guides | PASS | PASS | PASS | PASS | PASS | PASS | FAIL—old host |
| Comparison guide | PASS | PASS | PASS | PASS | PASS | PASS | FAIL—old host |
| Six industry guides | PASS | PASS | PASS | PASS | PASS | PASS | FAIL—old host |
| Free account/assessment | PASS | PASS | PASS | PASS | PASS after verification fix | PASS | FAIL—old host/unlocalized canonical |

`zh-CN` and `zh-TW` remain distinct in locale catalogs, HTML language, canonical query value, Open Graph locale, content, and hreflang. Neither maps to the other. The language selector retains the current path and selects the corresponding supported locale URL; localized resource links now preserve the locale parameter.

## Sitemap Coverage

| Measurement | Corrected Candidate | Current Production |
| --- | ---: | ---: |
| Discovered public indexable pages | 100 | 100 |
| URLs in sitemap | 100 | 100 |
| Structurally represented pages | 100% | 100% |
| Correct apex canonical URLs | 100 | 0 |
| Correct canonical-host coverage | 100% | **0%** |
| Missing intended route/language combinations | 0 | 0 |
| Incorrect/private entries | 0 | 0 |
| Duplicate entries | 0 | 0 |
| Redirecting candidate entries | 0 | Not credited while host is wrong |

Included routes cover the homepage, 11 additional marketing/tool pages, resource library, pillar resources, comparisons, guides, and six industry guides in four languages. Excluded routes cover account, admin, API, internal locale rendering, sign-in/sign-out callbacks, and defensive future login/password/member/dashboard paths.

## Mobile Navigation Regression Test

The corrected build was tested at 320, 360, 375, 390, 412, 430, and 768 pixels. At every width:

- hamburger is present and visible;
- menu opens and closes;
- no horizontal viewport overflow was observed;
- logo, language control, and sign-in state are present in the header;
- assessment CTA and account control appear in the drawer;
- Services, Industries, and Resources groups are present;
- the drawer is vertically scrollable when required;
- the unclear standalone green-arrow control is absent.

Logged-out controls were browser-verified. Logged-in member/admin labels and sign-out paths were verified in source and server authorization, but a live role-specific browser session was not modified or impersonated for this audit.

## Public and Private Route Classification

| Route or family | Type | Public | Indexable | Sitemap | Authentication/Authorization | Result |
| --- | --- | ---: | ---: | ---: | --- | --- |
| `/` and 11 marketing/tool routes | Marketing | Yes | Yes | Yes | None | PASS |
| `/resources` and 12 detail routes | GEO resources | Yes | Yes | Yes | None | PASS |
| Four locale variants per public route | Localized public | Yes | Yes | Yes | None | PASS candidate |
| `/localized-content/*` | Internal rewrite | No | No | No | Not a public URL | PASS |
| `/account` | Member | No | No | No | Signed-in user | PASS |
| member tools/results within `/account` | Member personalized | No | No | No | Signed-in user/API | PASS |
| `/admin` | Admin | No | No | No | Server-side admin role | PASS |
| `/admin/users` | Admin | No | No | No | Server-side admin role | PASS |
| `/api/member` | Private API | No | No | No | Signed-in user; live anonymous 401 | PASS |
| `/api/admin` | Admin API | No | No | No | Staff/admin checks; live anonymous 403 | PASS |
| sign-in/sign-out/callback dispatch | Authentication | Public UX only | No | No | Provider flow | PASS candidate |
| `/login`, `/register`, password/member/dashboard families | Defensive/future | Not implemented | No | No | Robots excluded | PASS |

Live anonymous requests redirect `/account`, `/admin`, and `/admin/users` to sign-in. Member data is loaded through authenticated APIs, is absent from public schema/metadata, and has no crawlable personalized URL. Admin pages call server-side identity and role checks; authorization is not based only on browser state.

## Metadata, Structured Data, Robots, and Links

- Candidate automated verification: **936/936 checks passed**.
- All 100 candidate pages returned 200 with correct canonical, five alternates, HTML language, and no preview-host leak.
- Titles, descriptions, localized metadata, Open Graph URL/locale, and resource JSON-LD remain present.
- Organization, WebSite, OfferCatalog, Article, and BreadcrumbList JSON parse successfully in rendered output. Service/WebPage entities remain an existing warning rather than a regression.
- No member profile, company name, score, response, roadmap, or ROI data was found in public metadata or JSON-LD.
- Previous public-link crawl found 133 destinations and no broken target; the current changes only affect metadata and add a test script. Localized resource-link retention remains fixed.
- Live Googlebot, Bingbot, and OAI-SearchBot requests each returned 200 for homepage, service, resource, and industry-guide samples (4/4 per crawler).
- Candidate robots rules allow public pages and explicitly exclude internal, account, admin, API, authentication, password, member, and dashboard route families. There is no `Disallow: /` rule.

## Regressions Found

Critical regressions: **0**  
High regressions: **0**  
Medium regressions: **0**  
Low regressions: **0**

There is one **critical production release blocker**, but it is an unpublished fix rather than a fix that regressed: live canonical infrastructure still uses the legacy host.

### Production release blocker

**Issue:** Live canonical, hreflang, sitemap, robots host, Open Graph, and JSON-LD URLs use the old Sites hostname.  
**Previous state:** Identified in the Phase 1 re-audit and fixed in source.  
**Current state:** Candidate passes; production does not.  
**Cause:** The corrected release has not been published.  
**File/component:** Central `SITE_URL` consumers and current Sites deployment.  
**Fix:** Publish the validated candidate.  
**Verification result:** Candidate PASS; production FAIL.

### Automatically fixed during this verification

1. Added locale-aware metadata and self-canonicals to `/free-account`.
2. Added locale-aware metadata and self-canonicals to `/assessment`.
3. Added `npm run audit:seo` with 936 canonical, hreflang, sitemap, robots, private-isolation, and mobile-navigation source assertions.

## Build and Automated Tests

- Clean production build: **PASS**.
- Marketing, localized, resource, member, admin, and API routes compile: **PASS**.
- `npm run audit:seo -- http://127.0.0.1:8793`: **936/936 PASS**.
- The repository-wide lint command still reports pre-existing link, accessibility, and type-rule failures outside this remediation. The production compiler succeeds; no new build/type failure was introduced by this verification.

Usage:

```text
npm run build
npm run start
npm run audit:seo -- http://127.0.0.1:8793
```

The command can also inspect a deployed URL, but expected production-host assertions will deliberately fail until the corrected release is live.

## Manual Production Verification

**MANUAL PRODUCTION CHECK REQUIRED**

1. Publish the corrected candidate, then repeat all five critical tests against `https://nexavoris.ai`.
2. Confirm Google Search Console selected canonicals and sitemap acceptance.
3. Confirm Bing Webmaster sitemap acceptance and indexing.
4. Confirm managed firewall/bot controls allow verified Googlebot, Bingbot, and OAI-SearchBot.
5. Repair and verify `www.nexavoris.ai` TLS plus a permanent apex redirect.
6. Run PageSpeed Insights and review field Core Web Vitals.
7. Validate public JSON-LD after deployment with a structured-data validator.

## Go / No-Go Decision

## NO-GO

The corrected release candidate is technically stable, but the production site does not yet pass three of the five critical systems because canonical, hreflang, and sitemap URLs still advertise the old hostname. Mobile navigation and private isolation pass. Phase 3 is **not ready** until the corrected build is published and the five critical tests pass on the live domain.

## Operational Summary

NEXAVORIS GEO/SEO REGRESSION CHECK

Production:  
https://nexavoris.ai

Initial Re-Audit Score:  
74/100

Post-Fix Score:  
87/100

Current Verified Score:  
74/100 production (88/100 corrected candidate)

Net Improvement:  
0 in production (+14 in corrected candidate)

STATUS:  
NO-GO

CANONICALS:  
FAIL production / PASS candidate

HREFLANG:  
FAIL production / PASS candidate

SITEMAP:  
FAIL production / PASS candidate

MOBILE NAVIGATION:  
PASS

PRIVATE PAGE ISOLATION:  
PASS

Critical Regressions:  
0 (one critical unpublished-release blocker)

High Regressions:  
0

Issues Automatically Fixed:  
3

Issues Remaining:  
10

Manual Production Checks:  
7

Production Build:  
PASS

Phase 3 Ready:  
NO

Top Remaining Actions:

1. Publish the corrected candidate.
2. Repeat all five critical checks on the live domain.
3. Repair `www` TLS and permanent redirect behavior.
4. Submit and validate the corrected sitemap in Google and Bing.
5. Complete bot-policy, structured-data, and Core Web Vitals production checks.

Report Created:  
`GEO_SEO_REGRESSION_VERIFICATION.md`

Regression Tests Created:  
`npm run audit:seo`

Files Modified:  
`lib/seo.ts`, `app/free-account/page.tsx`, `app/assessment/page.tsx`, `scripts/seo-regression.mjs`, `package.json`, and this report.
