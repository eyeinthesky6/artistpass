import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const requiredFiles = [
  "index.html",
  "artist-config.js",
  "support.js",
  "favicon.svg",
  "robots.txt",
  "sitemap.xml",
  "llms.txt",
  "README.md",
  "AGENTS.md",
  "CHANGELOG.md",
  "LICENSE",
  "THIRD_PARTY_NOTICES.md",
  "SECURITY.md",
  "CONTRIBUTING.md",
  "CODE_OF_CONDUCT.md",
  "SUPPORT.md",
  ".pre-commit-config.yaml",
  "vercel.json"
];

const fail = (message) => {
  throw new Error(message);
};

for (const relativePath of requiredFiles) {
  if (!fs.existsSync(path.join(root, relativePath))) {
    fail(`Missing required file: ${relativePath}`);
  }
}

for (const relativePath of ["package.json", "package-lock.json", "vercel.json"]) {
  JSON.parse(fs.readFileSync(path.join(root, relativePath), "utf8"));
}

const html = fs.readFileSync(path.join(root, "index.html"), "utf8");
const structuredData = [
  ...html.matchAll(/<script\s+type=["']application\/ld\+json["']>([\s\S]*?)<\/script>/gi)
];
if (!structuredData.length) fail("index.html has no JSON-LD block");
for (const [, block] of structuredData) JSON.parse(block);

const configSource = fs.readFileSync(path.join(root, "artist-config.js"), "utf8");
const sandbox = { window: {} };
vm.runInNewContext(configSource, sandbox, { filename: "artist-config.js" });
if (!sandbox.window.ARTIST_CONFIG || typeof sandbox.window.ARTIST_CONFIG !== "object") {
  fail("artist-config.js must assign window.ARTIST_CONFIG");
}

const localAssetPattern = /["']((?:portfolio|downloads|docs)\/[^"'?#,\r\n]+?\.(?:png|jpe?g|webp|gif|svg|mp4|pdf|html))["']/gi;
const localAssets = new Set([...html.matchAll(localAssetPattern)].map((match) => match[1]));
for (const relativePath of localAssets) {
  if (!fs.existsSync(path.join(root, relativePath))) {
    fail(`Referenced local asset does not exist: ${relativePath}`);
  }
}

const readme = fs.readFileSync(path.join(root, "README.md"), "utf8");
for (const expected of [
  "https://artistpass.vercel.app",
  "https://github.com/eyeinthesky6/artistpass",
  "https://vercel.com/new/clone?"
]) {
  if (!readme.includes(expected)) fail(`README is missing public link: ${expected}`);
}

console.log(`Validated ${requiredFiles.length} launch files, ${structuredData.length} JSON-LD block(s), and ${localAssets.size} local asset reference(s).`);
