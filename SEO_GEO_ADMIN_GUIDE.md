# Nexavoris SEO + GEO Control Center — administrator guide

Admin URL: `https://nexavoris.ai/admin/seo-geo`
Tasks URL: `https://nexavoris.ai/admin/seo-geo/tasks`

The Control Center is private, `noindex`, excluded from the sitemap, and protected by the existing server-side administrator role check. It stores observations in D1 with their source type and the administrator who entered them. Never enter passwords, browser credentials, OAuth tokens, private assessment answers, or unsupported estimates.

## Google rankings

Open **Google Search**, select a target keyword, and record the date, observed position, target URL, actual ranking URL, result page, country, language, device, and notes. Use a neutral or incognito search where possible. Manual observations are labeled `MANUAL GOOGLE SEARCH` and remain separate from Search Console average position. New observations append to history.

## Google Search Console CSV

Export Performance results and use these headers:

```csv
date,query,page,clicks,impressions,ctr,position,country,device
```

Open **Google Search**, choose **Import Search Console CSV**, and select the export. The importer validates required values, accepts up to 5,000 rows per upload, appends history, and labels rows `GOOGLE SEARCH CONSOLE`. A future API connection must use server-side Google OAuth and hosted secrets, never repository credentials.

## Google indexing

Open **Indexing**. Major public routes are preloaded. Use Search Console URL Inspection to set Yes, No, or Unknown; record Google's selected canonical, date, and notes. The table flags expected URLs reported as not indexed, canonical mismatches, and missing sitemap entries.

## ChatGPT, Google AI, Bing, and Copilot

Open the corresponding section and record the exact prompt/query, date, mention status, citation status, cited URL, description accuracy, competitors, and screenshot/reference notes. Use fresh sessions and preserve enough context to reproduce the observation. Mention and citation are separate fields. Bing position is optional and should include relevant location/device context in notes.

## Backlinks and authority profiles

Open **Backlinks**. Enter the referring domain, source URL, target Nexavoris URL, discovery date, Follow/NoFollow/Unknown, industry, status, and evidence notes. Do not manufacture authority numbers. Track Google Business Profile, LinkedIn, GitHub, Bing Places, directories, associations, partner profiles, and media mentions as authority profiles.

## Conversions

The funnel uses existing member events only when their context explicitly identifies an organic source such as Google, Bing, or organic search. Unknown acquisition sources are excluded rather than guessed.

## Scores and recommendations

Technical/content readiness remains separate from actual visibility. Scorecards display **Insufficient data** until their evidence threshold is met. Striking-distance opportunities require a latest observed Google position from 8 through 30. Recommendations are deterministic guidance, not ranking guarantees.

## CSV export and privacy

Export links return keyword history, Search Console metrics, GEO tests, and backlinks. Exports never include passwords, authentication tokens, or private member assessment answers. Store exported files in approved company storage.

## Collection schedule

Weekly:

- Import Google Search Console performance.
- Record target-keyword positions with location, language, and device.
- Check important URL indexing and canonical selection.
- Review striking-distance opportunities and attributed conversions.

Monthly:

- Run the strategic ChatGPT and Google AI test sets.
- Check Bing rankings and Copilot mentions/citations.
- Review backlinks and external authority profiles.

Avoid daily ranking checks. Weekly and monthly intervals provide more useful trends while reducing short-term volatility noise.

## CSV templates

Starter templates are stored in `admin-csv-templates/` for Search Console, manual Google rankings, GEO tests, backlinks, and Bing/Copilot tests. Search Console CSV is importable in the first release. The other templates provide consistent collection and are ready for future batch import; their corresponding forms and CSV exports work now.
