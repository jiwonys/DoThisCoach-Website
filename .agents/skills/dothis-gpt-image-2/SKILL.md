---
name: dothis-gpt-image-2
description: "Use for approved DoThis marketing raster-asset generation or editing through the OpenAI Image API with gpt-image-2 and the existing API key. Not for fabricating app screens, replacing the approved logo, or adding runtime website AI features."
---

# DoThis GPT Image 2 asset production

## Scope and consent
The redesign brief explicitly requests CLI/API mode and reuse of the existing OPENAI_API_KEY. Respect any additional credential confirmation required by the installed key-management workflow. Never create, rotate, print, paste, or commit a key. Check presence without revealing values. Do not dump env files or put secrets on the command line. Missing access blocks image generation, not unrelated website work.

Live image requests require an approved finite batch budget/attempt limit. Propose the smallest useful batch and cost estimate first unless approval already exists. Count retries. Do not buy credits, change billing, or treat monitoring alerts as hard caps.

## Execution
Use the official imagegen skill's explicit CLI/API path. Locate its actual installed image_gen.py and read --help/current documentation; do not assume a global path exists. Pass gpt-image-2 explicitly. Prefer the bundled CLI. A reusable project-local wrapper for manifests/cache/validation is permitted by the redesign brief. Do not modify upstream/system files. If the helper is incompatible, use its supported update path or a reviewed official-SDK adapter authorized by the brief.

Use the direct Image API to choose the exact model. Generate for new raster artwork; edit only an approved existing campaign-image target. Do not silently switch to another model, provider, or subscription bridge. Dry-run first. Dry-run is not a generated image.

Read current official docs:
- https://developers.openai.com/api/docs/guides/image-generation
- https://developers.openai.com/api/docs/models/gpt-image-2
- https://developers.openai.com/api/reference/resources/images/methods/generate/
- https://developers.openai.com/api/reference/resources/images/methods/edit/

Reverify current parameter support. As researched 2026-08-29, gpt-image-2 handles image input fidelity automatically, so omit input_fidelity. Transparent PNG/WebP is available in preview; older helpers may contain stale restrictions. Validate supported sizes and output formats rather than copying old model flags. Verify true alpha when requesting transparency. Do not silently downgrade for transparency.

## Asset policy
Use real approved screenshots as product evidence. Never generate or generatively edit app UI, metrics, testimonials, the existing logo, founder identity, or customer endorsements. Do not ask the image model to render webpage text/buttons. Keep product screens and brand marks separate and composite them deterministically in code or an image-processing step.

Generate only gaps identified in the asset manifest: athlete campaign photography, environmental images, or approved cutout layers. Use realistic adults, correct sport equipment, plausible anatomy/movement, useful negative space, and consistent lighting/palette. Generated models are not real customers or endorsers. Use only authorized reference inputs; do not send personal health data or secrets.

Each brief records intended section, sport, subject/action, location, composition/focal point, desktop/mobile crops, lighting, palette, reference roles, invariants, negative constraints, dimensions/format, output path, and acceptance criteria.

## Local pipeline
Generation is a development-time command, never visitor-time behavior or an automatic build hook. Do not add a public endpoint, browser SDK, or new server. No public-prefixed API key environment variable. No generation dependencies imported into the client bundle.

Save actual returned bytes to real files. Keep prompts/reference hashes/model/settings/usage when returned and approval status in non-public provenance records. Record request IDs when available. Distinguish estimates from actual usage. Do not promise identical new generations from the same prompt; cache already approved outputs instead.

Keep full-resolution masters and drafts outside the deployed directory. Generate responsive derivatives with the existing pipeline, sharp, Pillow, or an equivalent reviewed local tool. Preserve aspect ratio, inspect screen/text fidelity after compression, and strip unnecessary sensitive metadata from public derivatives.

## Acceptance
Open every selected output. Check anatomy, hands, equipment, sport context, crop, space for live HTML text, unwanted text/logos, and alpha/edge quality where applicable. Verify the actual file is used in the rendered page. A failed asset is not replaced with dots, SVG filler, or an invented URL.

Report selected file, model/mode, brief, approval state, and known limitations without exposing credentials.
