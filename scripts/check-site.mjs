import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
// _to_delete holds a stale one-megabyte standalone preview whose relative links
// were never meant to resolve from the site root; walking it produced a dozen
// broken-reference errors that drowned the real ones.
const ignoredDirs = new Set([
  ".agents",
  ".git",
  ".impeccable",
  ".playwright-cli",
  ".venv-design",
  "_site",
  "_to_delete",
  "docs",
  "node_modules",
  "output",
  "prototype-src",
  "prototypes"
]);

const walk = (dir) => fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
  if (ignoredDirs.has(entry.name)) return [];
  const fullPath = path.join(dir, entry.name);
  return entry.isDirectory() ? walk(fullPath) : [fullPath];
});

const htmlFiles = walk(root).filter((file) => file.endsWith(".html"));
const errors = [];
const warnings = [];
const titles = new Map();
const descriptions = new Map();
const appStoreRedirects = new Map([
  ["app/index.html", "https://apps.apple.com/us/app/dothis-ai-coach-for-athletes/id6771322181?ppid=654f8be5-8f71-488b-88f5-9a1dd46b487b"],
  ["app/basketball/index.html", "https://apps.apple.com/us/app/dothis-ai-coach-for-athletes/id6771322181?ppid=cdf59172-8f34-4ab9-9fa3-ef33a5fc403f"],
  ["app/pickleball/index.html", "https://apps.apple.com/us/app/dothis-ai-coach-for-athletes/id6771322181?ppid=241f0bc6-b245-475f-a6b9-3fcf3fd96fcf"],
  ["app/soccer/index.html", "https://apps.apple.com/us/app/dothis-ai-coach-for-athletes/id6771322181?ppid=18dd4e91-caeb-4a72-b729-1b0ee698831d"],
  ["app/tennis/index.html", "https://apps.apple.com/us/app/dothis-ai-coach-for-athletes/id6771322181?ppid=4c8635a3-522a-41ba-a3d0-214bca0320c5"],
  ["app/volleyball/index.html", "https://apps.apple.com/us/app/dothis-ai-coach-for-athletes/id6771322181?ppid=bf00e022-ab60-403e-bc06-a2d3dbdde491"],
]);

const addUnique = (map, value, file, label) => {
  if (!value) return;
  if (map.has(value)) errors.push(`Duplicate ${label}: ${value}\n  ${map.get(value)}\n  ${file}`);
  else map.set(value, file);
};

const localTarget = (sourceFile, rawUrl) => {
  const url = rawUrl.split("#")[0].split("?")[0];
  if (!url || /^(https?:|mailto:|tel:|data:|javascript:)/.test(url)) return null;
  let target = url.startsWith("/") ? path.join(root, url.slice(1)) : path.resolve(path.dirname(sourceFile), url);
  if (url.endsWith("/") || (fs.existsSync(target) && fs.statSync(target).isDirectory())) target = path.join(target, "index.html");
  return target;
};

for (const file of htmlFiles) {
  const relative = path.relative(root, file);
  const html = fs.readFileSync(file, "utf8");
  const title = html.match(/<title>([^<]+)<\/title>/i)?.[1]?.trim();
  const description = html.match(/<meta\s+name=["']description["']\s+content=["']([^"']+)["']/i)?.[1]?.trim();
  if (!title) errors.push(`${relative}: missing title`);
  if (!description) warnings.push(`${relative}: missing meta description`);
  addUnique(titles, title, relative, "title");
  addUnique(descriptions, description, relative, "description");

  if ((relative === "index.html" || relative.startsWith(`articles${path.sep}`)) && !/<link\s+rel=["']canonical["']/i.test(html)) {
    errors.push(`${relative}: missing canonical URL`);
  }

  for (const match of html.matchAll(/<script\s+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)) {
    try { JSON.parse(match[1]); } catch (error) { errors.push(`${relative}: invalid JSON-LD (${error.message})`); }
  }

  for (const match of html.matchAll(/(?:href|src)=["']([^"']+)["']/gi)) {
    const target = localTarget(file, match[1]);
    if (target && !fs.existsSync(target)) errors.push(`${relative}: broken local reference ${match[1]}`);
  }
}

const sitemap = fs.readFileSync(path.join(root, "sitemap.xml"), "utf8");
const sitemapUrls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);
for (const url of sitemapUrls) {
  const pathname = new URL(url).pathname;
  const target = pathname.endsWith("/") ? path.join(root, pathname, "index.html") : path.join(root, pathname);
  if (!fs.existsSync(target)) errors.push(`sitemap.xml: missing local page for ${url}`);
}

const articleFiles = htmlFiles.filter((file) => /articles[\\/][^\\/]+[\\/]index\.html$/.test(file));
// Derived from the catalog rather than hardcoded: the old literal 10 went stale
// the first time an article was added and reported a successful build as a
// failure ever after.
const { articles } = await import("./article-content.mjs");
if (articleFiles.length !== articles.length) {
  errors.push(`Expected ${articles.length} article pages from the catalog, found ${articleFiles.length}`);
}
if (!sitemapUrls.includes("https://dothiscoach.com/articles/")) errors.push("sitemap.xml: article index is missing");
if (!fs.existsSync(path.join(root, "feed.xml"))) errors.push("feed.xml is missing");

for (const [relativePath, appStoreUrl] of appStoreRedirects) {
  const appRedirectPath = path.join(root, relativePath);
  if (!fs.existsSync(appRedirectPath)) {
    errors.push(`${relativePath} is missing`);
    continue;
  }
  const appRedirectHtml = fs.readFileSync(appRedirectPath, "utf8");
  if (!appRedirectHtml.includes(`window.location.replace("${appStoreUrl}")`)) {
    errors.push(`${relativePath}: JavaScript redirect does not target its App Store product page`);
  }
  if (!appRedirectHtml.includes(`content="0; url=${appStoreUrl}"`)) {
    errors.push(`${relativePath}: fallback meta redirect does not target its App Store product page`);
  }
  if (!appRedirectHtml.includes(`<link rel="canonical" href="${appStoreUrl}">`)) {
    errors.push(`${relativePath}: canonical URL does not target its App Store product page`);
  }
}

for (const warning of warnings) console.warn(`WARN ${warning}`);
if (errors.length) {
  console.error(`Site check failed with ${errors.length} error(s):\n\n${errors.join("\n\n")}`);
  process.exit(1);
}

console.log(`Site check passed: ${htmlFiles.length} HTML pages, ${articleFiles.length} articles, ${sitemapUrls.length} sitemap URLs.`);
