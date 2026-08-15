import { cp, copyFile, mkdir } from "node:fs/promises";
import { resolve } from "node:path";

const root = process.cwd();
const output = resolve(root, "dist");

const directories = ["articles", "assets"];
const files = [
  "CNAME",
  "feed.xml",
  "privacy.html",
  "robots.txt",
  "script.js",
  "sitemap.xml",
  "styles.css",
  "support.html",
  "terms.html",
];

await mkdir(output, { recursive: true });

for (const directory of directories) {
  await cp(resolve(root, directory), resolve(output, directory), { recursive: true, force: true });
}

for (const file of files) {
  await copyFile(resolve(root, file), resolve(output, file));
}

console.log(`Copied ${directories.length} static directories and ${files.length} root files into dist.`);
