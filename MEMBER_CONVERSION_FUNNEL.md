# Nexavoris Member Conversion Funnel

## Visitor journey

1. A visitor discovers Nexavoris through an existing marketing, industry, or resource page.
2. The visitor starts the free Business Technology Assessment without creating an account.
3. The visitor answers 16 practical questions and receives estimated readiness scores.
4. The result page offers a free account to preserve the report and unlock the opportunity finder, productivity calculator, roadmap, and saved progress.
5. Platform-managed sign-in returns the visitor to `/account`; any valid device-local assessment draft is imported into the member record.
6. The dashboard recommends useful next steps and relevant existing resources.
7. A consultation remains optional and contextual rather than a gate to free tools.

## Promotion locations

- Primary header action
- Homepage assessment module
- Industries page assessment module
- Resource-page calls to action
- Public `/free-account` overview
- Public `/assessment` tool
- Site footer account link

These placements reuse the existing content architecture. They do not create bulk SEO pages or hide public educational content behind registration.

## Privacy-safe measurement

The `/api/events` endpoint records only allowlisted funnel events:

- assessment started and completed
- sign-up started and completed
- opportunity finder completed
- ROI calculator completed
- roadmap generated
- consultation clicked and submitted

Optional context is restricted to industry, source, score range, and tool. The endpoint does not accept passwords, arbitrary free text, detailed assessment answers, or sensitive profile fields.

## Optimization guidance

Measure completion rate and downstream tool use before changing the funnel. Prefer clearer explanations, better questions, and more useful recommendations over aggressive popups or artificial urgency. Any future experiments should preserve anonymous assessment access, transparent estimation language, and the free-account promise.
