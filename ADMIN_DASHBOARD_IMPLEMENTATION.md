# Nexavoris Administrator Dashboard

## Access and authorization

`/admin` is separate from the member dashboard. It requires Sites-managed Sign in with ChatGPT and then verifies an active `admin_staff` record on the server. API authorization is repeated for every request; hiding navigation is never treated as security.

The `NEXAVORIS_ADMIN_EMAILS` hosted environment setting bootstraps trusted primary administrators without placing an email, password, token, or secret in source code. Administrators can grant Admin or Sales / Advisor access to additional email addresses. Pending access is bound to the stable authenticated user ID when that address first signs in.

- **Admin:** full lead and user workflow access, staff-role management, account suspension/restoration, and export.
- **Sales / Advisor:** can view member intelligence, add internal notes, assign leads, and update lead and consultation workflow. It cannot manage staff access or suspend accounts.
- **Member:** receives HTTP 403 from admin APIs and cannot render `/admin`.

Authentication passwords, reset flows, identity verification, and sessions remain owned by the platform identity provider. The application cannot view passwords. Administrators direct users to the standard Sign in with ChatGPT recovery flow when credential recovery is needed.

## Data model

Migration `.openai/drizzle/0002_admin_dashboard.sql` adds staff roles, member administration records, internal notes, consultation requests, and an immutable administrative activity log. A Free Member can become a Client by changing lead status to `Client`; this updates `client_tier` on the existing account rather than creating another identity.

Personal data is returned only by role-protected server APIs. CSV export includes business contact and lead fields but excludes authentication secrets, tokens, internal notes, and raw credentials.

## Deterministic lead score

The score is internal and never sent to the normal member dashboard:

- Assessment completed: 20 points
- Automation score of at least 70: 20 points
- 11–50 employees: 8 points; 51 or more: 15 points
- Selected operational problems: 4 points each, capped at 20
- Roadmap generated: 10 points
- ROI calculator completed: 7 points
- Consultation requested: 8 points
- Maximum: 100 points

The score is a prioritization aid, not a prediction or an automated eligibility decision. Staff retain responsibility for reviewing the member’s actual needs.

## Privacy and indexing

Admin pages use `noindex`, `nofollow`, `nocache`, and no-referrer metadata. `/admin` and `/api/` are excluded in `robots.txt` and `/admin` is absent from the public sitemap. Internal notes and lead scores are stored only in admin tables and never included in member API responses.
