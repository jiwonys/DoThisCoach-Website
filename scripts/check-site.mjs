import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const ignoredDirs = new Set([".git", "node_modules"]);

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

const articleFiles = htmlFiles.filter((file) => /articles\/[^/]+\/index\.html$/.test(file));
if (articleFiles.length !== 10) errors.push(`Expected 10 article pages, found ${articleFiles.length}`);
if (!sitemapUrls.includes("https://dothiscoach.com/articles/")) errors.push("sitemap.xml: article index is missing");
if (!fs.existsSync(path.join(root, "feed.xml"))) errors.push("feed.xml is missing");

for (const warning of warnings) console.warn(`WARN ${warning}`);
if (errors.length) {
  console.error(`Site check failed with ${errors.length} error(s):\n\n${errors.join("\n\n")}`);
  process.exit(1);
}

console.log(`Site check passed: ${htmlFiles.length} HTML pages, ${articleFiles.length} articles, ${sitemapUrls.length} sitemap URLs.`);
