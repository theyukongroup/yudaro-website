# Google Search Console and local business setup

No Google account access was available. No property, sitemap submission, URL indexing or Business Profile verification is claimed.

1. In Search Console, add the Domain property `yudaro.com`. Copy Google's exact DNS TXT record into the domain's DNS console, then verify. This covers HTTP/HTTPS and subdomains. Do not expose account credentials in source control.
2. Alternative: verify the URL-prefix property `https://yudaro.com/`. Set `GOOGLE_SITE_VERIFICATION` to the supplied content token in Vercel Production, redeploy, inspect the rendered meta tag, then verify. The code supports this; no fabricated token is configured.
3. Submit `https://yudaro.com/sitemap.xml`. It lists 52 English canonical URLs after the second pass. Inspect home, private AI, ERP, AI+ERP, Houston and a new industry page. Check live render, robots, selected canonical and Google-selected canonical.
4. Request indexing for a small set of key new/changed pages after inspection. Submission is not indexing or a ranking guarantee. Review Pages exclusions; translated noindex and private/account exclusions are intentional.
5. Monitor search performance by query, page, device and country. Separate branded/nonbranded; record impressions, clicks, CTR and qualified consultation outcomes. Compare equal periods and annotate deployment date. Review Core Web Vitals field data when sufficient traffic exists; Lighthouse lab scores are not field INP.
6. Check HTTPS, manual actions, security reports and rich-result/structured-data reports. General commercial FAQs are not a promise of Google FAQ rich results. Service schema is descriptive, not guaranteed rich-result eligibility.
7. Verify or claim the actual Google Business Profile. Confirm business name, 13366 Murphy Road, Stafford TX 77477, +1 281-258-8000, info@yudaro.com, hours, visitor/appointment eligibility and service area. Use only categories actually offered; do not create duplicate city offices. Follow Google's actual eligibility requirements and owner evidence.
8. Add genuine photos and services, keep NAP consistent with the site, and request honest customer reviews without incentives or selective screening. Link only verified owned profiles in sameAs.

## Optional analytics configuration

Set a valid `NEXT_PUBLIC_GA_MEASUREMENT_ID=G-...` in the deployment environment and rebuild. The optional GA component loads only after explicit analytics consent, respects DNT/GPC, excludes advertising signals and query strings, and provides a footer consent preference. Do not send contact fields, assessment answers or credentials. Test consent and DebugView before relying on reporting. No analytics ID was supplied, so optional GA remains inactive.

Custom events prepared: consultation click, phone click, email click, pricing/case-study view and successful contact submission, plus supported assessment start/completion events bridged from existing first-party events. Inspect `lib/search-analytics.ts` for the exact allowlist. Existing operational event storage is separate and is described in privacy content. Confirm retention/consent wording with the business owner.

Source: [Google AI search features](https://developers.google.com/search/docs/appearance/ai-features), [canonical consolidation](https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls), [robots directives](https://developers.google.com/search/docs/crawling-indexing/robots-meta-tag).
