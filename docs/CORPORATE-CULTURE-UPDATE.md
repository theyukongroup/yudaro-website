# Yudaro Corporate Culture Intelligence update

Date: September 26, 2026

## Messaging

“Turn your company’s experience, values, and way of solving problems into intelligence every employee can use.”

Corporate Culture Intelligence is central to Private AI + ERP Business Transformation. The cycle is Ask → Answer → Review → Approve → Improve → Share. Employee feedback is eligible input for review, not automatic training on every conversation. Administrators control eligible knowledge, roles control access, approved sources ground guidance, and leadership can update or retire knowledge as culture evolves.

## Website changes

- Global desktop Solutions and mobile Services navigation: added Corporate Culture Intelligence.
- Homepage: prominent feature after Private AI, permission-controlled hub, one-click service link and revised search/share description.
- /corporate-culture-intelligence: requested hero and CTAs; institutional-knowledge problem; company-aligned solution; six-stage governed cycle; six department questions; implementation scope and governance; outcomes; FAQs; Private AI, knowledge management, ERP and contact links; Service structured data, canonical, Open Graph and sitemap inclusion.
- Private AI: governed culture knowledge section and internal link.
- ERP: role-appropriate policy guidance alongside ERP context; transaction authorization remains separate.
- Knowledge management: approved practices, onboarding and reviewed corrections.
- Solutions summary: capability/purpose/human-checkpoint comparison table.
- Six industry pages: specific operational examples for distribution, manufacturing, retail, construction, HVAC and professional services.
- Restaurant and AI + ERP pages: integrated culture guidance and service link.
- Private AI, AI + ERP and comparison guides: implementation context/link; comparison table distinguishes document search from governed cultural guidance.
- CSS: responsive native diagrams and a subtle finite opacity animation; respects system reduced motion and the site pause control; no new client JavaScript dependency.

### Routes with substantive content changes

- /
- /corporate-culture-intelligence
- /ai-solutions
- /erp-solutions
- /solutions/ai-knowledge-base
- /industries/distribution
- /industries/manufacturing
- /industries/retail
- /industries/construction
- /industries/hvac-field-service
- /industries/professional-services
- /solutions
- /resources/ai-erp
- /ai-erp
- /industries/restaurants
- /resources/private-ai
- /resources/comparisons

The global navigation change appears across the site. Sitemap now contains 53 indexable routes. Public PDF aliases are listed in the source README.

## Catalog pages changed (final 48-page numbering)

| Page | Change |
|---|---|
| 1 | Central experience/values message on the existing cover |
| 2 | Company overview and 13-entry clickable contents |
| 4 | Private AI, approved knowledge and culture guidance |
| 5 | Capability summary and new-page reference |
| 7 | Onboarding/training guidance and reviewed feedback |
| 10 | New executive value page with six department contributors and approval-controlled intelligence hub |
| 11 | New governed cycle, six department questions and Built on Trust sidebar |
| 18 | Private AI + ERP context and transaction authorization |
| 19 | Institutional knowledge and decisions benefits |
| 20 | Revised industry page ranges |
| 39 | Restaurant POS cross-reference now pages 16–17 |
| 46 | Company overview positioning |
| 47 | Capability / business value / human checkpoint matrix |
| 48 | Corporate AI Assessment call to action and contact hotspot |

All 48 page counters, relevant link destinations and bookmarks were updated. The two prior POS pages remain, now pages 16–17. Unedited artwork and existing pricing are retained.

## Brochure pages changed

1. New corporate-culture cover message, primary message and three benefits; existing team imagery retained.
2. Approved knowledge hub, compact six-step process, governance/trust statement, implementation scope and evolving culture.
3. Distribution, field service and restaurant examples connect operating practices with Private AI/ERP; existing industry imagery retained.
4. New corporate-intelligence CTA, existing engagement illustrations, 48-page catalog panel, versioned QR and consultation destination.

## Validation

- Final Next.js production build: passed. TypeScript: passed.
- Existing regression suites: 36/36 (8 restaurant, 16 SQL, 12 IndexNow).
- Local SEO audit: 1,167/1,167 across 53 indexable routes.
- Final browser validation: 36 recorded checks, no failures; desktop 1440px, tablet 768px, mobile 390px.
- Navigation, one-click homepage link, cycle anchor, consultation destination, no-JavaScript core content, reduced motion and site motion pause: passed.
- After loading lazy images: no broken images, page errors or horizontal overflow on the homepage and new service page.
- Observed layout shift: 0 on the new service page; below 0.002 on the homepage in these local runs. These are lab observations, not field performance guarantees.
- Existing assessment starts and contact success UI: passed with intercepted test requests; no real contact submission sent.
- Full lint: 105 pre-existing issues remain. New Corporate Culture Intelligence files introduce no lint diagnostics. This is not a clean repository-wide lint result.
- PDFs: 48 and 4 pages, US Letter dimensions, internal destinations and catalog contents validated. All pages rendered through Poppler; contact sheets reviewed and all substantive edits inspected at page scale. No clipping/overlap observed in changed content.
- Brochure QR decoded from rendered PDF and matches the versioned 48-page catalog URL. Live URL verification is recorded separately.

## Scope and unresolved items

- The original fully editable catalog layout source was unavailable. Delivery includes a reproducible PDF-backed edit recipe, original 46-page baseline, vector source for the two new pages, source text and assets. The brochure has a complete editable Python generator.
- Governance, role permissions, audit history, source citations, versions and expiry are presented as scoped implementation controls. No new operational AI application or automatic training feature has been built or claimed.
- For each customer implementation, management must choose knowledge owners, approved values/policies, sensitive exclusions, retention/expiry rules, access roles and acceptance criteria. No additional marketing-content approval is required to complete the authorized update.
- No new legal-compliance, accuracy, confidentiality or measured ROI guarantees have been introduced.
- Screen PDFs preserve the existing page dimensions and RGB presentation. Press-specific bleed/CMYK preparation is outside this update.
- Git changes are left available for the existing manual synchronization workflow; no commit or push has been made.

## Deliverables

- output/pdf/Yudaro_Catalog_2026_Corporate_Culture_48_Pages.pdf
- output/pdf/Yudaro_Brochure_2026_Corporate_Culture_4_Pages.pdf
- marketing/source: builders, base PDFs, shared copy, required imagery, requirements and rebuild instructions.
- output/Yudaro_Corporate_Culture_Updated_Sources.zip: updated website files and marketing sources.
- output/Yudaro_Corporate_Culture_Previews.zip: all 52 marketing pages and website screenshots.
- output/culture-previews/index.html: local preview gallery.
- output/culture-browser-results.json and output/culture-pdf-validation.json: machine-readable evidence.

## Production verification

Published successfully to https://yudaro.com/corporate-culture-intelligence . Vercel deployment: dpl_BayoXidjoUYFR5GTs1KWLdqqR8sX (READY).

Live SEO audit: 1,167/1,167 checks passed across 53 indexable routes. Both current and versioned catalog URLs return HTTP 200, application/pdf, 48 pages; both brochure URLs return HTTP 200, application/pdf, 4 pages. Downloaded bytes match the visually inspected local files by SHA-256. The brochure QR therefore opens the verified 48-page edition.

IndexNow accepted the 17 materially changed URLs with HTTP 200. This confirms receipt, not guaranteed indexing or ranking.
