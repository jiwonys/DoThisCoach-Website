import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { comparisons, dothis, VERIFIED_ON } from "./comparison-content.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const siteUrl = "https://dothiscoach.com";
const appStoreUrl = "https://apps.apple.com/us/app/dothis-ai-coach-for-athletes/id6771322181";

const escapeHtml = (value = "") => String(value)
  .replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;")
  .replaceAll('"', "&quot;").replaceAll("'", "&#039;");

const assetHashes = new Map();
const assetVersion = (relPath) => {
  if (!assetHashes.has(relPath)) {
    assetHashes.set(relPath, crypto.createHash("sha1")
      .update(fs.readFileSync(path.join(root, relPath))).digest("hex").slice(0, 8));
  }
  return assetHashes.get(relPath);
};
const cssVersion = () => `${assetVersion("styles.css")}${assetVersion("articles/article.css")}`;

const ICONS = '<link rel="icon" href="/favicon.ico" sizes="any" /><link rel="icon" type="image/png" sizes="96x96" href="/assets/icons/icon-96.png" /><link rel="apple-touch-icon" href="/apple-touch-icon.png" />';

const header = (depth) => {
  const up = "../".repeat(depth);
  return `<header class="site-header article-header"><a class="brand" href="${up}"><img src="${up}assets/dothis-logo.png" alt=""/><span>DoThis</span></a><nav aria-label="Main navigation"><a href="${up}articles/">Training library</a><a href="${up}compare/">Compare</a><a href="${up}#features">App features</a><a href="${up}support.html">Support</a></nav><a class="nav-cta" href="${appStoreUrl}">Try DoThis</a></header>`;
};
const footer = (depth) => {
  const up = "../".repeat(depth);
  return `<footer class="site-footer"><div class="footer-brand"><img src="${up}assets/dothis-logo.png" alt=""/><span>DoThis</span></div><div class="footer-links"><a href="${up}privacy.html">Privacy</a><a href="${up}terms.html">Terms</a><a href="${up}support.html">Support</a></div><p>Copyright <span id="year"></span> DoThis Labs LLC.</p></footer>`;
};

/**
 * Printed on every page. Comparative advertising is lawful when it is truthful
 * and does not imply a relationship that is not there, so both halves of that
 * are stated rather than assumed: the marks belong to their owners, and the
 * claims are dated because prices move.
 */
const disclaimer = (competitor) =>
  `<section class="comparison-disclaimer"><h2>About this comparison</h2><p>Every statement about ${escapeHtml(competitor)} on this page comes from ${escapeHtml(competitor)}'s own App Store listing or website, read on ${VERIFIED_ON}, and each source is linked above. Prices and features change; check both listings before deciding.</p><p>Where we could not verify something we say so rather than assuming it is missing. A blank is not evidence of absence.</p><p>${escapeHtml(competitor)} is a trademark of its respective owner. DoThis is not affiliated with, endorsed by, or sponsored by ${escapeHtml(competitor)}. The name is used only to identify the product being compared.</p></section>`;

const outDirs = [];
for (const c of comparisons) {
  const outDir = path.join(root, "compare", c.slug);
  fs.mkdirSync(outDir, { recursive: true });
  outDirs.push(c.slug);

  const factRows = c.facts.map((f) => `<tr><th scope="row">${escapeHtml(f.row)}</th><td>${escapeHtml(f.ours)}</td><td>${escapeHtml(f.theirs)}</td></tr>`).join("");
  const sourceLinks = c.sources.map((s) => `<li><a href="${s.url}" rel="nofollow noopener" target="_blank">${escapeHtml(s.label)}</a></li>`).join("");
  const whoEach = c.whoEach.map((w) => `<div class="compare-fit"><h3>${escapeHtml(w.who)}</h3><p>${escapeHtml(w.why)}</p></div>`).join("");
  const faq = c.faq.map((q) => `<div class="faq-item"><h3>${escapeHtml(q.question)}</h3><p>${escapeHtml(q.answer)}</p></div>`).join("");

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: c.faq.map((q) => ({
      "@type": "Question", name: q.question,
      acceptedAnswer: { "@type": "Answer", text: q.answer },
    })),
  };

  fs.writeFileSync(path.join(outDir, "index.html"),
`<!doctype html><html lang="en"><head><meta charset="utf-8"/><meta name="viewport" content="width=device-width, initial-scale=1"/><title>${escapeHtml(c.seoTitle)}</title><meta name="description" content="${escapeHtml(c.description)}"/><link rel="canonical" href="${siteUrl}/compare/${c.slug}/"/><meta property="og:type" content="article"/><meta property="og:title" content="${escapeHtml(c.title)}"/><meta property="og:description" content="${escapeHtml(c.description)}"/><meta property="og:url" content="${siteUrl}/compare/${c.slug}/"/>${ICONS}<link rel="stylesheet" href="../../styles.css?v=${cssVersion()}"/><link rel="stylesheet" href="../../articles/article.css?v=${cssVersion()}"/><script type="application/ld+json">${JSON.stringify(jsonLd)}</script></head><body class="article-page comparison-page">
${header(2)}
<main>
  <header class="article-hero">
    <p class="eyebrow">Comparison &middot; verified ${VERIFIED_ON}</p>
    <h1>${escapeHtml(c.title)}</h1>
    <p class="article-deck">${escapeHtml(c.summary)}</p>
  </header>
  <div class="comparison-body">
    <section>
      <h2>The verified facts</h2>
      <p>Read from each product's App Store listing and website on ${VERIFIED_ON}.</p>
      <div class="table-shell"><table class="comparison-table">
        <thead><tr><th scope="col">&nbsp;</th><th scope="col">DoThis</th><th scope="col">${escapeHtml(c.competitor)}</th></tr></thead>
        <tbody>${factRows}</tbody>
      </table></div>
      <ul class="source-list">${sourceLinks}</ul>
    </section>
    <section>
      <h2>What ${escapeHtml(c.competitor)} does better</h2>
      <p>${escapeHtml(c.theirStrength)}</p>
    </section>
    <section>
      <h2>What DoThis does differently</h2>
      <p>${escapeHtml(c.ourStrength)}</p>
    </section>
    <section>
      <h2>Which one fits you</h2>
      <div class="compare-fit-grid">${whoEach}</div>
    </section>
    <section>
      <h2>Questions</h2>
      <div class="faq-list">${faq}</div>
    </section>
    <section class="article-cta">
      <div>
        <p class="eyebrow">Seven days free</p>
        <h2>See whether DoThis fits your week</h2>
        <p>Tell it when you play and what equipment you have. It plans the rest around that.</p>
      </div>
      <a class="primary-button" href="${appStoreUrl}" data-cta-location="comparison">Try DoThis free</a>
    </section>
    ${disclaimer(c.competitor)}
  </div>
</main>
${footer(2)}
<script src="../../script.js"></script></body></html>
`);
}

// Index
// Same structure as the article index: the padding lives on `.library-card a`,
// so an anchor used *as* the card gets none.
const cards = comparisons.map((c) => `<article class="library-card"><a href="${c.slug}/"><span>Verified ${VERIFIED_ON}</span><h2>${escapeHtml(c.title)}</h2><p>${escapeHtml(c.description)}</p></a></article>`).join("");
fs.mkdirSync(path.join(root, "compare"), { recursive: true });
fs.writeFileSync(path.join(root, "compare", "index.html"),
`<!doctype html><html lang="en"><head><meta charset="utf-8"/><meta name="viewport" content="width=device-width, initial-scale=1"/><title>Compare DoThis With Other Training Apps | DoThis</title><meta name="description" content="Sourced, dated comparisons between DoThis and other strength training apps, including what each competitor does better."/><link rel="canonical" href="${siteUrl}/compare/"/>${ICONS}<link rel="stylesheet" href="../styles.css?v=${cssVersion()}"/><link rel="stylesheet" href="../articles/article.css?v=${cssVersion()}"/></head><body class="article-page">
${header(1)}
<main class="library-main">
  <header class="library-hero">
    <p class="eyebrow">Comparisons</p>
    <h1>How DoThis compares.</h1>
    <p>Every claim on these pages comes from the other product's own listing or website, with the date it was read and a link to the source. Each page also says plainly what the other app does better, because a comparison that never concedes anything is not worth reading.</p>
  </header>
  <section class="library-grid">${cards}</section>
</main>
${footer(1)}
<script src="../script.js"></script></body></html>
`);

console.log(`Built ${comparisons.length} comparison pages and the compare index: ${outDirs.join(", ")}`);
