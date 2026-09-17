# Sport coaching homepage — September 17, 2026

## Request and scope

The user requested “redesign and deploy our website” after discussing acquisition for the live iOS app. The audience is adult recreational athletes whose gym routines feel disconnected from their sport. Beach volleyball is the founder's origin story, not a limit on the product's audience. This request authorizes the redesign and deployment; historical concept and publication approval gates are superseded for this task.

The latest production source is commit `7311571`. Work takes place in an isolated checkout so the original local homepage drafts remain intact. Existing articles, comparisons, partner functionality, legal pages, and all six App Store redirects are preserved.

## Direction contract

**THESIS:** Give recreational athletes a personal strength-coaching direction that connects their gym work to the sport they love.

**OWN-WORLD:** A community sports club's printed season program: clear bold lettering, daylight paper, evergreen ink, clay marking match day, and real training evidence. The cultural setting is an adult who plays after work and trains around that life. No synthetic spokesperson, decorative 3D scene, fabricated app screen, or performance guarantee is needed.

**STORY:** Benefit and real app evidence; a concrete weekly training situation; sport-specific examples; workouts, Coach, progress, and nutrition; the founder's beach volleyball origin; transparent free preview and founder offer; questions; practical training guides; download.

**FIRST VIEWPORT:** At 1440px, a large three-line athletic headline occupies the left half, with a short product explanation and a visible iPhone action. The right half shows two unmodified real app captures on a pale sage surface. On mobile, headline, explanation, and action precede the full-width app evidence. The iOS action is visible before the visitor needs to read the rest of the story.

**FORM:** Seed `6cf25c89`, assigned grounded candidate four. Native HTML, self-hosted licensed fonts, a pale background, bold Archivo Black display type and readable Work Sans body text. A seven-day schedule and three training-load choices demonstrate user control. Sport links coordinate truthful copy, approved sport-specific App Store boards, and existing acquisition destinations. Feature tabs reveal actual app screenshots. Native details elements provide no-JavaScript navigation and FAQ behavior.

**SIGNATURE:** The week is the starting point. Thursday remains match day while the visitor chooses Sports Prep, Lighter Workout, or Full Workout. The result is explicitly illustrative, with no promise that the app automatically moves a user's calendar or guarantees recovery.

## Design decisions and critique

- Palette: paper `#F6F8F5`, white `#FFFFFF`, ink `#192F2B`, pine `#245B4A`, sage `#E0E9DF`, clay `#B44F2E`. Pine carries primary actions; clay identifies the example match and visible focus.
- Typography: licensed local Archivo Black for display; Work Sans for body, navigation, and controls. No external font request is needed.
- Composition: wide editorial columns alternate with an evergreen schedule section and a pale app walkthrough. Avoid repeating identical feature cards.
- Initial critique: a conventional dark fitness hero would repeat the existing site and the rejected synthetic ad direction. A light community-sport program makes the real interface and founder's practical problem more prominent.
- The Impeccable seed assigned candidate four (key `6cf25c89`); the Windows process exited with a libuv closing assertion after printing its assignment. Grounded candidates considered: league fixture sheet, training logbook, local sports editorial, community club season program, courtside coaching notes, tournament entry form, and gym programming board. Candidate four supplies the selected visual world.
- Challenger verdicts: monochrome product marketing is competitive on product clarity but loses sporting identity; retain its discipline of pairing claims with visible proof. Drum-machine steps are declined on clarity and audience identification; retain precise selected-state behavior without instrument styling. Floating pigment, folded shells, and alphabet weather are declined because they displace the product evidence; retain their commitment to a single coherent visual system rather than borrowing motifs.
- An alternate compact, centered club-poster hero is compared in browser evidence before committing to the split program layout. The split layout keeps the explanation and product evidence visible together at desktop width.

## Product and asset evidence

Existing manifest classifies `assets/screenshots/` as real simulator captures, and `assets/sports/*-workout.webp` as approved App Store boards. The hero explicitly labels the beach volleyball example, rather than relabeling it as another sport. The general athlete state uses a neutral native Progress screen. The five named sports use their matching App Store boards, shown whole without a second phone frame. Approved logo assets remain unchanged.

The live App Store listing was checked on September 17, 2026 for shipped features and the no-charge seven-day preview. It lists standard US prices of $12.99 monthly and $119.99 yearly. Founder prices come from the user's supplied offer and existing production site, with availability and local price confirmed in the app. There is no invented remaining-spots counter or lifetime-price promise.

The founder's first-person story is based on this conversation: beach volleyball motivation, eight years of gym training, six years of software engineering, specific workout requests, and workout tracking. Medical rehabilitation is not marketed as a shipping capability.

## Release checks

Check the packaged `_site` artifact at 360, 390, 768, and 1440px; six sport states; invalid/default query handling; history; keyboard tabs; match-day choices; menu and FAQ; image loading failures; no-JavaScript behavior; reduced motion; App Store redirect IDs; legacy fragments; axe; and Lighthouse. Store browser evidence in the local QA directory and a concise release report under `docs/design/`.
