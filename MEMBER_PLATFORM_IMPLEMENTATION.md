# Nexavoris Member Platform Implementation

## Architecture

The member platform extends the existing public marketing site without changing its public URL structure. `/assessment` and `/free-account` are public, indexable acquisition pages. `/account` is a dynamic, authenticated workspace and is excluded from search engines.

Authentication uses the Sites-managed Sign in with ChatGPT identity flow. Nexavoris never receives or stores passwords. Registration, identity verification, password recovery, sessions, and sign-out are handled by the platform identity provider. The application stores only the stable authenticated user ID, email address, optional profile information, and user-created analysis records.

Structured member data is stored in the Cloudflare D1 binding `DB`. The idempotent schema is defined in `.openai/drizzle/0001_member_platform.sql`; server access is centralized in `lib/member-db.ts`. API routes independently verify authenticated identity headers before reading or writing member records.

## Member features

- 16-question public AI + ERP readiness assessment
- Deterministic AI, ERP, automation, data, and overall readiness scoring
- Device-local anonymous draft, imported after sign-in
- Saved assessment reports and business profile
- AI + ERP opportunity finder
- Illustrative productivity/ROI calculator with 10%, 20%, 25%, and 30% scenarios
- Four-phase personalized roadmap
- Progress tracking, contextual resources, and optional consultation CTA
- English, Simplified Chinese, Traditional Chinese, and Spanish interface support

The scoring and calculator functions live in `lib/member-tools.ts`. Scores are estimates based exclusively on disclosed user responses. ROI values are illustrative productivity scenarios, not promises or guarantees.

## Security and privacy

- No custom password database or authentication cookies
- Every member API operation checks the platform-authenticated user ID
- Database queries are parameterized
- Request-size limits apply to member and analytics endpoints
- Funnel analytics accept only an event allowlist and a small context-key allowlist
- Member pages send `noindex`, `nofollow`, `nocache`, and no-referrer directives
- `robots.txt` disallows `/account` and `/api/` for OAI-SearchBot, Googlebot, Bingbot, and other crawlers while allowing public marketing pages
- Profile forms explicitly warn users not to enter passwords, credentials, or sensitive personal information

## Operations

Run `npm run build` before deployment. Sites deployment creates or updates the D1 resource from `.openai/hosting.json` and applies the SQL migration. Production smoke tests should cover public assessment completion, sign-in redirect, authenticated dashboard loading, record save/read isolation, robots, sitemap, canonical metadata, and mobile rendering.
