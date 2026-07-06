const DEFAULT_REPO = "eyeinthesky6/artistpass-epk-demo";
const DEFAULT_BRANCH = "main";
const CONFIG_PATH = "artist-config.js";

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

module.exports = async function config(req, res) {
  if (req.method !== "GET" && req.method !== "HEAD") {
    return sendJs(res, 405, "window.ARTIST_CONFIG = {};\n");
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
    if (!/^window\.ARTIST_CONFIG\s*=/.test(content.trim())) {
      return sendJs(res, 200, "window.ARTIST_CONFIG = {};\n");
    }
    return sendJs(res, 200, content);
  } catch (error) {
    return sendJs(res, 200, "window.ARTIST_CONFIG = {};\n");
  }
};
