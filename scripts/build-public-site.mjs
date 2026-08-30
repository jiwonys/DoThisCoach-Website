import { cp, mkdir, readdir, rm, writeFile } from "node:fs/promises";
import { resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const output = resolve(root, "_site");

const publicFiles = [
  "CNAME",
  "apple-touch-icon.png",
  "favicon.ico",
  "feed.xml",
  "home.css",
  "home.js",
  "index.html",
  "privacy.html",
  "robots.txt",
  "script.js",
  "sitemap.xml",
  "styles.css",
  "support.html",
  "terms.html"
];

const publicDirectories = ["app", "articles", "assets", "compare", "partner"];

await rm(output, { recursive: true, force: true });
await mkdir(output, { recursive: true });

for (const file of publicFiles) {
  await cp(resolve(root, file), resolve(output, file));
}

for (const directory of publicDirectories) {
  await cp(resolve(root, directory), resolve(output, directory), { recursive: true });
}

const pruneProvenanceSidecars = async (directory) => {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const target = resolve(directory, entry.name);
    if (entry.isDirectory()) await pruneProvenanceSidecars(target);
    else if (entry.name.endsWith(".webp.json")) await rm(target);
  }
};

await pruneProvenanceSidecars(resolve(output, "assets"));

await writeFile(resolve(output, ".nojekyll"), "");
console.log(`Public site packaged in ${output}`);
