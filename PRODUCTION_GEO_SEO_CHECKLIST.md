# Nexavoris Production GEO + SEO Checklist

Production domain: https://nexavoris.ai

## Search engines

- [ ] Verify the `https://nexavoris.ai` domain property in Google Search Console.
- [ ] Submit `https://nexavoris.ai/sitemap.xml` in Google Search Console.
- [ ] Run URL Inspection for `/`, `/ai-solutions`, `/erp-solutions`, `/resources/private-ai`, and one industry resource.
- [ ] Confirm Google selected the apex-domain canonical after the corrected release is published.
- [ ] Verify the site in Bing Webmaster Tools and submit the same sitemap.
- [ ] Review indexing/exclusion reports after recrawl; member, admin, API, and authentication paths should remain excluded.

## Domain and delivery

- [ ] Add and validate `www.nexavoris.ai`; configure one permanent redirect to `https://nexavoris.ai` if `www` is retained.
- [ ] Confirm `http://nexavoris.ai/*` redirects directly to the equivalent HTTPS apex URL with a permanent redirect where the hosting platform permits it.
- [ ] Confirm `https://www.nexavoris.ai/*` has a valid certificate before enabling its redirect.
- [ ] Verify no legacy ChatGPT Sites hostname is selected as canonical after publication.
- [ ] Verify the real production 404 page returns HTTP 404 and does not redirect to the homepage.
- [ ] Review production response headers, including CSP/security headers and cache policy.

## Crawlers and monitoring

- [ ] Confirm Cloudflare/Sites managed firewall and bot controls allow verified Googlebot, Bingbot, and OAI-SearchBot.
- [ ] Review server logs for successful crawler requests to public resources and no private-data responses.
- [ ] Test the live robots rules against public resources and `/account`, `/admin`, `/api/`, and authentication routes.
- [ ] Confirm no crawler challenge, CAPTCHA, or rate-limit rule affects public marketing pages.

## Performance

- [ ] Run PageSpeed Insights for the homepage, Private AI, Odoo ERP, Industries, and one resource article on mobile and desktop.
- [ ] Monitor real Core Web Vitals in Search Console after enough field traffic exists.
- [ ] Re-encode the oversized logo, social image, and largest Open WebUI screenshot if PageSpeed identifies them as material.
- [ ] Check layout shift and interaction latency on the mobile navigation and industry-story dialog.

## Content and entity validation

- [ ] Confirm whether each industry story is a real anonymized customer account or a representative/composite scenario, and label it accordingly.
- [ ] Validate Organization and resource Article JSON-LD with Google Rich Results Test or Schema.org Validator.
- [ ] Confirm the business name, address, telephone, and email match external business profiles.
- [ ] Review Search Console queries for cannibalization before creating any additional SEO pages.

