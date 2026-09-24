# Yudaro SEO audit - baseline, September 24, 2026

Read-only audit captured before implementation. 112 sitemap URLs (34 English routes plus 78 language variants); 4 diagnostic URLs. Full machine-readable fields and links: `seo-baseline.json`. Repository and asset inventory: `seo-repository-inventory.json`.

## Architecture
Next.js 16 App Router, React 19, TypeScript and Vercel; server-rendered public pages under a dynamic root layout because identity and locale read request headers/cookies. Supabase authentication and Postgres-backed member tools. Static assets use next/image; Manrope and Geist Mono use next/font. Localized marketing pages are internally rewritten; resources use translated content dictionaries; a client translator also mutates metadata. APIs, accounts and admin are separate routes with server-side access checks. Motion uses lazy Motion features and reduced-motion support. No external analytics identifier or verified search-console token is assumed.

## Priority findings
- P0: client translation rewrites canonicals/hreflang; language coverage is incomplete but all variants are submitted for indexing. Internal localized route falls back to homepage for invalid slugs.
- P0: noindex auth pages are also crawl-blocked, limiting discovery of their noindex directives. Keep sensitive APIs/private routes protected.
- P1: Private AI (214 words) and ERP (260 words) have service lists but limited implementation, price, decision and preparation guidance.
- P1: assessment landing main content has 28 server-rendered words before interaction; no substantial readiness explanation.
- P1: no commercial automation or genuine Houston-area landing page; several industry intents share only overview/resource routes.
- P1: schema has Organization/ProfessionalService globally and articles; missing page-level service/breadcrumb coverage. LinkedIn sameAs cannot be independently verified from repository evidence.
- P1: no working comprehensive route/link/schema audit; old regression script expects www canonicals despite apex configuration.
- P2: resource dates are hardcoded across entries; comparison resources lack actual tables and cited technical sources.
- P2: default 404 offers little recovery guidance. Global footer has few service/resource links.
- P2: measurement setup requires verified Search Console/Bing properties and consent-aware analytics configuration.

## Existing strengths
English pages return 200, one H1 each, valid canonical and description metadata. All crawled images have alt attributes. Known missing URL returns 404. Auth layout uses noindex; admin APIs check server-side roles. No fabricated case studies are published. Apex canonical and permanent host redirects exist in code. Existing pricing, restaurant screenshots, private AI examples and operator-focused AI+ERP content are useful foundations.

## Route inventory
Word counts are extracted from main content, not ranking targets. Target intent below is inferred from existing titles; final assignments are in SEARCH-INTENT-MAP.md.

### https://yudaro.com/
- Status: 200; final URL: https://yudaro.com/; robots: index, follow; X-Robots: not specified.
- Title: Yudaro | Private AI, ERP & Business Automation
- Description: Yudaro AI & ERP Systems connects Private AI, Odoo ERP, AI + ERP integration, and business automation for growing operational companies.
- Canonical: https://yudaro.com
- H1: AI + ERP. Built around your business.
- H2: Disconnected systems. Disconnected decisions.; Great things happen when everything connects.; Your company has the knowledge. Now make it usable.; A connected platform for every part of your operation.; ERP connects the data. AI connects the dots.; Less repetition. More room to Connect. Understand. Automate. Grow.; A polished digital presence, connected to your business.; Built for companies where operations matter.; A disciplined path from complexity to clarity.; Technology designed around business outcomes.; How ready is your business for AI + ERP?; Ready to build a smarter operation?
- Schema: Organization, ProfessionalService, WebSite; parse errors: 0.
- Words: 788; images: 28; missing alt: 0; outbound links: 27; incoming crawl links: 114.
- Search intent / target: Yudaro | Private AI, ERP & Business Automation. Thin-content review: review usefulness, not word count. Orphan risk: linked. Duplicate risk: translated variants require quality review.
- Action: retain useful route; improve explicit service/answer content, structured data and related links where relevant. Private utility pages remain excluded.

### https://yudaro.com/ai-solutions
- Status: 200; final URL: https://yudaro.com/ai-solutions; robots: index, follow; X-Robots: not specified.
- Title: Private Enterprise AI Solutions | Yudaro
- Description: Secure company knowledge AI, SOP search, document intelligence, and AI automation.
- Canonical: https://yudaro.com/ai-solutions
- H1: AI that knows your company—not the entire internet.
- H2: Private AI Server; Company Knowledge AI; SOP Search; Employee Training AI; Management AI Assistant; Document Intelligence; AI Business Automation; Bring your systems, people, and knowledge together.
- Schema: Organization, ProfessionalService, WebSite; parse errors: 0.
- Words: 214; images: 13; missing alt: 0; outbound links: 32; incoming crawl links: 114.
- Search intent / target: Private Enterprise AI Solutions. Thin-content review: priority. Orphan risk: linked. Duplicate risk: translated variants require quality review.
- Action: retain useful route; improve explicit service/answer content, structured data and related links where relevant. Private utility pages remain excluded.

### https://yudaro.com/erp-solutions
- Status: 200; final URL: https://yudaro.com/erp-solutions; robots: index, follow; X-Robots: not specified.
- Title: ERP Consulting & Implementation | Yudaro
- Description: ERP consulting, Odoo implementation, integration, migration, training, and support.
- Canonical: https://yudaro.com/erp-solutions
- H1: One source of truth for a business in motion.
- H2: ERP Consulting & Workflow Design; Odoo Implementation; CRM & Sales; Purchasing & Inventory; Accounting Integration; Field Service; Subscriptions & Memberships; Dashboards & Reporting; Custom Modules; Third-Party Integrations; Data Migration & Training; Maintenance & Support; Bring your systems, people, and knowledge together.
- Schema: Organization, ProfessionalService, WebSite; parse errors: 0.
- Words: 260; images: 19; missing alt: 0; outbound links: 33; incoming crawl links: 114.
- Search intent / target: ERP Consulting & Implementation. Thin-content review: priority. Orphan risk: linked. Duplicate risk: translated variants require quality review.
- Action: retain useful route; improve explicit service/answer content, structured data and related links where relevant. Private utility pages remain excluded.

### https://yudaro.com/website-design
- Status: 200; final URL: https://yudaro.com/website-design; robots: index, follow; X-Robots: not specified.
- Title: Website Design Services & Pricing | Yudaro
- Description: Professional website design, ecommerce, integrations, and ongoing optimization with clear project pricing.
- Canonical: https://yudaro.com/website-design
- H1: A website built to move your business forward.
- H2: More than a good-looking homepage.; Choose the right starting point.; Turn your website into a useful part of your operating system.
- Schema: Organization, ProfessionalService, WebSite; parse errors: 0.
- Words: 352; images: 8; missing alt: 0; outbound links: 31; incoming crawl links: 114.
- Search intent / target: Website Design Services & Pricing. Thin-content review: review usefulness, not word count. Orphan risk: linked. Duplicate risk: translated variants require quality review.
- Action: retain useful route; improve explicit service/answer content, structured data and related links where relevant. Private utility pages remain excluded.

### https://yudaro.com/ai-erp
- Status: 200; final URL: https://yudaro.com/ai-erp; robots: index, follow; X-Robots: not specified.
- Title: AI ERP Systems & Integration for Business | Yudaro
- Description: Learn how Yudaro connects Private AI with Odoo ERP data, permissions, and human-approved workflows for practical business operations.
- Canonical: https://yudaro.com/ai-erp
- H1: AI ERP: connect intelligence with business operations.
- H2: Ask operational questions; Create business records; Find what needs attention; Automate across departments; Protect control and accountability; Improve continuously; What is AI ERP?; One governed path from question to action.; Useful automation still keeps people accountable.; One connected assistant across the operation.; Automation should be powerful, observable, and reversible.; Direct answers for business decision-makers.; Bring your systems, people, and knowledge together.
- Schema: Service, FAQPage, Organization, ProfessionalService, WebSite; parse errors: 0.
- Words: 1166; images: 11; missing alt: 0; outbound links: 33; incoming crawl links: 114.
- Search intent / target: AI ERP Systems & Integration for Business. Thin-content review: review usefulness, not word count. Orphan risk: linked. Duplicate risk: translated variants require quality review.
- Action: retain useful route; improve explicit service/answer content, structured data and related links where relevant. Private utility pages remain excluded.

### https://yudaro.com/equipment
- Status: 200; final URL: https://yudaro.com/equipment; robots: index, follow; X-Robots: not specified.
- Title: Business Server Equipment | Yudaro
- Description: The practical on-premises server platforms Yudaro recommends for Odoo ERP and private AI workloads.
- Canonical: https://yudaro.com/equipment
- H1: Practical hardware for systems that stay under your control.
- H2: Three levels of private computing power.; HPE ProLiant-class Odoo server; GMKtec EVO-X2 AI workstation; Separate platforms protect performance.; How we select the final configuration.; Let’s size the right system for your workload.
- Schema: Organization, ProfessionalService, WebSite; parse errors: 0.
- Words: 714; images: 7; missing alt: 0; outbound links: 29; incoming crawl links: 114.
- Search intent / target: Business Server Equipment. Thin-content review: review usefulness, not word count. Orphan risk: linked. Duplicate risk: translated variants require quality review.
- Action: retain useful route; improve explicit service/answer content, structured data and related links where relevant. Private utility pages remain excluded.

### https://yudaro.com/industries
- Status: 200; final URL: https://yudaro.com/industries; robots: index, follow; X-Robots: not specified.
- Title: Industries | Yudaro
- Description: See how Yudaro combines AI, ERP, and workflow automation for restaurants, distribution, field service, construction, retail, manufacturing, and service companies.
- Canonical: https://yudaro.com/industries
- H1: How Yudaro Works in Your Industry
- H2: AI ERP for wholesale distribution; AI ERP for HVAC and field service; AI ERP for construction; AI ERP for retail; AI ERP for manufacturing; AI ERP for professional services; AI ERP for restaurants; How ready is your operation for AI + ERP?; Your workflow will be different. That is where the conversation starts.
- Schema: Organization, ProfessionalService, WebSite; parse errors: 0.
- Words: 727; images: 9; missing alt: 0; outbound links: 31; incoming crawl links: 114.
- Search intent / target: Industries. Thin-content review: review usefulness, not word count. Orphan risk: linked. Duplicate risk: translated variants require quality review.
- Action: retain useful route; improve explicit service/answer content, structured data and related links where relevant. Private utility pages remain excluded.

### https://yudaro.com/pricing
- Status: 200; final URL: https://yudaro.com/pricing; robots: index, follow; X-Robots: not specified.
- Title: Pricing | Yudaro
- Description: Planning-level pricing for private enterprise AI, ERP implementation, and ongoing Yudaro support.
- Canonical: https://yudaro.com/pricing
- H1: Practical investment levels for serious business systems.
- H2: Your restaurant. Ready for service.; Company AI implementation; Company ERP setup; Monthly maintenance and improvement; What affects final pricing?; Start with a focused discovery conversation.
- Schema: Organization, ProfessionalService, WebSite; parse errors: 0.
- Words: 542; images: 3; missing alt: 0; outbound links: 31; incoming crawl links: 114.
- Search intent / target: Pricing. Thin-content review: review usefulness, not word count. Orphan risk: linked. Duplicate risk: translated variants require quality review.
- Action: retain useful route; improve explicit service/answer content, structured data and related links where relevant. Private utility pages remain excluded.

### https://yudaro.com/about
- Status: 200; final URL: https://yudaro.com/about; robots: index, follow; X-Robots: not specified.
- Title: About Yudaro AI & ERP Systems | Yudaro
- Description: Yudaro serves operational small and midsize businesses with Private AI, Odoo ERP, AI ERP integration, automation, and practical implementation support.
- Canonical: https://yudaro.com/about
- H1: Technology should fit the business. Not the other way around.
- H2: Four principles. One practical standard.; Business before software; Integration over novelty; Privacy and control; Long-term partnership; A partnership built around clear decisions.; What Yudaro does not promise; Who we serve; Tell us how your business really works.
- Schema: Organization, ProfessionalService, WebSite; parse errors: 0.
- Words: 469; images: 9; missing alt: 0; outbound links: 27; incoming crawl links: 114.
- Search intent / target: About Yudaro AI & ERP Systems. Thin-content review: review usefulness, not word count. Orphan risk: linked. Duplicate risk: translated variants require quality review.
- Action: retain useful route; improve explicit service/answer content, structured data and related links where relevant. Private utility pages remain excluded.

### https://yudaro.com/contact
- Status: 200; final URL: https://yudaro.com/contact; robots: index, follow; X-Robots: not specified.
- Title: Contact Yudaro | Yudaro
- Description: Discuss private AI, ERP, automation, equipment, or website design requirements with Yudaro.
- Canonical: https://yudaro.com/contact
- H1: Start with your business—not a software pitch.
- H2: 
- Schema: Organization, ProfessionalService, WebSite; parse errors: 0.
- Words: 138; images: 2; missing alt: 0; outbound links: 27; incoming crawl links: 114.
- Search intent / target: Contact Yudaro. Thin-content review: priority. Orphan risk: linked. Duplicate risk: translated variants require quality review.
- Action: retain useful route; improve explicit service/answer content, structured data and related links where relevant. Private utility pages remain excluded.

### https://yudaro.com/free-account
- Status: 200; final URL: https://yudaro.com/free-account; robots: index, follow; X-Robots: not specified.
- Title: Free Yudaro Business Account | Yudaro
- Description: Save your business analysis, find automation opportunities, calculate illustrative productivity value, and build a practical AI + ERP roadmap.
- Canonical: https://yudaro.com/free-account
- H1: Free Yudaro Business Account
- H2: Useful business analysis you can keep and improve.
- Schema: Organization, ProfessionalService, WebSite; parse errors: 0.
- Words: 89; images: 2; missing alt: 0; outbound links: 27; incoming crawl links: 114.
- Search intent / target: Free Yudaro Business Account. Thin-content review: priority. Orphan risk: linked. Duplicate risk: translated variants require quality review.
- Action: retain useful route; improve explicit service/answer content, structured data and related links where relevant. Private utility pages remain excluded.

### https://yudaro.com/assessment
- Status: 200; final URL: https://yudaro.com/assessment; robots: index, follow; X-Robots: not specified.
- Title: AI & ERP Readiness Assessment | Yudaro
- Description: Answer 16 practical questions to estimate AI readiness, ERP readiness, automation potential, and data readiness.
- Canonical: https://yudaro.com/assessment
- H1: AI & ERP Readiness Assessment
- H2: 
- Schema: Organization, ProfessionalService, WebSite; parse errors: 0.
- Words: 28; images: 2; missing alt: 0; outbound links: 27; incoming crawl links: 114.
- Search intent / target: AI & ERP Readiness Assessment. Thin-content review: priority. Orphan risk: linked. Duplicate risk: translated variants require quality review.
- Action: retain useful route; improve explicit service/answer content, structured data and related links where relevant. Private utility pages remain excluded.

### https://yudaro.com/resources
- Status: 200; final URL: https://yudaro.com/resources; robots: index, follow; X-Robots: not specified.
- Title: Resources | Yudaro
- Description: Practical answers for business owners evaluating Private AI, Odoo ERP, AI + ERP integration, and workflow automation.
- Canonical: https://yudaro.com/resources
- H1: Resources
- H2: Browse practical guides
- Schema: Organization, ProfessionalService, WebSite; parse errors: 0.
- Words: 366; images: 2; missing alt: 0; outbound links: 33; incoming crawl links: 114.
- Search intent / target: Resources. Thin-content review: review usefulness, not word count. Orphan risk: linked. Duplicate risk: translated variants require quality review.
- Action: retain useful route; improve explicit service/answer content, structured data and related links where relevant. Private utility pages remain excluded.

### https://yudaro.com/resources/private-ai
- Status: 200; final URL: https://yudaro.com/resources/private-ai; robots: index, follow; X-Robots: not specified.
- Title: What is private AI for a business? | Yudaro
- Description: A practical guide to private AI, company knowledge search, permissions, local hardware, cost drivers, and implementation readiness.
- Canonical: https://yudaro.com/resources/private-ai
- H1: What is private AI for a business?
- H2: What this means for a business; Real-world example; Limitations and what to consider; Common questions; Related Yudaro resources; Talk to Yudaro about your workflow
- Schema: Article, BreadcrumbList, Organization, ProfessionalService, WebSite; parse errors: 0.
- Words: 359; images: 2; missing alt: 0; outbound links: 27; incoming crawl links: 10.
- Search intent / target: What is private AI for a business?. Thin-content review: review usefulness, not word count. Orphan risk: linked. Duplicate risk: translated variants require quality review.
- Action: retain useful route; improve explicit service/answer content, structured data and related links where relevant. Private utility pages remain excluded.

### https://yudaro.com/resources/odoo-erp
- Status: 200; final URL: https://yudaro.com/resources/odoo-erp; robots: index, follow; X-Robots: not specified.
- Title: What is Odoo ERP, and when does it fit? | Yudaro
- Description: A business guide to Odoo modules, Community versus Enterprise, implementation, migration, cost, and operating fit.
- Canonical: https://yudaro.com/resources/odoo-erp
- H1: What is Odoo ERP, and when does it fit?
- H2: What this means for a business; Real-world example; Limitations and what to consider; Common questions; Related Yudaro resources; Talk to Yudaro about your workflow
- Schema: Article, BreadcrumbList, Organization, ProfessionalService, WebSite; parse errors: 0.
- Words: 376; images: 2; missing alt: 0; outbound links: 28; incoming crawl links: 10.
- Search intent / target: What is Odoo ERP, and when does it fit?. Thin-content review: review usefulness, not word count. Orphan risk: linked. Duplicate risk: translated variants require quality review.
- Action: retain useful route; improve explicit service/answer content, structured data and related links where relevant. Private utility pages remain excluded.

### https://yudaro.com/resources/ai-erp
- Status: 200; final URL: https://yudaro.com/resources/ai-erp; robots: index, follow; X-Robots: not specified.
- Title: What does AI + ERP integration actually mean? | Yudaro
- Description: How governed AI can retrieve ERP data, combine it with company knowledge, prepare actions, and preserve human approval.
- Canonical: https://yudaro.com/resources/ai-erp
- H1: What does AI + ERP integration actually mean?
- H2: What this means for a business; Real-world example; Limitations and what to consider; Common questions; Related Yudaro resources; Talk to Yudaro about your workflow
- Schema: Article, BreadcrumbList, Organization, ProfessionalService, WebSite; parse errors: 0.
- Words: 352; images: 2; missing alt: 0; outbound links: 27; incoming crawl links: 6.
- Search intent / target: What does AI + ERP integration actually mean?. Thin-content review: review usefulness, not word count. Orphan risk: linked. Duplicate risk: translated variants require quality review.
- Action: retain useful route; improve explicit service/answer content, structured data and related links where relevant. Private utility pages remain excluded.

### https://yudaro.com/resources/business-automation
- Status: 200; final URL: https://yudaro.com/resources/business-automation; robots: index, follow; X-Robots: not specified.
- Title: Which business workflows should be automated? | Yudaro
- Description: A practical framework for choosing automation candidates, defining controls, and avoiding automation of broken processes.
- Canonical: https://yudaro.com/resources/business-automation
- H1: Which business workflows should be automated?
- H2: What this means for a business; Real-world example; Limitations and what to consider; Common questions; Related Yudaro resources; Talk to Yudaro about your workflow
- Schema: Article, BreadcrumbList, Organization, ProfessionalService, WebSite; parse errors: 0.
- Words: 343; images: 2; missing alt: 0; outbound links: 29; incoming crawl links: 114.
- Search intent / target: Which business workflows should be automated?. Thin-content review: review usefulness, not word count. Orphan risk: linked. Duplicate risk: translated variants require quality review.
- Action: retain useful route; improve explicit service/answer content, structured data and related links where relevant. Private utility pages remain excluded.

### https://yudaro.com/resources/comparisons
- Status: 200; final URL: https://yudaro.com/resources/comparisons; robots: index, follow; X-Robots: not specified.
- Title: Private AI, public AI, and ERP choices compared | Yudaro
- Description: Fair comparisons for Private AI versus ChatGPT, local versus cloud AI, Odoo editions, and Odoo versus QuickBooks.
- Canonical: https://yudaro.com/resources/comparisons
- H1: Private AI, public AI, and ERP choices compared
- H2: What this means for a business; Real-world example; Limitations and what to consider; Common questions; Related Yudaro resources; Talk to Yudaro about your workflow
- Schema: Article, BreadcrumbList, Organization, ProfessionalService, WebSite; parse errors: 0.
- Words: 359; images: 2; missing alt: 0; outbound links: 29; incoming crawl links: 5.
- Search intent / target: Private AI, public AI, and ERP choices compared. Thin-content review: review usefulness, not word count. Orphan risk: linked. Duplicate risk: translated variants require quality review.
- Action: retain useful route; improve explicit service/answer content, structured data and related links where relevant. Private utility pages remain excluded.

### https://yudaro.com/resources/guides
- Status: 200; final URL: https://yudaro.com/resources/guides; robots: index, follow; X-Robots: not specified.
- Title: Planning cost, timing, and scope for AI and ERP | Yudaro
- Description: A buyer guide to Private AI cost, Odoo implementation cost, AI + ERP timing, discovery inputs, and ongoing support.
- Canonical: https://yudaro.com/resources/guides
- H1: Planning cost, timing, and scope for AI and ERP
- H2: What this means for a business; Real-world example; Limitations and what to consider; Common questions; Related Yudaro resources; Talk to Yudaro about your workflow
- Schema: Article, BreadcrumbList, Organization, ProfessionalService, WebSite; parse errors: 0.
- Words: 347; images: 2; missing alt: 0; outbound links: 27; incoming crawl links: 9.
- Search intent / target: Planning cost, timing, and scope for AI and ERP. Thin-content review: review usefulness, not word count. Orphan risk: linked. Duplicate risk: translated variants require quality review.
- Action: retain useful route; improve explicit service/answer content, structured data and related links where relevant. Private utility pages remain excluded.

### https://yudaro.com/resources/industries/wholesale-distribution
- Status: 200; final URL: https://yudaro.com/resources/industries/wholesale-distribution; robots: index, follow; X-Robots: not specified.
- Title: AI, ERP, and automation for Wholesale & Distribution | Yudaro
- Description: A practical guide to inventory accuracy, customer-specific pricing, purchasing, replenishment, fulfillment, returns, and warehouse procedures for wholesale & distribution businesses.
- Canonical: https://yudaro.com/resources/industries/wholesale-distribution
- H1: AI, ERP, and automation for Wholesale & Distribution
- H2: What this means for a business; Real-world example; Limitations and what to consider; Common questions; Related Yudaro resources; Talk to Yudaro about your workflow
- Schema: Article, BreadcrumbList, Organization, ProfessionalService, WebSite; parse errors: 0.
- Words: 360; images: 2; missing alt: 0; outbound links: 27; incoming crawl links: 114.
- Search intent / target: AI, ERP, and automation for Wholesale & Distribution. Thin-content review: review usefulness, not word count. Orphan risk: linked. Duplicate risk: translated variants require quality review.
- Action: retain useful route; improve explicit service/answer content, structured data and related links where relevant. Private utility pages remain excluded.

### https://yudaro.com/resources/industries/hvac-field-service
- Status: 200; final URL: https://yudaro.com/resources/industries/hvac-field-service; robots: index, follow; X-Robots: not specified.
- Title: AI, ERP, and automation for HVAC & Field Service | Yudaro
- Description: A practical guide to dispatch, equipment history, maintenance plans, parts, warranties, field procedures, and invoicing for hvac & field service businesses.
- Canonical: https://yudaro.com/resources/industries/hvac-field-service
- H1: AI, ERP, and automation for HVAC & Field Service
- H2: What this means for a business; Real-world example; Limitations and what to consider; Common questions; Related Yudaro resources; Talk to Yudaro about your workflow
- Schema: Article, BreadcrumbList, Organization, ProfessionalService, WebSite; parse errors: 0.
- Words: 365; images: 2; missing alt: 0; outbound links: 27; incoming crawl links: 114.
- Search intent / target: AI, ERP, and automation for HVAC & Field Service. Thin-content review: review usefulness, not word count. Orphan risk: linked. Duplicate risk: translated variants require quality review.
- Action: retain useful route; improve explicit service/answer content, structured data and related links where relevant. Private utility pages remain excluded.

### https://yudaro.com/resources/industries/construction
- Status: 200; final URL: https://yudaro.com/resources/industries/construction; robots: index, follow; X-Robots: not specified.
- Title: AI, ERP, and automation for Construction | Yudaro
- Description: A practical guide to job cost, change orders, purchasing commitments, field documents, schedule, and approvals for construction businesses.
- Canonical: https://yudaro.com/resources/industries/construction
- H1: AI, ERP, and automation for Construction
- H2: What this means for a business; Real-world example; Limitations and what to consider; Common questions; Related Yudaro resources; Talk to Yudaro about your workflow
- Schema: Article, BreadcrumbList, Organization, ProfessionalService, WebSite; parse errors: 0.
- Words: 350; images: 2; missing alt: 0; outbound links: 27; incoming crawl links: 114.
- Search intent / target: AI, ERP, and automation for Construction. Thin-content review: review usefulness, not word count. Orphan risk: linked. Duplicate risk: translated variants require quality review.
- Action: retain useful route; improve explicit service/answer content, structured data and related links where relevant. Private utility pages remain excluded.

### https://yudaro.com/resources/industries/manufacturing
- Status: 200; final URL: https://yudaro.com/resources/industries/manufacturing; robots: index, follow; X-Robots: not specified.
- Title: AI, ERP, and automation for Manufacturing | Yudaro
- Description: A practical guide to material requirements, production planning, work orders, quality procedures, revision control, and production exceptions for manufacturing businesses.
- Canonical: https://yudaro.com/resources/industries/manufacturing
- H1: AI, ERP, and automation for Manufacturing
- H2: What this means for a business; Real-world example; Limitations and what to consider; Common questions; Related Yudaro resources; Talk to Yudaro about your workflow
- Schema: Article, BreadcrumbList, Organization, ProfessionalService, WebSite; parse errors: 0.
- Words: 354; images: 2; missing alt: 0; outbound links: 27; incoming crawl links: 114.
- Search intent / target: AI, ERP, and automation for Manufacturing. Thin-content review: review usefulness, not word count. Orphan risk: linked. Duplicate risk: translated variants require quality review.
- Action: retain useful route; improve explicit service/answer content, structured data and related links where relevant. Private utility pages remain excluded.

### https://yudaro.com/resources/industries/retail
- Status: 200; final URL: https://yudaro.com/resources/industries/retail; robots: index, follow; X-Robots: not specified.
- Title: AI, ERP, and automation for Retail | Yudaro
- Description: A practical guide to multi-location inventory, products, purchasing, returns, customer records, and replenishment for retail businesses.
- Canonical: https://yudaro.com/resources/industries/retail
- H1: AI, ERP, and automation for Retail
- H2: What this means for a business; Real-world example; Limitations and what to consider; Common questions; Related Yudaro resources; Talk to Yudaro about your workflow
- Schema: Article, BreadcrumbList, Organization, ProfessionalService, WebSite; parse errors: 0.
- Words: 346; images: 2; missing alt: 0; outbound links: 27; incoming crawl links: 114.
- Search intent / target: AI, ERP, and automation for Retail. Thin-content review: review usefulness, not word count. Orphan risk: linked. Duplicate risk: translated variants require quality review.
- Action: retain useful route; improve explicit service/answer content, structured data and related links where relevant. Private utility pages remain excluded.

### https://yudaro.com/resources/industries/professional-services
- Status: 200; final URL: https://yudaro.com/resources/industries/professional-services; robots: index, follow; X-Robots: not specified.
- Title: AI, ERP, and automation for Professional Services | Yudaro
- Description: A practical guide to opportunities, scope, resources, time, delivery standards, recurring work, and billing for professional services businesses.
- Canonical: https://yudaro.com/resources/industries/professional-services
- H1: AI, ERP, and automation for Professional Services
- H2: What this means for a business; Real-world example; Limitations and what to consider; Common questions; Related Yudaro resources; Talk to Yudaro about your workflow
- Schema: Article, BreadcrumbList, Organization, ProfessionalService, WebSite; parse errors: 0.
- Words: 353; images: 2; missing alt: 0; outbound links: 27; incoming crawl links: 114.
- Search intent / target: AI, ERP, and automation for Professional Services. Thin-content review: review usefulness, not word count. Orphan risk: linked. Duplicate risk: translated variants require quality review.
- Action: retain useful route; improve explicit service/answer content, structured data and related links where relevant. Private utility pages remain excluded.

### https://yudaro.com/resources/industries/restaurants
- Status: 200; final URL: https://yudaro.com/resources/industries/restaurants; robots: index, follow; X-Robots: not specified.
- Title: AI, ERP, and automation for Restaurant | Yudaro
- Description: A practical guide to food cost, vendor pricing, purchasing, inventory, labor, waste, recipes, training, and management reporting for restaurant businesses.
- Canonical: https://yudaro.com/resources/industries/restaurants
- H1: AI, ERP, and automation for Restaurant
- H2: What this means for a business; Real-world example; Limitations and what to consider; Common questions; Related Yudaro resources; Talk to Yudaro about your workflow
- Schema: Article, BreadcrumbList, Organization, ProfessionalService, WebSite; parse errors: 0.
- Words: 354; images: 2; missing alt: 0; outbound links: 27; incoming crawl links: 1.
- Search intent / target: AI, ERP, and automation for Restaurant. Thin-content review: review usefulness, not word count. Orphan risk: linked. Duplicate risk: translated variants require quality review.
- Action: retain useful route; improve explicit service/answer content, structured data and related links where relevant. Private utility pages remain excluded.

### https://yudaro.com/case-studies
- Status: 200; final URL: https://yudaro.com/case-studies; robots: index, follow; X-Robots: not specified.
- Title: Case Studies | Yudaro
- Description: Yudaro case-study standards and representative operational scenarios for AI, ERP, and automation.
- Canonical: https://yudaro.com/case-studies
- H1: Operational evidence, labeled honestly.
- H2: Representative industry scenarios; Verified case-study standard; Reusable evidence record; Start with the operation you have today.
- Schema: Organization, ProfessionalService, WebSite; parse errors: 0.
- Words: 188; images: 2; missing alt: 0; outbound links: 27; incoming crawl links: 114.
- Search intent / target: Case Studies. Thin-content review: priority. Orphan risk: linked. Duplicate risk: translated variants require quality review.
- Action: retain useful route; improve explicit service/answer content, structured data and related links where relevant. Private utility pages remain excluded.

### https://yudaro.com/how-yudaro-works
- Status: 200; final URL: https://yudaro.com/how-yudaro-works; robots: index, follow; X-Robots: not specified.
- Title: How Yudaro Works | Yudaro
- Description: A practical, phased process for evaluating and implementing private AI, Odoo ERP, and business automation.
- Canonical: https://yudaro.com/how-yudaro-works
- H1: A disciplined path from operational friction to a working system.
- H2: Discovery; Process and data review; Roadmap and pilot; Implementation and training; Ongoing improvement; Start with the operation you have today.
- Schema: Organization, ProfessionalService, WebSite; parse errors: 0.
- Words: 248; images: 2; missing alt: 0; outbound links: 27; incoming crawl links: 114.
- Search intent / target: How Yudaro Works. Thin-content review: priority. Orphan risk: linked. Duplicate risk: translated variants require quality review.
- Action: retain useful route; improve explicit service/answer content, structured data and related links where relevant. Private utility pages remain excluded.

### https://yudaro.com/methodology/ai-erp-readiness
- Status: 200; final URL: https://yudaro.com/methodology/ai-erp-readiness; robots: index, follow; X-Robots: not specified.
- Title: AI & ERP Readiness Methodology | Yudaro
- Description: How the Yudaro readiness assessment evaluates AI, ERP, automation, and data readiness—and what its score does not mean.
- Canonical: https://yudaro.com/methodology/ai-erp-readiness
- H1: What the AI & ERP Readiness Score measures.
- H2: Four dimensions; How scoring works; Interpretation; Limitations; Start with the operation you have today.
- Schema: Organization, ProfessionalService, WebSite; parse errors: 0.
- Words: 193; images: 2; missing alt: 0; outbound links: 27; incoming crawl links: 0.
- Search intent / target: AI & ERP Readiness Methodology. Thin-content review: priority. Orphan risk: review. Duplicate risk: translated variants require quality review.
- Action: retain useful route; improve explicit service/answer content, structured data and related links where relevant. Private utility pages remain excluded.

### https://yudaro.com/methodology/roi-calculator
- Status: 200; final URL: https://yudaro.com/methodology/roi-calculator; robots: index, follow; X-Robots: not specified.
- Title: Productivity Calculator Methodology | Yudaro
- Description: Assumptions, inputs, interpretation, and limitations for the Yudaro AI and ERP productivity calculator.
- Canonical: https://yudaro.com/methodology/roi-calculator
- H1: An illustrative productivity estimate—not a financial promise.
- H2: Inputs; Calculation approach; What it excludes; Responsible use; Start with the operation you have today.
- Schema: Organization, ProfessionalService, WebSite; parse errors: 0.
- Words: 168; images: 2; missing alt: 0; outbound links: 27; incoming crawl links: 0.
- Search intent / target: Productivity Calculator Methodology. Thin-content review: priority. Orphan risk: review. Duplicate risk: translated variants require quality review.
- Action: retain useful route; improve explicit service/answer content, structured data and related links where relevant. Private utility pages remain excluded.

### https://yudaro.com/trust
- Status: 200; final URL: https://yudaro.com/trust; robots: index, follow; X-Robots: not specified.
- Title: Trust, Data & AI Practices | Yudaro
- Description: How Yudaro approaches data access, permissions, human oversight, security boundaries, and responsible AI limitations.
- Canonical: https://yudaro.com/trust
- H1: Control begins with clear boundaries and accountable people.
- H2: Data minimization; Permissions and oversight; AI limitations; Implementation-specific security; Start with the operation you have today.
- Schema: Organization, ProfessionalService, WebSite; parse errors: 0.
- Words: 172; images: 2; missing alt: 0; outbound links: 27; incoming crawl links: 114.
- Search intent / target: Trust, Data & AI Practices. Thin-content review: priority. Orphan risk: linked. Duplicate risk: translated variants require quality review.
- Action: retain useful route; improve explicit service/answer content, structured data and related links where relevant. Private utility pages remain excluded.

### https://yudaro.com/privacy
- Status: 200; final URL: https://yudaro.com/privacy; robots: index, follow; X-Robots: not specified.
- Title: Privacy Policy | Yudaro
- Description: How Yudaro handles information submitted through its website, assessments, member tools, and consultation requests.
- Canonical: https://yudaro.com/privacy
- H1: Clear expectations for information you share.
- H2: Information collected; How information is used; Access and retention; Your choices; Contact; Start with the operation you have today.
- Schema: Organization, ProfessionalService, WebSite; parse errors: 0.
- Words: 195; images: 2; missing alt: 0; outbound links: 27; incoming crawl links: 114.
- Search intent / target: Privacy Policy. Thin-content review: priority. Orphan risk: linked. Duplicate risk: translated variants require quality review.
- Action: retain useful route; improve explicit service/answer content, structured data and related links where relevant. Private utility pages remain excluded.

### https://yudaro.com/terms
- Status: 200; final URL: https://yudaro.com/terms; robots: index, follow; X-Robots: not specified.
- Title: Terms of Use | Yudaro
- Description: Terms for using Yudaro public information, assessments, calculators, member tools, and consultation forms.
- Canonical: https://yudaro.com/terms
- H1: Use planning tools as guidance—not a guarantee.
- H2: Educational information; Illustrative outputs; Accounts and acceptable use; Engagement scope; Changes and contact; Start with the operation you have today.
- Schema: Organization, ProfessionalService, WebSite; parse errors: 0.
- Words: 181; images: 2; missing alt: 0; outbound links: 27; incoming crawl links: 114.
- Search intent / target: Terms of Use. Thin-content review: priority. Orphan risk: linked. Duplicate risk: translated variants require quality review.
- Action: retain useful route; improve explicit service/answer content, structured data and related links where relevant. Private utility pages remain excluded.

### https://yudaro.com/industries/restaurants
- Status: 200; final URL: https://yudaro.com/industries/restaurants; robots: index, follow; X-Robots: not specified.
- Title: AI & ERP Solutions for Restaurants | Yudaro
- Description: Yudaro helps make-to-order and Chinese buffet restaurants improve food cost, inventory, purchasing, waste, training, reporting, and AI readiness.
- Canonical: https://yudaro.com/industries/restaurants
- H1: Turn Restaurant Data Into Better Decisions
- H2: From the first guest to the back office.; One operation. Many places for margin to disappear.; Make-to-order and buffet operations require different logic.; Odoo POS and ERP, or integration with your existing POS.; Your restaurant's knowledge—available when employees need it.; See the risks, priorities, and potential opportunity in your restaurant.
- Schema: Service, Organization, ProfessionalService, WebSite; parse errors: 0.
- Words: 653; images: 12; missing alt: 0; outbound links: 37; incoming crawl links: 114.
- Search intent / target: AI & ERP Solutions for Restaurants. Thin-content review: review usefulness, not word count. Orphan risk: linked. Duplicate risk: translated variants require quality review.
- Action: retain useful route; improve explicit service/answer content, structured data and related links where relevant. Private utility pages remain excluded.

### https://yudaro.com/this-page-does-not-exist-audit
- Status: 404; final URL: https://yudaro.com/this-page-does-not-exist-audit; robots: not specified; X-Robots: not specified.
- Title: 
- Description: 
- Canonical: None
- H1: 
- H2: 
- Schema: ; parse errors: 0.
- Words: 5; images: 0; missing alt: 0; outbound links: 0; incoming crawl links: 0.
- Search intent / target: . Thin-content review: priority. Orphan risk: review. Duplicate risk: translated variants require quality review.
- Action: retain useful route; improve explicit service/answer content, structured data and related links where relevant. Private utility pages remain excluded.

### https://yudaro.com/login
- Status: 200; final URL: https://yudaro.com/login; robots: noindex, nofollow, nocache; X-Robots: not specified.
- Title: Sign in | Yudaro
- Description: Yudaro helps businesses connect private AI, ERP, Odoo, company knowledge and workflow automation to improve operations, reporting and decision-making.
- Canonical: None
- H1: Sign in to Yudaro
- H2: 
- Schema: Organization, ProfessionalService, WebSite; parse errors: 0.
- Words: 26; images: 2; missing alt: 0; outbound links: 28; incoming crawl links: 0.
- Search intent / target: Sign in. Thin-content review: priority. Orphan risk: review. Duplicate risk: translated variants require quality review.
- Action: retain useful route; improve explicit service/answer content, structured data and related links where relevant. Private utility pages remain excluded.

## Boundaries and evidence
No Google indexing, rankings, field Core Web Vitals, social-profile ownership, partner status, certifications or client outcomes have been verified. Network response timings are diagnostic observations, not field metrics. Broken-link and redirect testing is recorded separately by the final audit; the baseline source lists all extracted links.