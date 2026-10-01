# Yudaro brand entity sprint — 2026-10-01

Base commit: 59f19ca. Scope: existing pages only; no redesign, new landing routes, migration or redirect edits. This report records local implementation; it does not claim deployment or indexing.

## Before-change audit

| Route | Rendered title | H1 | Existing intent / recommended change |
|---|---|---|---|
| `/` | AI + ERP Systems \| Private AI & Odoo ERP | AI + ERP systems. Built around your business. | Company / integrated services → explicit Yudaro definition |
| `/ai-solutions` | Private AI for Business: Implementation & Knowledge Search \| Yudaro | Private AI for Business: Implementation & Knowledge Search | Private AI → Yudaro AI service ownership |
| `/erp-solutions` | Odoo ERP Implementation & Consulting \| Yudaro | Odoo ERP Implementation & Consulting | ERP implementation → Yudaro ERP services |
| `/ai-erp` | AI ERP Systems & Integration for Business \| Yudaro | AI ERP: connect intelligence with business operations. | AI + ERP integration → Yudaro AI ERP service ownership |
| `/about` | About Yudaro AI & ERP Systems \| Yudaro | Technology should fit the business. Not the other way around. | Company trust → first-paragraph entity confirmation |

The homepage title is recorded from the actual server/browser output: the root page did not inherit the layout suffix. Service pages did inherit it. The implementation continues to use lib/seo.ts and the existing Next.js metadata exports; branded complete titles use title.absolute to avoid a repeated suffix.

## Page ownership and supporting classification

- Company/entity: /; confirmation and trust: /about.
- Yudaro AI: /ai-solutions; Yudaro ERP: /erp-solutions; Yudaro AI ERP: /ai-erp.
- Industry: /industries, distribution, manufacturing, retail, construction, HVAC/field service, professional services, restaurants, and the corresponding resource guides. Keep their industry intent.
- Resources/guides: Private AI, Odoo, AI ERP architecture, migration, implementation planning, security and automation. Existing related-service links retained; selected body links added below.
- Comparisons: /resources/comparisons; existing service links retained.
- Location: /locations/houston; retains Houston consulting metadata, local coverage and Stafford contact details.
- Case studies/demo: /case-studies, /how-yudaro-works; existing demonstration/illustrative positioning retained.
- Pricing/cost: /pricing, /equipment and /resources/odoo-implementation-planning; no price changes.
- Trust/company: /about, /trust, /contact, /privacy, /terms and methodology pages; no invented credentials or results.

## Titles after implementation

| Route | New HTML title |
|---|---|
| / | Yudaro AI + ERP \| Private AI & Odoo ERP Implementation |
| /ai-solutions | Yudaro AI \| Private AI for Business & Company Knowledge |
| /erp-solutions | Yudaro ERP \| Odoo ERP Implementation & Consulting |
| /ai-erp | Yudaro AI ERP \| AI + Odoo ERP Integration |
| /about | About Yudaro: AI + ERP Implementation Company \| Yudaro |

The old titles appear in the audit table above. Descriptions use the requested company/service definitions and are server-rendered, with matching Open Graph/Twitter metadata.

## H1 and introductory copy

- **/**: H1 becomes “Yudaro AI + ERP Systems” using the existing three lines and emphasis span. The existing eyebrow becomes “Built around your business.” Intro defines Yudaro as an AI + ERP implementation company providing Private AI, Odoo ERP implementation, AI + ERP integration, and business automation for growing companies. The existing introductory section becomes “What is Yudaro?”; existing AI, ERP and integration sections explain the three service phrases. No new section or cards.
- **/ai-solutions**: H1 becomes “Yudaro AI: Private AI for Business & Company Knowledge”. The longer variant preserves the previous hero line count. Original breadcrumb label retained.
- **/erp-solutions**: H1 becomes “Yudaro ERP: Odoo Implementation & Consulting”. Avoids repeating ERP inside the heading and preserves its line count. Original breadcrumb label retained.
- **/ai-erp**: H1 becomes “Yudaro AI ERP: Connecting Intelligence with Operations”. Intro: “Yudaro AI ERP connects Private AI with Odoo ERP, business data, permissions, and operational workflows. Human approval, scoped access, and audit controls keep write actions accountable to your team.” Detailed read/write, approval, permission and system-of-record explanations retained.
- **/about**: H1 unchanged. Intro: “Yudaro is an AI + ERP implementation company based in the Houston area. We provide Private AI, Odoo ERP implementation, AI + ERP integration, and business automation for growing businesses. We connect company knowledge with daily operations.” Location is supported by the existing Stafford address and Houston service page.
- **/ai-solutions**: Yudaro AI is Yudaro's private business AI service grounded in approved company documents, SOPs, operational knowledge, permissions, and business data. Deploy on dedicated customer hardware or controlled infrastructure to fit your requirements.
- **/erp-solutions**: Yudaro ERP helps growing businesses connect sales, inventory, purchasing, operations, and business data through ERP implementation and consulting, including Odoo, tailored to your business workflows.

## Structured data

- Updated the one existing Organization/ProfessionalService node, preserving https://yudaro.com/#organization, address, telephone, logo, service area and catalog.
- Organization name is now Yudaro; removed the alternateName field. Added the LinkedIn URL supplied in the task. No new company facts or claimed credentials.
- Existing catalog service names now distinguish Yudaro AI, Yudaro ERP and Yudaro AI ERP, keeping their canonical service URLs and IDs.
- Existing WebSite keeps name Yudaro, ID https://yudaro.com/#website and publisher reference to the organization.
- Existing WebPage IDs, canonical URLs, isPartOf and about references are retained. Updated core page names/descriptions through the same PageSchema component. No additional Organization, WebSite or FAQ graph was created.

## Contextual links

Homepage: added Yudaro ERP → /erp-solutions within the existing ERP paragraph; renamed the existing AI text link to “Explore Yudaro AI”. Other CTA labels and targets remain unchanged.

| Supporting page | Body anchor | Target |
|---|---|---|
| `/solutions/odoo-migration` | Odoo migration | `/erp-solutions` |
| `/solutions/ai-knowledge-base` | AI knowledge base | `/ai-solutions` |
| `/locations/houston` | Odoo ERP implementation | `/erp-solutions` |
| `/locations/houston` | Private AI for business | `/ai-solutions` |
| `/locations/houston` | AI + ERP integration | `/ai-erp` |
| `/industries/distribution` | Odoo | `/erp-solutions` |
| `/industries/manufacturing` | Odoo | `/erp-solutions` |
| `/industries/retail` | Odoo | `/erp-solutions` |
| `/industries/construction` | Odoo | `/erp-solutions` |
| `/resources/odoo-implementation-planning` | ERP Core | `/erp-solutions` |

The existing content renderer now supports explicitly specified text links within its existing paragraph; it does not auto-link keywords globally. All other body copy and related-link sections remain in place except the small Houston paragraph update.

## Canonical, sitemap and robots

The preferred host remains https://yudaro.com. Core pages self-canonicalize. Next.js serializes the root canonical without a slash; it resolves to the same root URL. No host/slug change is needed.

The existing indexableRoutes registry already contains all five core pages. Sitemap generation is reused. Dates for pages actually changed in this sprint are 2026-10-01; unchanged pages retain existing dates. No deployment-time dates, duplicate URLs or query URLs added. Robots restrictions for account/admin/API/auth stay intact. Translation noindex policy remains unchanged.

## Files changed

- app/about/page.tsx
- app/ai-erp/page.tsx
- app/ai-solutions/page.tsx
- app/erp-solutions/page.tsx
- app/layout.tsx
- app/page.tsx
- app/sitemap.ts
- components/search-content.tsx
- lib/search-content.json
- lib/search-content.ts
- lib/seo.ts
- scripts/brand-entity-check.mjs — repeatable server HTML/entity/link/sitemap/robots regression check.
- docs/BRAND-ENTITY-SPRINT.md — this audit and delivery report.

## Verification

Validated against the final production build served with Next.js on localhost:3197.

| Check | Result |
|---|---|
| npm run build | PASS; production compilation, TypeScript, static generation and tracing completed, exit 0 |
| npm run typecheck | PASS |
| npm run lint | FAIL: 101 existing diagnostics; none introduced in changed source. Eight diagnostics in the edited AI ERP file point to identical pre-existing anchor elements; all remaining diagnostics are in unmodified files. |
| node scripts/brand-entity-check.mjs | PASS: all 13 changed routes return 200; expected server-rendered title/description, indexability, canonical, single H1, one Organization and one WebSite, valid WebPage relationships and contextual anchors |
| Sitemap and robots | PASS: core/modified routes included, unique canonical URLs without query parameters, actual 2026-10-01 editorial dates, unchanged crawler restrictions |
| Desktop/mobile before-after | PASS: five core pages at 390px and 1440px; hero, H1 height and first CTA position match the original exactly; no document overflow |
| Narrow mobile/tablet | PASS: all 13 routes at 360px and 768px (26 route/viewport checks), no document overflow or JavaScript page errors |
| Mobile interactions | PASS: menu opens, Escape closes it; Houston contextual AI ERP link navigates to the correct service page |
| Protected files | PASS: no changes to next.config.ts, proxy.ts, robots.ts, CSS, desktop/mobile navigation or motion components |
| git diff --check | PASS |

Screenshots and detailed logs are saved locally in output/brand-sprint (git-ignored). The repeatable server audit lives at scripts/brand-entity-check.mjs.

All five core pages retain their section counts. At 1440px every measured section retains its height. At 390px, only the homepage's shorter “What is Yudaro?” block (73.44px shorter) and Private AI copy block (28.80px shorter) reduce height naturally; no CSS spacing or component dimensions were changed, and there is no section-height increase. Other core-page section heights match. The existing long AI breadcrumb clips on narrow screens in both baseline and final screenshots; its label and behavior were deliberately retained under the no-navigation-change constraint.

## Intentionally unchanged

No redesign was performed. No existing interaction behavior, CSS, component layout, navigation, responsive rules, animations, form behavior, assets, URL slugs or migration logic was changed. No duplicate landing pages were created. Only contextual links add the requested navigation opportunities in existing copy.

Existing unrelated lint issues are outside this sprint. Existing FAQ markup and secondary page metadata are retained. No Search Console submission, deployment, or ranking claim is included.
