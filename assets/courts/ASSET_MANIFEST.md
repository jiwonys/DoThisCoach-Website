# Court logo assets

The DoThis flame face and outline derive deterministically from the existing approved `assets/dothis-logo.png`. DoThis supplies the source mark. No generative imagery or new identity is used.

- `logo-face.png`: original flame colors, neutral icon background removed, 386 × 450 pixels.
- `logo-shape.json`: 70-point exterior outline and 25-point inner opening, normalized against the extracted flame bounds.
- Build source: `scripts/build-court-logo.mjs`, using Sharp and color-mask contour tracing. Run `node scripts/build-court-logo.mjs` to regenerate.
- Placement: two shallow mesh inlays per court, facing the center from opposite halves. The court lines remain above the artwork; inlays receive scene lighting and shadows.
- Display geometry is procedural Three.js in `home.js`; court net heights are exaggerated for legibility at miniature scale.
- Existing pinned Three.js r128 is loaded from cdnjs. It is MIT-licensed. No new npm runtime dependency was added.
