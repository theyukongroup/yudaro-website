# Yudaro visual transformation and motion upgrade

Completed locally in `C:\Users\l.leung\Documents\yudaro-website`. The earlier `nexavoris-website` folder was renamed before this task. Public brand and canonical domain remain Yudaro / www.yudaro.com. This change has not been deployed to Vercel.

## Five biggest visible changes

1. Serif, conservative hero becomes a large Manrope headline, blue-to-cyan emphasis, real warehouse photography, and a layered AI/ERP workflow panel.
2. The static stacked operating-system boxes become a central Yudaro ecosystem with five interactive nodes, animated SVG connections, keyboard/touch selection, and useful explanations.
3. Flat beige rectangles become white and cool-blue surfaces, rounded image cards, deliberate spacing, and softer elevation. Dark-green legacy sections become Yudaro navy.
4. Solutions gain interactive Private AI queries, ERP module selectors, and a five-stage data-to-action workflow. Motion explains the relationship between people, records, AI, approvals, and automation.
5. Navigation becomes grouped Solutions/Industries mega menus, the footer gains a clear closing message, and assessments gain animated progress and stronger selected/focus states.

## Requested implementation report

| # | Area | Implementation |
|---|---|---|
| 1 | Major visual changes | Bright, logo-derived enterprise system with larger sans-serif headings, selective gradients, dimensional cards, stronger photography, and explanatory motion. |
| 2 | Homepage sections | Hero; operational problems; new Yudaro ecosystem; Private AI; ERP; AI + ERP; automation; website services; photographic industries; implementation; business outcomes; assessment moved near the close; final CTA. Existing service coverage and links retained. |
| 3 | Components created | DesktopNavigation, HeroSignal, Ecosystem, AIConsole, ERPModules, WorkflowDemo, FlowLine, KineticWords. Existing SolutionPage and assessment components extended. |
| 4 | Animation components | MotionSystem, StepTransition, MagneticLink, lazy motion-features module; viewport observers, hero sequence, card reveals, rotating word crossfades, and pause control. |
| 5 | Animation library | Motion for React 13.4.0 with LazyMotion and asynchronously loaded domAnimation. No GSAP or second animation library. CSS handles simple loops and SVG strokes. |
| 6 | SVG/data flow | Five paths link Employees, Private AI, ERP, Company Data, and Automated Processes to Yudaro. Moving stroke dashes and active-path emphasis explain the connections. Reusable flow lines appear in the ERP, automation, CTA and footer areas. |
| 7 | Mobile | Radial ecosystem becomes a vertical connected sequence. Workflow stages become full-width buttons. Cards and menus reflow; hover information remains accessible by tap. Magnetic effects are mouse-only. |
| 8 | Accessibility | Semantic groups and progress elements, named buttons, visible focus, question-heading focus, native industry dialog with explicit focus wrapping, Escape dismissal, and retained native mobile menu. Device reduced motion disables continuous animation and transforms; a global pause control is available. Content is server rendered. |
| 9 | Images | No original image files or logos were replaced. Existing local warehouse imagery now anchors the hero, and existing industry photographs replace icon-only homepage industry cards. Rounded crops and interface overlays add context. Existing product screenshots and alt text remain. |
| 10 | Typography | Retained Manrope and Geist Mono. Manrope now drives display headings as well as body text; removed the Newsreader font request. Fluid heading scales and balanced wrapping adapt to small screens. |
| 11 | Tokens | Central tokens in app/momentum.css: navy #092b46, blue #08649e, cyan #008c9e, white, mist #f0f7fb, ice #e3f4f7, muted #52677b and line #d9e5ee. Violet/coral are reserved accents. Radius, shadow, gradient and easing tokens are shared. |
| 12 | Navigation | Solutions and Industries disclosure mega menus with descriptions/icons; keyboard dismissal, outside click, and focus-leave handling. Header becomes slightly smaller with a translucent surface after scrolling. Existing mobile dialog and account/language controls retained. |
| 13 | Assessment UX | Progress animates with scaleX. Questions and results transition without blocking controls. Selected responses use clear contrast and aria-pressed. Questions are associated with inputs and receive focus. Restaurant progress is accessible and scrolling honors reduced motion. Scoring and persistence unchanged. |
| 14 | Performance | Lazy Motion features; one fewer webfont; transform/opacity-focused animation; SVG instead of canvas; viewport-paused loops; lighter mobile motion; existing Next Image optimization and lazy loading. No simulated loading or delayed page transitions. No hardware-level 60 FPS guarantee was measured. |
| 15 | Build | Production Next.js build passes. |
| 16 | Lint | All edited components pass with no suppressed rules. Full npm run lint still fails with 112 pre-existing findings in unmodified files, compared with 141 recorded before this task. These include admin typing, legacy links, and existing UI accessibility/compiler findings. |
| 17 | Typecheck | npm run typecheck passes. |
| 18 | Remaining issues | Existing full-project lint debt; production deployment is still pending. Backend-dependent account/contact delivery was not exercised with real customer data. New illustrative UI copy is English and uses the existing language system's fallback behavior; bespoke translations were not added. Real-device frame-rate testing remains advisable. |

## Validation evidence

- Nine major pages: Home, Private AI, ERP, AI + ERP, Industries, Restaurants, Assessment, About, Contact.
- Responsive sweep: 63 route/viewport checks across 375, 430, 768, 1024, 1280, 1440 and 1920 px. No horizontal overflow, broken loaded images, runtime errors, or missing/duplicate H1s.
- Final visual review: 18 full-page desktop/mobile captures with all images explicitly loaded in the QA browser. Image loading behavior in production remains lazy where appropriate.
- SEO: 1,004/1,004 regression checks pass, including canonical, hreflang, sitemap, robots, private isolation and mobile-navigation source checks.
- Restaurant diagnostic scenarios: 8/8 pass. SQL compatibility: 16/16 pass.
- Browser interactions cover menus, focus dismissal, ecosystem selection, AI queries, ERP selection, workflow stages, motion pause, offscreen animation, all 16 general assessment questions, required contact fields, reduced motion and no-JavaScript crawlability.
- Evidence JSON/logs are in docs/yudaro-motion. Visual review images are in output/visual-upgrade (local outputs are intentionally ignored by Git).

## Preserved boundaries

No changes to Vercel configuration, canonical domain, authentication/backend architecture, Odoo servers, Nginx, Cloudflare, Open WebUI infrastructure, AI machines, or other repositories. Existing approved content, metadata, structured data, industry guides, assessment scoring, and internal destinations remain. AI/workflow demos are explicitly illustrative and do not fabricate operational results or numeric claims.

## Design and implementation references

- Internal design system: design-system/yudaro/MASTER.md.
- Installed Next.js server/client and CSS guidance in node_modules/next/dist/docs.
- Motion lazy loading: https://motion.dev/docs/react-lazy-motion
- Motion reduced motion: https://motion.dev/docs/react-use-reduced-motion

Contrast verification: white CTA text ranges from 6.31:1 on Yudaro blue to 4.99:1 on the stronger cyan gradient endpoint (#007b8c).

Final production verification: all 63 route/viewport checks and all 14 browser interaction checks passed on the completed build. The restaurant diagnostic also completed on a 375px reduced-motion viewport. A separate sweep of all nine major pages found no console errors or failing network responses. Local preview: http://127.0.0.1:3193. Before/after and hero screenshots: output/visual-upgrade.
