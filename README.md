# DoThisCoach Website

GitHub Pages website for DoThis. The marketing homepage uses a progressively enhanced React Three Fiber experience while articles, support, privacy, and terms remain lightweight static pages.

## Local Preview

Install dependencies and run Vite:

```bash
npm ci
npm run dev
```

The homepage keeps its essential copy, navigation, product information, pricing terms, safety guidance, and App Store links in semantic HTML. WebGL is a deferred enhancement rather than the source of required content.

## Verification

```bash
npm run check:site
npm run lint:html
npm run check:experience
npm run build:site
npm run check:dist
npm run preview:site
```

`build:site` compiles the homepage into `dist` and copies all article, legal, support, feed, sitemap, robots, CNAME, and shared static assets into the deployable artifact.

## Deployment

This repository deploys to GitHub Pages through `.github/workflows/pages.yml`. A push to `main` installs locked dependencies, builds the production artifact, verifies `dist`, and uploads only `dist` to Pages.

Required GitHub repository setting:

- Settings -> Pages -> Build and deployment -> Source: GitHub Actions

The custom domain is configured through `CNAME`:

```text
dothiscoach.com
```

DNS should point `dothiscoach.com` to GitHub Pages.
