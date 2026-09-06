# Website sport catalog verification

Verified 2026-09-06 against the app's canonical `lib/sportCatalog.ts` (`SPORT_CATALOG`). The onboarding sport screen, profile editor, and SportWheelPicker consume this catalog. Previously saved custom values may remain in individual profiles; they are not advertised as standard picker options.

Website ticker now uses the exact standard picker labels in source order:

1. Basketball
2. Tennis
3. Pickleball
4. Soccer
5. Volleyball
6. Beach Volleyball
7. Baseball
8. Softball
9. Badminton
10. Bodybuilding
11. General Athlete

Removed unsupported standard-picker claims: Climbing, Hockey, Flag football, Rugby, Ultimate. Added the omitted Beach Volleyball, Baseball, Bodybuilding, and General Athlete options. Existing sport-specific App Store redirect routes remain unchanged.

Planner card tracks now have a 124px minimum width at every viewport, keeping overflow inside the horizontally scrolling planner. Title text has safe wrapping as a fallback. Browser regression checks measure actual text glyph bounds after every game-day selection, including the previously overflowing Conditioning title, at 360, 390, 768, 900, and 1440px widths.
