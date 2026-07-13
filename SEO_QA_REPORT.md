# DoThis Training Library QA Report

Date: 2026-07-13

## Local URLs verified

- `/articles/beginner-gym-workout-plan-3-day/`
- `/articles/full-body-dumbbell-workout/`
- `/articles/upper-lower-workout-split/`
- `/articles/push-pull-legs-routine/`
- `/articles/strength-training-weight-loss-preserve-muscle/`
- `/articles/body-recomposition-workout-plan/`
- `/articles/progressive-overload-guide/`
- `/articles/30-minute-workout-busy-professionals/`
- `/articles/volleyball-strength-conditioning-workout/`
- `/articles/knee-friendly-lower-body-workout/`

## Automated checks

- `npm run build:articles`: passed; generated 10 articles, 10 social cards, RSS, and sitemap.
- `npm run check:site`: passed; checked 15 HTML pages, 10 articles, 15 sitemap URLs, metadata uniqueness, canonical URLs, JSON-LD parsing, and local links/assets.
- `html-validate`: passed for the homepage, article index, and all 10 article pages.
- Exercise validation: passed against the app's canonical exercise catalog during the article build.
- External sources: all 10 authoritative source URLs returned HTTP 200 after redirects.
- App Store CTA: returned HTTP 200 after redirects.

## Browser checks

- Inspected the article index, homepage article section, and representative long articles on desktop and 390 x 844 mobile viewports.
- Automated all 10 articles at 390 x 844: all returned HTTP 200 with no horizontal page overflow.
- Responsive workout tables remain contained and horizontally scrollable on small screens.
- FAQ disclosure interaction works.
- Related-article navigation works.
- Browser console showed no errors.
- CTA event emitted only `article`, `location`, and a fixed event name; no personal data is collected.

## Lighthouse

Representative URL: `/articles/beginner-gym-workout-plan-3-day/`

| Category | Score |
| --- | ---: |
| Performance | 91 |
| Accessibility | 100 |
| Best Practices | 100 |
| SEO | 100 |

## Publication status

- Not committed.
- Not deployed.
- Sitemap not submitted to search engines.
- Search Console steps remain in `SEARCH_CONSOLE_CHECKLIST.md` and should run only after the pages are deployed and manually approved.

## Remaining risks

- Keyword opportunity is based on live search-result and intent review, not paid keyword-volume data.
- SVG social cards should be tested in the final hosting environment because some social crawlers prefer raster Open Graph images.
- Fitness content should be periodically reviewed as source guidance changes.
