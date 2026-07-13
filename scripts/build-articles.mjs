import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { articles, sources } from "./article-content.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const appRoot = path.resolve(root, "../DoThis");
const catalogPath = path.join(appRoot, "docs/EXERCISE_CATALOG_LIST.md");
const appStoreUrl = "https://apps.apple.com/us/app/dothis-ai-fitness-coach/id6771322181";
const siteUrl = "https://dothiscoach.com";

const escapeHtml = (value = "") => String(value)
  .replaceAll("&", "&amp;")
  .replaceAll("<", "&lt;")
  .replaceAll(">", "&gt;")
  .replaceAll('"', "&quot;")
  .replaceAll("'", "&#039;");

const cleanText = (value = "") => String(value).replace(/<[^>]+>/g, "").trim();
const articleBySlug = new Map(articles.map((article) => [article.slug, article]));

const catalogText = fs.existsSync(catalogPath)
  ? fs.readFileSync(catalogPath, "utf8").toLowerCase()
  : "";

const exerciseNames = new Set();
for (const article of articles) {
  for (const row of article.warmup ?? []) exerciseNames.add(row.exercise);
  for (const session of article.sessions ?? []) {
    for (const row of session.exercises ?? []) exerciseNames.add(row.exercise);
  }
  for (const row of article.alternatives ?? []) {
    exerciseNames.add(row.exercise);
    exerciseNames.add(row.alternative);
  }
}

if (!catalogText) {
  console.warn(`Catalog not found at ${catalogPath}; exercise validation skipped.`);
} else {
  const missing = [...exerciseNames].filter((name) => !catalogText.includes(`- ${name.toLowerCase()} (`));
  if (missing.length) {
    throw new Error(`Article exercises missing from DoThis catalog:\n- ${missing.join("\n- ")}`);
  }
}

const renderRows = (rows, columns) => rows.map((row) => `
  <tr>${columns.map((column) => `<${column.header ? "th scope=\"row\"" : "td"}>${column.render(row)}</${column.header ? "th" : "td"}>`).join("")}</tr>`).join("");

const renderProgramTable = (rows, label) => `
  <section class="table-shell" aria-label="${escapeHtml(label)}" tabindex="0">
    <table>
      <thead><tr><th scope="col">Exercise</th><th scope="col">Sets</th><th scope="col">Target</th><th scope="col">Rest</th><th scope="col">Coaching note</th></tr></thead>
      <tbody>${renderRows(rows, [
        { header: true, render: (row) => `<span class="exercise-name">${escapeHtml(row.exercise)}</span>` },
        { render: (row) => escapeHtml(row.sets) },
        { render: (row) => escapeHtml(row.target) },
        { render: (row) => escapeHtml(row.rest) },
        { render: (row) => escapeHtml(row.note) },
      ])}</tbody>
    </table>
  </section>`;

const renderSource = (sourceId) => {
  const source = sources[sourceId];
  if (!source) throw new Error(`Unknown source id: ${sourceId}`);
  return `<li><a href="${escapeHtml(source.url)}" rel="noreferrer">${escapeHtml(source.title)}</a><span>${escapeHtml(source.publisher)}</span></li>`;
};

const renderCta = (article, location) => `
  <section class="article-cta">
    <div>
      <p class="eyebrow">Make the template fit your life</p>
      <h2>${escapeHtml(article.cta.title)}</h2>
      <p>${escapeHtml(article.cta.body)}</p>
    </div>
    <a class="primary-button article-download" href="${appStoreUrl}" data-article-slug="${escapeHtml(article.slug)}" data-cta-location="${location}">${escapeHtml(article.cta.label)}</a>
  </section>`;

const renderSocialImage = (article) => {
  const words = article.socialTitle.split(" ");
  const lines = [];
  let line = "";
  for (const word of words) {
    if (`${line} ${word}`.trim().length > 28) {
      lines.push(line);
      line = word;
    } else line = `${line} ${word}`.trim();
  }
  if (line) lines.push(line);
  const text = lines.slice(0, 3).map((part, index) => `<text x="88" y="${285 + index * 86}" class="title">${escapeHtml(part)}</text>`).join("");
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630" role="img" aria-labelledby="title desc">
  <title id="title">${escapeHtml(article.title)}</title><desc id="desc">DoThis training article cover</desc>
  <rect width="1200" height="630" fill="#f7fafc"/><rect x="48" y="48" width="1104" height="534" rx="28" fill="#ffffff" stroke="#dce5ea" stroke-width="3"/>
  <circle cx="1020" cy="160" r="112" fill="#dffcf0"/><circle cx="1020" cy="160" r="68" fill="#10b981" opacity=".16"/>
  <path d="M965 160h110M1020 105v110" stroke="#047857" stroke-width="20" stroke-linecap="round"/>
  <text x="88" y="130" class="brand">DOTHIS TRAINING LIBRARY</text>${text}
  <text x="88" y="548" class="url">dothiscoach.com/articles</text>
  <style>.brand{font:800 25px system-ui;letter-spacing:4px;fill:#047857}.title{font:900 66px system-ui;fill:#101320}.url{font:700 25px system-ui;fill:#687084}</style>
  </svg>`;
};

const renderArticle = (article) => {
  const canonical = `${siteUrl}/articles/${article.slug}/`;
  const related = article.related.map((slug) => {
    const item = articleBySlug.get(slug);
    if (!item) throw new Error(`Unknown related article: ${slug}`);
    return `<a class="related-link" href="../${item.slug}/"><span>${escapeHtml(item.category)}</span><strong>${escapeHtml(item.title)}</strong></a>`;
  }).join("");
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        headline: article.title,
        description: article.description,
        image: `${siteUrl}/assets/articles/${article.slug}.svg`,
        datePublished: article.published,
        dateModified: article.modified,
        mainEntityOfPage: canonical,
        author: { "@type": "Organization", name: "DoThis Editorial Team", url: siteUrl },
        publisher: { "@type": "Organization", name: "DoThis Labs LLC", logo: { "@type": "ImageObject", url: `${siteUrl}/assets/dothis-logo.png` } },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: `${siteUrl}/` },
          { "@type": "ListItem", position: 2, name: "Articles", item: `${siteUrl}/articles/` },
          { "@type": "ListItem", position: 3, name: article.title, item: canonical },
        ],
      },
    ],
  };

  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8"/><meta name="viewport" content="width=device-width, initial-scale=1"/>
  <title>${escapeHtml(article.seoTitle)}</title>
  <meta name="description" content="${escapeHtml(article.description)}"/>
  <link rel="canonical" href="${canonical}"/>
  <meta property="og:type" content="article"/><meta property="og:title" content="${escapeHtml(article.title)}"/><meta property="og:description" content="${escapeHtml(article.description)}"/><meta property="og:url" content="${canonical}"/><meta property="og:image" content="${siteUrl}/assets/articles/${article.slug}.svg"/>
  <meta name="twitter:card" content="summary_large_image"/><meta name="twitter:title" content="${escapeHtml(article.title)}"/><meta name="twitter:description" content="${escapeHtml(article.description)}"/><meta name="twitter:image" content="${siteUrl}/assets/articles/${article.slug}.svg"/>
  <link rel="icon" href="../../assets/dothis-logo.png"/><link rel="stylesheet" href="../../styles.css"/><link rel="stylesheet" href="../article.css"/><link rel="alternate" type="application/rss+xml" title="DoThis Training Library" href="../../feed.xml"/>
  <script type="application/ld+json">${JSON.stringify(jsonLd).replaceAll("<", "\\u003c")}</script>
</head>
<body class="article-page">
  <header class="site-header article-header"><a class="brand" href="../../" aria-label="DoThis home"><img src="../../assets/dothis-logo.png" alt=""/><span>DoThis</span></a><nav aria-label="Main navigation"><a href="../">Training library</a><a href="../../#features">App features</a><a href="../../support.html">Support</a></nav><a class="nav-cta" href="${appStoreUrl}" data-article-slug="${escapeHtml(article.slug)}" data-cta-location="header">Try DoThis</a></header>
  <main>
    <article>
      <header class="article-hero">
        <nav class="breadcrumbs" aria-label="Breadcrumb"><a href="../../">Home</a><span aria-hidden="true">/</span><a href="../">Articles</a><span aria-hidden="true">/</span><span>${escapeHtml(article.category)}</span></nav>
        <p class="eyebrow">${escapeHtml(article.category)}</p><h1>${escapeHtml(article.title)}</h1><p class="article-deck">${escapeHtml(article.summary)}</p>
        <div class="article-meta"><span>Published <time datetime="${article.published}">${article.displayDate}</time></span><span>Updated <time datetime="${article.modified}">${article.displayDate}</time></span><span>${article.readingMinutes} min read</span></div>
        <div class="answer-box"><strong>The short answer</strong><p>${escapeHtml(article.directAnswer)}</p></div>
      </header>
      <div class="article-layout">
        <aside class="article-toc" aria-label="On this page"><strong>On this page</strong><a href="#who">Who it is for</a><a href="#schedule">Weekly schedule</a><a href="#warmup">Warm-up</a><a href="#workouts">The workouts</a><a href="#alternatives">Alternatives</a><a href="#progression">Progression</a><a href="#recovery">Recovery</a><a href="#questions">Questions</a><a href="#sources">Sources</a></aside>
        <div class="article-body">
          <section id="who"><h2>Who this plan is for</h2><p>${escapeHtml(article.whoIntro)}</p><ul class="check-list">${article.forWhom.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul></section>
          <section id="schedule"><h2>Weekly schedule</h2><p>${escapeHtml(article.scheduleIntro)}</p><section class="table-shell schedule-table" aria-label="Weekly schedule" tabindex="0"><table><thead><tr><th scope="col">Day</th><th scope="col">Plan</th><th scope="col">Purpose</th></tr></thead><tbody>${renderRows(article.schedule, [{ header: true, render: (row) => escapeHtml(row.day) }, { render: (row) => escapeHtml(row.plan) }, { render: (row) => escapeHtml(row.purpose) }])}</tbody></table></section></section>
          <section id="warmup"><h2>Warm-up</h2><p>${escapeHtml(article.warmupIntro)}</p>${renderProgramTable(article.warmup, `${article.title} warm-up`)}</section>
          <section id="workouts"><h2>${escapeHtml(article.workoutHeading)}</h2><p>${escapeHtml(article.workoutIntro)}</p>${article.sessions.map((session) => `<section class="session"><h3>${escapeHtml(session.name)}</h3><p>${escapeHtml(session.intro)}</p>${renderProgramTable(session.exercises, session.name)}</section>`).join("")}</section>
          ${renderCta(article, "mid-article")}
          <section id="alternatives"><h2>Exercise and equipment alternatives</h2><p>Use the substitution in the same row, keep the same set and repetition target, and reduce the load while learning the new movement.</p><section class="table-shell" aria-label="Exercise alternatives" tabindex="0"><table><thead><tr><th scope="col">Planned exercise</th><th scope="col">Alternative</th><th scope="col">Use it when</th></tr></thead><tbody>${renderRows(article.alternatives, [{ header: true, render: (row) => escapeHtml(row.exercise) }, { render: (row) => escapeHtml(row.alternative) }, { render: (row) => escapeHtml(row.when) }])}</tbody></table></section></section>
          <section id="progression"><h2>Progression rules</h2><p>${escapeHtml(article.progressionIntro)}</p><ol class="number-list">${article.progression.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ol></section>
          <section id="recovery"><h2>Weekly placement and recovery</h2><ul>${article.recovery.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul></section>
          <section id="questions"><h2>Common programming questions</h2><div class="faq-list">${article.faq.map((item) => `<details><summary>${escapeHtml(item.question)}</summary><p>${escapeHtml(item.answer)}</p></details>`).join("")}</div></section>
          <section class="safety-note"><h2>Safety and limitations</h2><p>${escapeHtml(article.safety)}</p><p>This article provides general wellness education, not medical advice, diagnosis, rehabilitation, or individualized treatment.</p></section>
          <section id="sources"><h2>Sources</h2><p class="editorial-note">Prepared by the DoThis Editorial Team using the cited evidence and exercise names verified against the DoThis catalog. No professional clinical review is claimed.</p><ol class="source-list">${article.sourceIds.map(renderSource).join("")}</ol></section>
          ${renderCta(article, "article-end")}
          <section class="related"><h2>Related training guides</h2><div>${related}</div></section>
        </div>
      </div>
    </article>
  </main>
  <footer class="site-footer"><div class="footer-brand"><img src="../../assets/dothis-logo.png" alt=""/><span>DoThis</span></div><div class="footer-links"><a href="../">Articles</a><a href="../../privacy.html">Privacy</a><a href="../../terms.html">Terms</a><a href="../../support.html">Support</a></div><p>Copyright <span id="year"></span> DoThis Labs LLC. All rights reserved.</p></footer>
  <script src="../../script.js"></script><script src="../article.js"></script>
</body></html>`;
};

const outDir = path.join(root, "articles");
const assetDir = path.join(root, "assets", "articles");
fs.mkdirSync(outDir, { recursive: true });
fs.mkdirSync(assetDir, { recursive: true });

for (const article of articles) {
  const dir = path.join(outDir, article.slug);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, "index.html"), renderArticle(article));
  fs.writeFileSync(path.join(assetDir, `${article.slug}.svg`), renderSocialImage(article));
}

const cards = articles.map((article) => `<article class="library-card"><a href="./${article.slug}/"><span>${escapeHtml(article.category)}</span><h2>${escapeHtml(article.title)}</h2><p>${escapeHtml(article.description)}</p><strong>Read the guide <span aria-hidden="true">→</span></strong></a></article>`).join("");
const itemList = articles.map((article, index) => ({ "@type": "ListItem", position: index + 1, url: `${siteUrl}/articles/${article.slug}/`, name: article.title }));
fs.writeFileSync(path.join(outDir, "index.html"), `<!doctype html><html lang="en"><head><meta charset="utf-8"/><meta name="viewport" content="width=device-width, initial-scale=1"/><title>Workout Plans and Training Guides | DoThis</title><meta name="description" content="Practical, evidence-informed workout plans, training splits, progression guides, and exercise alternatives from DoThis."/><link rel="canonical" href="${siteUrl}/articles/"/><meta property="og:type" content="website"/><meta property="og:title" content="DoThis Training Library"/><meta property="og:description" content="Complete workout plans and practical progression guides."/><meta property="og:url" content="${siteUrl}/articles/"/><meta property="og:image" content="${siteUrl}/assets/articles/beginner-gym-workout-plan-3-day.svg"/><link rel="icon" href="../assets/dothis-logo.png"/><link rel="stylesheet" href="../styles.css"/><link rel="stylesheet" href="article.css"/><link rel="alternate" type="application/rss+xml" title="DoThis Training Library" href="../feed.xml"/><script type="application/ld+json">${JSON.stringify({ "@context": "https://schema.org", "@type": "ItemList", name: "DoThis Training Library", itemListElement: itemList })}</script></head><body class="article-page"><header class="site-header article-header"><a class="brand" href="../"><img src="../assets/dothis-logo.png" alt=""/><span>DoThis</span></a><nav aria-label="Main navigation"><a class="is-active" href="./">Training library</a><a href="../#features">App features</a><a href="../support.html">Support</a></nav><a class="nav-cta" href="${appStoreUrl}">Try DoThis</a></header><main class="library-main"><header class="library-hero"><p class="eyebrow">DoThis Training Library</p><h1>Useful plans before you ever open the app.</h1><p>Complete routines, real progression rules, and practical alternatives. Use a guide as written, then let DoThis adapt it around your schedule, equipment, and training history.</p></header><section class="library-grid" aria-label="Training articles">${cards}</section></main><footer class="site-footer"><div class="footer-brand"><img src="../assets/dothis-logo.png" alt=""/><span>DoThis</span></div><div class="footer-links"><a href="../privacy.html">Privacy</a><a href="../terms.html">Terms</a><a href="../support.html">Support</a></div><p>Copyright <span id="year"></span> DoThis Labs LLC.</p></footer><script src="../script.js"></script><script src="article.js"></script></body></html>`);

const rssItems = articles.map((article) => `<item><title>${escapeHtml(article.title)}</title><link>${siteUrl}/articles/${article.slug}/</link><guid>${siteUrl}/articles/${article.slug}/</guid><pubDate>${new Date(`${article.published}T12:00:00Z`).toUTCString()}</pubDate><description>${escapeHtml(article.description)}</description></item>`).join("");
fs.writeFileSync(path.join(root, "feed.xml"), `<?xml version="1.0" encoding="UTF-8"?><rss version="2.0"><channel><title>DoThis Training Library</title><link>${siteUrl}/articles/</link><description>Evidence-informed workout plans and practical training guides from DoThis.</description><language>en-us</language>${rssItems}</channel></rss>`);

const sitemapEntries = [
  { loc: `${siteUrl}/`, priority: "1.0" },
  { loc: `${siteUrl}/articles/`, priority: "0.9", lastmod: articles[0]?.modified },
  ...articles.map((article) => ({ loc: `${siteUrl}/articles/${article.slug}/`, priority: "0.8", lastmod: article.modified })),
  { loc: `${siteUrl}/privacy.html`, priority: "0.3" },
  { loc: `${siteUrl}/terms.html`, priority: "0.3" },
  { loc: `${siteUrl}/support.html`, priority: "0.5" },
];
fs.writeFileSync(path.join(root, "sitemap.xml"), `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapEntries.map((entry) => `  <url><loc>${entry.loc}</loc>${entry.lastmod ? `<lastmod>${entry.lastmod}</lastmod>` : ""}<priority>${entry.priority}</priority></url>`).join("\n")}
</urlset>\n`);

console.log(`Built ${articles.length} article pages, ${articles.length} social images, RSS, and sitemap.`);
