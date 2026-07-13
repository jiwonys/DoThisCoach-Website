# Article CTA Tracking Plan

## Current Implementation

Every App Store CTA includes:

- `data-article-slug`: stable article identifier
- `data-cta-location`: `header`, `mid-article`, or `article-end`

`articles/article.js` dispatches a local `dothis:cta` event with:

```json
{
  "event": "article_app_store_click",
  "article": "progressive-overload-guide",
  "location": "mid-article"
}
```

If a privacy-reviewed analytics provider is added later, it can listen for this event or consume the optional `dataLayer` event. The website currently sends no CTA event to a third party and collects no personal data from these clicks.

## Recommended Measurements

- Article landing sessions by slug
- Search query and landing page from Google Search Console
- App Store CTA clicks by slug and location
- App Store product-page views and downloads using App Store Connect campaign links if configured

Do not add fingerprinting, health-profile collection, or cross-site behavioral advertising to measure article performance.
