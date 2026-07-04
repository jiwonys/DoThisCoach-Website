# DoThisCoach Website

Static GitHub Pages website for DoThis.

## Local Preview

Open `index.html` in a browser, or run a tiny static server:

```bash
python -m http.server 8080
```

## Deployment

This repository deploys to GitHub Pages through `.github/workflows/pages.yml`.

Required GitHub repository setting:

- Settings -> Pages -> Build and deployment -> Source: GitHub Actions

The custom domain is configured through `CNAME`:

```text
dothiscoach.com
```

DNS should point `dothiscoach.com` to GitHub Pages.
