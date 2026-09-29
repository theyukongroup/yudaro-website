# Yudaro POS / ERP release — September 29, 2026

Status: Published to https://yudaro.com. Current website, public PDFs, promotion image and all three presentations use separate POS, ERP and Private AI offers. Final PDFs: 48-page catalog, four-page brochure and one-page restaurant flyer. The 48-page count preserves the previously approved Corporate Culture Intelligence additions.

## A. Files modified
- Website: app/contact/page.tsx; app/pricing/page.tsx; app/industries/restaurants/page.tsx; app/erp-solutions/page.tsx; components/contact-content.tsx; components/restaurant-offer.tsx; components/restaurant-offer.module.css; lib/search-content.json; new lib/restaurant-offer.json; next.config.ts.
- Marketing sources: marketing/restaurant-release/build_materials.py, update-decks.mjs, reproducible PDF bases, original decks, inspection IDs and validation receipts. Prior recipes are preserved in marketing/archive/2026-09-26; the two legacy build entry points now run the current builder.
- Public downloads: all eight catalog/brochure PDF filenames under public/catalog now contain the corrected editions. Two older catalog URLs redirect to the current catalog. public/promotions/restaurant-pos-package.webp was replaced; restaurant-pos-hardware.png is the clearly labelled illustrative equipment image.
- Shared Marketing Materials: current catalog/brochure editions, the original Screen and Visual filenames, Corporate Culture editions, QR-updated brochure and both Restaurant POS promotion PNGs were updated. Prior versions were backed up to _Archive/2026-09-29-before-POS-ERP-update.
- Shared Proposals & Contracts: all three original presentation filenames now contain the final updated decks, with original versions backed up to the same dated archive convention.

## B. Website pages modified
/pricing — three-level ladder, standalone POS price and exclusion, separate Restaurant ERP section, named recurring services and FAQ.
/industries/restaurants — product ladder, POS and ERP sections, separately scoped demonstrations and FAQ.
/erp-solutions — separately priced Restaurant ERP implementation and support.
/solutions — clear restaurant POS / ERP distinction and pricing.
/resources/faqs — exact POS-only, ERP and recurring-fee explanations, optional purchase and customization questions.
/contact — distinct Restaurant POS / Restaurant ERP selections, preselected from the matching CTA.

## C. Catalog pages modified
9: ERP/Private AI demonstration scope clarified.
16: rebuilt POS hardware, setup, price, recurring service and prominent ERP exclusion.
17: new three-column POS / ERP / Private AI comparison.
39: optional ERP cross-reference and separate pricing.
40: custom Private AI scope clarified.
41: rebuilt Restaurant ERP implementation, recurring support, back-office scope and exclusions.
42: configured demo explicitly separated from the $899 package.
47: $300 service renamed ERP Management, Maintenance & Support, up to five users.
Pages 10–11 and other Corporate Culture Intelligence material were preserved.

## D. Brochure / flyer pages modified
Brochure page 3: quick POS promotion, hardware, $29.99 POS-only service, bold optional ERP offer.
Brochure page 4: industry examples, next steps and new versioned catalog QR destination. Existing industry messages were retained in a compact layout.
Standalone flyer: one page with the same separation and two distinct CTAs.
QR decoded successfully to https://yudaro.com/catalog/yudaro-catalog-2026-pos-erp.pdf. Live download returns 48 pages and is byte-identical to the final local catalog. Previous online QR/catalog destinations also resolve to the corrected 48-page edition.

## E. PowerPoint files modified
- Restaurant_Owner_POS_Odoo_ERP_Sales_Engineer_Presentation.pptx: 17 slides. New ladder at slide 2; POS slide 6, ERP slide 8, comparison slide 13 and optional upgrade path slide 14. Related wording and closing choices corrected throughout.
- Restaurant_POS_Odoo_ERP_Negotiation_Playbook.pptx: 19 slides. New ladder at slide 2; POS slide 11, ERP slide 12, comparison slide 15 and optional upgrade path slide 17. Old restaurant ERP price, combined investment frame and assumed joint purchase removed.
- Yudaro_Official_Launch_Presentation_to_Andy.pptx: 26 slides. Ladder slide 6, POS slide 7, comparison slide 8, new ERP slide 9 and optional upgrade path slide 19. Sales script, offer approval and closing message corrected. Inherited heading/body collisions were repaired.
Core product diagrams and text remain editable. Original slide dimensions and source fonts are retained. Historical mistakes on Andy’s risk-control slide are explicitly labelled as mistakes, alongside corrections; they are not current offers.

## F. Pricing references
Restaurant POS: $899 + tax one-time; $29.99 per user per month for POS Support & Platform Service only.
Restaurant ERP: $5,000 one-time implementation; $300/month for ERP Management, Maintenance & Support, up to five users.
Private AI + Automation: custom pricing / separate scope.
The prior $7,500 restaurant ERP implementation and $8,399 combined investment figures were removed from the sales decks. The unrelated general Private Enterprise AI $7,500 plan remains unchanged.

## G. Old terminology replaced
“Back Office ERP Included”; combined POS/software/back-office claims; “Odoo Restaurant POS” in the $899 sales context; undifferentiated restaurant maintenance/support; a bundled POS-and-ERP purchase assumption; the older restaurant ERP price.

## H. New terminology
Yudaro Restaurant POS Platform; POS Support & Platform Service; Restaurant ERP Implementation; ERP Management, Maintenance & Support; optional separate purchase; according to agreed implementation scope; additional customization may be quoted separately.
Recurring message: POS runs the checkout counter. ERP runs the business.

## I. Verification and manual items
- Local and Vercel production builds passed.
- Existing tests: 8 restaurant diagnostic + 16 SQL + 12 IndexNow = 36 passed.
- Production SEO: 1,167 / 1,167 checks passed across 53 indexable routes.
- Live responsive checks passed at 390, 768 and 1440 pixels: no horizontal overflow, broken images or browser exceptions on the updated pricing, restaurant and ERP pages. FAQs work. POS and ERP CTAs preselect and submit the correct interest; submissions were mocked and no test leads were sent.
- Six tested live PDF URLs match the final files byte-for-byte; old catalog links resolve to the 48-page release. Corrected promotion artwork also matches production.
- All PDF pages and all 62 presentation slides were rendered. Updated layouts and deck/page overviews were visually reviewed. All three presentation files pass package, declared layout, source-font and re-import validation with zero findings.
- Shared copies of the three PDFs and three PPTX files match local final SHA-256 hashes.
- Lint still reports 101 pre-existing issues outside the edited files; no new lint errors remain. Four existing internal-link issues on the edited pricing page were also corrected.
- IndexNow accepted the six materially changed URLs with HTTP 200. Acceptance does not guarantee indexing.
- One housekeeping item remains: Windows still locks the obsolete shared Yudaro_Catalog_2026_46_Pages.pdf, even after the requested close/retry, so it could not be moved into the archive. Use the new 48-page release. No current web download or brochure QR serves that old file. Move it into the dated archive when its remaining handle is released.
- Hardware artwork and operational examples are illustrative; implementation and integration follow the agreed scope. No unlimited customization or guaranteed savings is promised.

## J. Required confirmation
“$899 + $29.99/user/month = Restaurant POS only” (tax applies to the one-time POS package).
“$5,000 + $300/month up to 5 users = Separate Restaurant ERP implementation and support”.

Published deployment: dpl_BgwEVezk6b7XWsm3wfktreK4Ao2Y; production alias https://yudaro.com.
