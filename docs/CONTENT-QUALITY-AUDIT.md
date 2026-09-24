# Second-pass content quality audit

Reviewed the first-pass registry and rendered site, including original pre-change source in Git. Text overlap is a triage signal only; shared operational terms are not evidence of duplicate intent.

## Findings and decisions

- AI ERP service already covered definitions, use cases and approvals, but lacked a concrete write-execution diagram and proposal acceptance boundaries. Expanded it without replacing the brand design.
- `/resources/ai-erp` already owned the educational intent. Reworked it into the flagship reference rather than adding `/guides/ai-erp` and splitting links between equivalent pages. Service owns implementation purchasing; resource owns explanation/evaluation; architecture owns component contracts and failure tests.
- New service pages are distinct by migration, integration, customization and knowledge retrieval. No keyword stuffing found in sampled content; shared CTAs and implementation language are appropriate but should not become a substitute for evidence.
- Industry pages use distinct workflows but still lack first-hand case evidence. Retain as service-fit pages; do not invent customer stories to make them seem authoritative.
- Legacy industry resource pages and new commercial industry pages have adjacent intent. Keep educational questions distinct from implementation scope and link between them. Do not merge without query/conversion evidence; check Search Console for competing URLs on the same query.
- Odoo implementation planning and generic buyer guides overlap broadly. Preserve their different scope; next edits should replace generalities with approved estimates, versioned scope examples and actual acceptance artifacts.
- `/case-studies` had evidence standards but little buyer utility. Added an evaluation table and links to inspectable reference material. It still explicitly states no approved customer case study is published.
- Many first-pass pages use organization authorship and same-day modification dates. Genuine person/reviewer fields are now supported on both article templates; existing dates are retained unless content changes. No fictional Person schema is emitted.
- No pages merged, removed or newly noindexed in this pass. Existing translation noindex remains. Only two new routes: architecture library and one substantive reference design. No speculative six-page architecture batch or unsupported competitor comparisons.

## Highest body vocabulary overlaps in the original first-pass registry

Jaccard similarity of lowercased words of at least four letters; excludes global UI but not generic section prose. Manual intent analysis above takes precedence.

| Page A | Page B | Similarity |
|---|---|---:|
| /industries/construction | /industries/professional-services | 0.62 |
| /industries/distribution | /industries/retail | 0.60 |
| /industries/manufacturing | /industries/professional-services | 0.60 |
| /industries/manufacturing | /industries/construction | 0.60 |
| /industries/hvac-field-service | /industries/professional-services | 0.59 |
| /industries/retail | /industries/hvac-field-service | 0.58 |
| /industries/manufacturing | /industries/retail | 0.58 |
| /industries/manufacturing | /industries/hvac-field-service | 0.57 |
| /industries/retail | /industries/professional-services | 0.57 |
| /industries/distribution | /industries/professional-services | 0.57 |

## Comparison opportunities

RAG versus fine-tuning and on-premise versus controlled cloud are useful decision questions with clear technical dimensions. Prepare source/version-backed comparison tables in existing comparison resources first. Odoo versus NetSuite/SAP/Dynamics/QuickBooks and Private AI versus ChatGPT Enterprise need current primary pricing, capability and contractual evidence. No unsupported competitor claim or thin comparison route was published.

## Authority limits

Repository evidence supports current website functionality, assessment logic and published offers; it does not prove customer Odoo/Open WebUI deployments or printer/hardware installations. Reference architecture content is labeled as design guidance. Prioritize real runbooks, sanitized screenshots and tested failure cases once supplied by the implementation team.
