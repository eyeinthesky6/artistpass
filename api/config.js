const DEFAULT_REPO = "eyeinthesky6/artistpass";
const DEFAULT_BRANCH = "main";
const CONFIG_PATH = "artist-config.js";
const BLOB_CONFIG_PATH = "config/artist-config.js";
let blobSdk;

function repoPath(path) {
  return path.split("/").map(encodeURIComponent).join("/");
}

function sendJs(res, status, body) {
  res.statusCode = status;
  res.setHeader("Content-Type", "application/javascript; charset=utf-8");
  res.setHeader("Cache-Control", "no-store, max-age=0");
  res.end(body);
}

async function githubJson(url, options) {
  const response = await fetch(url, options);
  const text = await response.text();
  const data = text ? JSON.parse(text) : {};
  return { response, data };
}

function validConfigJs(content) {
  return /^window\.ARTIST_CONFIG\s*=/.test(String(content || "").trim());
}

async function streamToText(stream) {
  if (!stream) return "";
  return await new Response(stream).text();
}

async function readBlobConfig() {
  if (!process.env.BLOB_READ_WRITE_TOKEN) return "";
  if (!blobSdk) blobSdk = require("@vercel/blob");
  const blob = await blobSdk.get(BLOB_CONFIG_PATH, { access: "public" });
  if (!blob || blob.statusCode !== 200) return "";
  return await streamToText(blob.stream);
}

module.exports = async function config(req, res) {
  if (req.method !== "GET" && req.method !== "HEAD") {
    return sendJs(res, 405, "window.ARTIST_CONFIG = {};\n");
  }

  try {
    const blobContent = await readBlobConfig();
    if (validConfigJs(blobContent)) {
      return sendJs(res, 200, blobContent);
    }
  } catch (error) {
    // Fall back to GitHub/static config for older installs or missing Blob stores.
  }

  const githubToken = process.env.GITHUB_TOKEN;
  const repo = process.env.GITHUB_REPO || DEFAULT_REPO;
  const branch = process.env.GITHUB_BRANCH || DEFAULT_BRANCH;
  const apiBase = "https://api.github.com/repos/" + repo + "/contents/" + repoPath(CONFIG_PATH);
  const headers = {
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
    "User-Agent": "artistpass-config-loader"
  };
  if (githubToken) headers.Authorization = "Bearer " + githubToken;

  try {
    const current = await githubJson(apiBase + "?ref=" + encodeURIComponent(branch), { headers });
    if (!current.response.ok || !current.data.content) {
      return sendJs(res, 200, "window.ARTIST_CONFIG = {};\n");
    }
    const content = Buffer.from(String(current.data.content).replace(/\s/g, ""), "base64").toString("utf8");
    if (!validConfigJs(content)) {
      return sendJs(res, 200, "window.ARTIST_CONFIG = {};\n");
    }
    return sendJs(res, 200, content);
  } catch (error) {
    return sendJs(res, 200, "window.ARTIST_CONFIG = {};\n");
  }
};
