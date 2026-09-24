# Yudaro SEO / GEO second-pass report

September 24, 2026. This is a targeted second pass, not a repeat of the initial expansion. Read INDEXING-DIAGNOSTIC.md for raw production eligibility findings. No search-engine indexing, ranking, AI citation or lead improvement is claimed.

## 1–6. First-pass problems, indexing, crawl, sitemap, robots and canonical findings

No P0 crawl blocker was observed in 162 sampled initial requests using desktop, Googlebot and bingbot User-Agent strings. Pages contained initial server-rendered content and returned no detected bot challenge, 403, 429 or 5xx. Vercel headers were observed; no Cloudflare challenge headers were observed. This is one network vantage point, not a real Google/Bing crawler-IP test. Verified account inspection and host logs remain essential.

The sitemap correctly contained 50 canonical English URLs before this pass. The second pass adds only two architecture routes for 52 total, with no query/locale/private/test URLs. Robots references the apex sitemap. Incomplete translations intentionally remain noindex. HTTPS www redirects in one permanent hop; HTTP www takes two permanent hops because HTTPS normalization precedes the canonical-host redirect. No redirect loop was found. Canonical apex remains https://yudaro.com.

Median initial TTFB was 149 ms desktop, 140 ms Googlebot UA and 142 ms bingbot UA. Results are sampled, not continuous monitoring or proof of actual indexing. Public HTML remains dynamic because of locale/session behavior; shared caching was not applied to personalized output.

## 7. Schema findings and fixes

First-pass organization catalog entries described anonymous Service objects instead of linking to the actual service identities. Added stable service @id/URL/provider references. Added WebPage/Article relationships on legacy resources and main-entity relationships on new templates. The AI ERP service now has a WebPage node alongside its existing Service. Consistent organization name, Stafford address and website publisher are checked by the quality gate. Local service areas now match visible Houston metro coverage. No invented profiles, ratings, affiliations or video entities.

## 8–10. Content quality, cannibalization and AI-answer weaknesses

Service, guide and architecture intent are now separated: /ai-erp sells implementation; /resources/ai-erp explains and evaluates AI ERP; /resources/architecture/private-ai-odoo describes component contracts and failure tests. The existing resource URL was expanded into the flagship rather than creating a competing /guides/ai-erp URL. Body overlap was measured as a review signal, not proof of ranking cannibalization. Actual competing queries require Search Console evidence.

The guide now includes direct answers, traditional-versus-AI ERP comparisons, natural-language queries, read-only/write-enabled distinctions, RAG versus live transactional retrieval, access boundaries, approvals, audit trails, function-specific examples and acceptance tests. Technical version/plan statements link to official Odoo sources. Architecture is explicitly a reference design, not a claimed customer deployment. No generic comparison batch or invented implementation command sequence was published.

## 11–12. Entity and local authority limits

Organization authorship was honest but provided no verified practitioner/reviewer infrastructure. Both article templates now support real authorId/reviewerId records, public profile links, publication and substantive modification dates. Person markup appears only for verified configured people; the registry is empty until business evidence is supplied. Reviewer belongs to WebPage. No fake name or qualification was added.

Stafford remains the actual published office context; Houston, Sugar Land, Missouri City, Katy and Texas are service coverage, not invented branches. The Houston page now explains discovery preparation and meeting confirmation. NAP, hours, visitor policy, legal identity and external profiles still require owner verification.

## 13–18. Implemented changes and URL decisions

Improved core AI ERP service and guide, case-study evaluation content, Houston discovery content, article templates, entity graph and contextual links. Added original semantic diagrams for read and approval-controlled write paths; text, diagrams and tables work without JavaScript. /case-studies clearly states no approved client study is published and points to inspectable reference content. Evidence-gated case-study and technical-article templates are in docs/templates, outside public routes.

No pages merged. No pages removed. No new content noindex directives except the technical IndexNow proof file; existing translation/private exclusions are preserved. Only new public pages:

- /resources/architecture
- /resources/architecture/private-ai-odoo

Added reciprocal contextual links among AI ERP service, guide, architecture, private AI, Odoo, automation and evidence standards. INTERNAL-LINK-GRAPH.md distinguishes sitewide links from main-content referrals and flags weak contextual discovery. No indexable orphan detected by the gate. Generic CTA repetition is not mistaken for topical authority.

## 19. IndexNow and release infrastructure

Implemented production ownership proof, dry-run-first notifier, URL validation, material-change hashes, verified deletion checks, exclusive run lock, persistent checkpoint, success-only state advancement and receipt recording, plus a snapshot-matched material-change review that excludes minor credit/link edits. Baseline was captured before this publication; unchanged pages are not blindly submitted on each deployment. Ownership value was placed in Vercel Production without printing or committing it. INDEXNOW.md explains public proof versus account secrets, release operation and persistent-state requirements. Final notification status is appended below.

Added a GitHub Actions rendered SEO gate for pull requests/main: dependency installation, existing suites, IndexNow tests, build, TypeScript and local production SEO audit. It does not deploy or notify from untrusted PRs. Workflow is configured locally; no remote GitHub run is claimed. Changes remain uncommitted for the owner’s manual synchronization.

## 20. Performance and validation

Diagrams are semantic server-rendered HTML/CSS with no added animation/runtime library. Footer links now disable speculative prefetch while remaining normal crawlable links. Existing optimized images/fonts and reduced-motion behavior are preserved. Avoided wholesale stylesheet removal or public caching changes that could break brand/session behavior. Lighthouse still identifies legacy CSS/JavaScript/image opportunities; no claim that all mobile Core Web Vitals pass.

| Page | Mode | Performance | Accessibility | SEO | LCP ms | CLS | TBT ms |
|---|---|---:|---:|---:|---:|---:|---:|
| / | mobile | 81 | 100 | 100 | 5106 | 0.0000 | 12 |
| /ai-erp | mobile | 92 | 100 | 100 | 3310 | 0.0120 | 11 |
| /resources/ai-erp | mobile | 92 | 100 | 100 | 3230 | 0.0262 | 10 |
| /resources/architecture/private-ai-odoo | mobile | 92 | 100 | 100 | 3232 | 0.0010 | 11 |
| / | desktop | 99 | 100 | 100 | 989 | 0.0002 | 0 |
| /ai-erp | desktop | 100 | 100 | 100 | 695 | 0.0073 | 0 |
| /resources/ai-erp | desktop | 100 | 100 | 100 | 673 | 0.0093 | 0 |
| /resources/architecture/private-ai-odoo | desktop | 100 | 100 | 100 | 673 | 0.0052 | 0 |

Local production build with simulated mobile throttling; results are not field INP or a live traffic improvement claim. The final diagram alignment adjustment is CSS-only. Field LCP/INP/CLS require enough real-user data. Browser testing covers mobile/desktop layouts, hydration, no-JavaScript guide/diagrams and existing protected/conversion flows. Contact success uses an intercepted local request, not an actual customer message or backend delivery test.

## 21–25. Human/account actions and off-site authority

Search Console: verify ownership, submit canonical sitemap, inspect new/changed pages, compare chosen canonicals and exclusion reasons, inspect verified crawl logs and field vitals. Bing: verify property, inspect sitemap/crawl, confirm IndexNow receipt/processing and use available AI performance data. Google Business Profile/Bing Places: verify eligibility, real NAP, categories, service area, hours and appointment policy. No external property or listing verification is claimed complete.

Business: provide approved people/profiles, customer permissions, measured baselines/results, real screenshots, deployment versions and reviewer sign-off. LOCAL-SEO-ACTIONS.md and OFFSITE-AUTHORITY-ROADMAP.md prioritize verified profiles, useful demos, legitimate organizations, documented ecosystem participation and tested open-source tools. LINKABLE-ASSETS.md rejects arbitrary calculators and identifies the evidence needed for useful cost/hardware/ROI tools. No purchased links or fabricated authority.

## Executed tests

Production build and TypeScript passed. Expanded local SEO gate: 1,147/1,147 checks across 52 URLs. Existing restaurant tests: 8/8; SQL tests: 16/16; new IndexNow selection/review tests: 12/12. Focused second-pass lint passed; full lint retains 105 pre-existing errors with no new diagnostic signatures in the comparison. New-page browser tests: ten page/viewport combinations without runtime errors or horizontal overflow, plus server/no-JavaScript diagram check. Existing seven flow checks passed.

Raw evidence: second-pass-crawl.json, second-pass-local-qa.json, second-pass-browser.json, second-lighthouse-summary.json, second-pass-lint.json, internal-link-graph.json. Final production verification is appended after publication.

## Final production and notification results

Deployment `dpl_J6bQJG33p9GisWiD53P6iQbKyZYL` reached READY; Vercel build and TypeScript passed. Live production SEO gate: **1,147/1,147 checks across 52 URLs**. Post-deployment desktop/Googlebot/bingbot UA repetition: 168 requests plus three redirect-chain tests, no detected challenge, 403, 429 or 5xx. Ten live page/viewport browser checks passed with no runtime errors or overflow; guide and both diagrams remain available with JavaScript disabled.

IndexNow: the reviewed release classified 2 new and 5 materially updated URLs for notification, excluding 20 minor byline/related-link changes. Endpoint returned **HTTP 202**: received, with key verification potentially pending. This is not indexing confirmation. Receipt contains only public URLs/reasons, not the ownership value. A subsequent dry run returned empty created/updated/deleted sets, verifying the checkpoint prevents repeat submissions. Proof endpoint returned HTTP 200 and X-Robots-Tag noindex.

Website changes are live. Release/CI scripts and all reports are in the local uncommitted codebase for manual synchronization. The latest notifier includes the material-review safeguard; future releases use the workflow in INDEXNOW.md. No remote GitHub CI run, webmaster ownership, Google/Bing indexing, ranking lift, AI citations or customer results are claimed.
