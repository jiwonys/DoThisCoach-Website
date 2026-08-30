# DoThis redesign tooling

Verified 2026-08-29 in `/Users/jiwonkim/Desktop/DoThis/DoThisCoach-Website`.

## Website workspace

- Stack: static HTML, CSS, and JavaScript.
- Package manager: npm 10.9.0.
- Node.js available in the current shell: 22.11.0.
- Hosting: GitHub Pages via `.github/workflows/pages.yml` and `CNAME`.
- Production homepage: `index.html`, `home.css`, and `home.js`.
- Generated article/comparison content remains owned by existing scripts.

## Installed design and QA tools

- Impeccable CLI 2.3.2 with skill bundle 4.1.1 from `https://github.com/pbakaus/impeccable`, installed project-locally under `.agents/skills/impeccable` and verified by `npx impeccable skills check`.
- Playwright CLI 0.1.18 from `https://github.com/microsoft/playwright-cli`, executable at `~/.local/bin/playwright-cli`.
- Playwright CLI skill from the same upstream repository, copied to `.agents/skills/playwright-cli`.
- Vercel `web-design-guidelines` from `https://github.com/vercel-labs/agent-skills`, copied to `.agents/skills/web-design-guidelines`.
- OpenAI Developer Docs MCP configured globally at `https://developers.openai.com/mcp` and verified enabled.
- `@playwright/test`, `@axe-core/playwright`, Lighthouse, and Sharp installed as website development dependencies.
- Chromium and WebKit installed and launch-verified.
- Python 3.14.5 isolated in `.venv-design`; OpenAI SDK 3.6.0 and Pillow 12.3.0 installed.
- `cwebp` 1.6.0 available for responsive WebP derivatives.
- Archivo Black and Work Sans are self-hosted under `assets/fonts/` to remove runtime font-CDN dependencies. Both Google Fonts source records identify the families as SIL Open Font License fonts; license copies ship beside the files.
- Second Awakening adds self-hosted Cormorant Garamond for its high-contrast dawn voice, with its SIL Open Font License copy beside the WOFF2 files.

## OpenAI image-production preflight

- Existing `OPENAI_API_KEY`: present in an ignored local file; value was never printed.
- User explicitly requested reuse of the existing key and model `gpt-image-2`.
- Official OpenAI model and image-generation documentation was fetched on 2026-08-29.
- Installed official helper: `/Users/jiwonkim/.codex/skills/.system/imagegen/scripts/image_gen.py`.
- CLI help verified for `generate`, `generate-batch`, and `edit`; `generate` exposes explicit `--model`, `--size`, `--quality`, output, dry-run, and prompt-structure controls.
- No paid image request has been made for this redesign.
- Existing approved assets cover Phase 1, so no image-generation gap currently blocks prototypes.
- If later art requires new campaign photography, propose the smallest finite batch and current cost before any request.

## Verification notes

- npm reported 20 dependency vulnerabilities after QA tooling installation: 16 moderate and 4 high. No automatic or breaking audit fix was applied.
- Playwright rendered live DoThis, Subscrr, Apple App Store, and all six live acquisition redirects.
- Live route checks preserved every expected `ppid` value.
- A browser check confirms constructed destinations, not the exact gallery ultimately displayed on a physical iPhone.
- Public packaging now writes `_site/` from an explicit allowlist, keeping `.agents`, design documentation, prototypes, local environments, and generation tooling outside the deployed artifact.
- Final Second Awakening Lighthouse 12.8.2 mobile lab results on the local production artifact: Performance 97, Accessibility 100, Best Practices 100, SEO 100; FCP 0.9s, LCP 2.6s, TBT 0ms, CLS 0.
