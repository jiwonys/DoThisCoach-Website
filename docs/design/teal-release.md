# Supplied teal homepage release

User requested adopting the color scheme, design, and content of `dothis-website.html` and pushing the website. The supplied page is used directly, with its inline CSS and JavaScript, rather than recreating its visual design.

Integration retains existing Training Library, Compare, Partners, Support, Privacy, and Terms destinations; the active Founding 200 offer; fixed sport acquisition routes; and metadata. Accessibility fixes improve secondary text contrast, primary navigation contrast, heading order, and planner button focus/names. The planner is labeled illustrative. Non-JavaScript readers retain visible page content and native navigation.

Checks: static site validation passes 63 pages; 165 planner/navigation/acquisition/accessibility checks pass across 360, 390, 768, and 1440px widths. The seven days can each be selected, and the primer/recovery schedule remains coherent. No page horizontal overflow or serious/critical axe violations were found. Desktop and mobile screenshots were inspected.

Initial Lighthouse 12.8.2 mobile measurements: performance 88, accessibility 98, best practices 100, SEO 100; LCP 3.0s, CLS 0.061. The two accessibility findings (heading order and button-name mismatch) were subsequently fixed. These lab scores are not claims about real-user Core Web Vitals.

This release was built in an isolated git worktree because another task was modifying the original homepage files at the same time. No unrelated experimental assets or edits are included.
