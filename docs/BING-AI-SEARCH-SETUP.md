# Bing and AI-search setup

No Bing property access was available. No submission, indexing or AI citation is claimed.

1. Add `https://yudaro.com/` in Bing Webmaster Tools; import a verified Google property or follow Bing's ownership procedure.
2. For meta verification, set `BING_SITE_VERIFICATION` to the actual token in Vercel Production and redeploy. Inspect `msvalidate.01`, then verify.
3. Submit `https://yudaro.com/sitemap.xml`. Inspect canonical URL selection, crawl/index reports and representative new pages. Review intentional translated noindex exclusions separately from errors.
4. Review Bing AI Performance where available for citation and grounding visibility. Record referenced URLs and query themes; citations fluctuate and are not guaranteed.
5. Second-pass update: IndexNow is implemented with a dedicated ownership proof, persistent content checkpoint and change-only notifier. Follow INDEXNOW.md and the final receipt in SEO-GEO-SECOND-PASS.md. A notification is not evidence of indexing.
6. Keep public pages crawlable and server rendered, facts consistent, titles explicit, sources attributable and dates accurate. Use distinct service and industry content, accessible tables and answer-first sections. Avoid keyword stuffing, mass doorway cities, hidden AI instructions or fabricated authority.
7. `llms.txt` is a supplementary human-readable directory only. It does not replace robots, sitemap, HTML content, permission controls or established SEO, and no special ranking advantage is claimed.
8. Decide any AI training crawler restrictions separately as a business policy. Public search access currently follows the normal robots rules; private paths remain protected by server authentication rather than relying on robots.

Sources: [Bing Webmaster Guidelines](https://www.bing.com/webmasters/help/bing-webmaster-guidelines-30fba23a), [Bing AI Performance](https://blogs.bing.com/webmaster/February-2026/Introducing-AI-Performance-in-Bing-Webmaster-Tools-Public-Preview), [Google AI feature guidance](https://developers.google.com/search/docs/appearance/ai-features).
