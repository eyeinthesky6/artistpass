const DEFAULT_REPO = "eyeinthesky6/artistpass-epk-demo";
const DEFAULT_BRANCH = "main";
const CONFIG_PATH = "artist-config.js";
const BLOB_CONFIG_PATH = "config/artist-config.js";
let blobSdk;

function sendJson(res, status, body) {
  res.statusCode = status;
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.end(JSON.stringify(body));
}

function repoPath(path) {
  return path.split("/").map(encodeURIComponent).join("/");
}

async function readJson(req) {
  if (req.body && typeof req.body === "object") return req.body;
  if (typeof req.body === "string") return JSON.parse(req.body || "{}");

  let raw = "";
  for await (const chunk of req) raw += chunk;
  return raw ? JSON.parse(raw) : {};
}

async function githubJson(url, options) {
  const response = await fetch(url, options);
  const text = await response.text();
  const data = text ? JSON.parse(text) : {};
  return { response, data };
}

module.exports = async function publishConfig(req, res) {
  if (req.method === "OPTIONS") return sendJson(res, 200, { ok: true });
  if (req.method !== "POST") return sendJson(res, 405, { ok: false, error: "Use POST" });

  const publishPassword = process.env.ADMIN_PUBLISH_PASSWORD || process.env.ARTIST_ADMIN_PASSWORD;
  const blobToken = process.env.BLOB_READ_WRITE_TOKEN;
  const githubToken = process.env.GITHUB_TOKEN;
  const repo = process.env.GITHUB_REPO || DEFAULT_REPO;
  const branch = process.env.GITHUB_BRANCH || DEFAULT_BRANCH;

  if (!publishPassword || (!blobToken && !githubToken)) {
    return sendJson(res, 503, {
      ok: false,
      error: "Publish is not configured on Vercel"
    });
  }

  let body;
  try {
    body = await readJson(req);
  } catch (error) {
    return sendJson(res, 400, { ok: false, error: "Invalid JSON body" });
  }

  if (!body || body.password !== publishPassword) {
    return sendJson(res, 401, { ok: false, error: "Wrong publish password" });
  }

  if (!body.config || typeof body.config !== "object" || Array.isArray(body.config)) {
    return sendJson(res, 400, { ok: false, error: "Missing config object" });
  }

  let configJson;
  try {
    configJson = JSON.stringify(body.config, null, 2);
  } catch (error) {
    return sendJson(res, 400, { ok: false, error: "Config could not be serialized" });
  }

  if (configJson.length > 250000) {
    return sendJson(res, 413, { ok: false, error: "Config is too large" });
  }

  const content = "window.ARTIST_CONFIG = " + configJson + ";\n";

  if (blobToken) {
    try {
      if (!blobSdk) blobSdk = require("@vercel/blob");
      const blob = await blobSdk.put(BLOB_CONFIG_PATH, content, {
        access: "public",
        allowOverwrite: true,
        contentType: "application/javascript; charset=utf-8",
        cacheControlMaxAge: 60
      });
      return sendJson(res, 200, {
        ok: true,
        storage: "blob",
        path: BLOB_CONFIG_PATH,
        url: blob.url
      });
    } catch (error) {
      if (!githubToken) {
        return sendJson(res, 500, {
          ok: false,
          error: "Blob publish failed"
        });
      }
    }
  }

  const apiBase = "https://api.github.com/repos/" + repo + "/contents/" + repoPath(CONFIG_PATH);
  const headers = {
    Authorization: "Bearer " + githubToken,
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
    "User-Agent": "artistpass-admin-publisher"
  };

  try {
    const current = await githubJson(apiBase + "?ref=" + encodeURIComponent(branch), { headers });
    let sha = "";
    if (current.response.status === 200) {
      sha = current.data.sha || "";
    } else if (current.response.status !== 404) {
      return sendJson(res, current.response.status, {
        ok: false,
        error: current.data.message || "Could not read existing config"
      });
    }

    const payload = {
      message: "Update artist config from admin",
      content: Buffer.from(content, "utf8").toString("base64"),
      branch,
      committer: {
        name: process.env.GITHUB_COMMITTER_NAME || "ArtistPass Admin Publisher",
        email: process.env.GITHUB_COMMITTER_EMAIL || "admin@artistpass.vercel.app"
      }
    };
    if (sha) payload.sha = sha;

    const result = await githubJson(apiBase, {
      method: "PUT",
      headers: {
        ...headers,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });

    if (!result.response.ok) {
      return sendJson(res, result.response.status, {
        ok: false,
        error: result.data.message || "GitHub publish failed"
      });
    }

    return sendJson(res, 200, {
      ok: true,
      commit: result.data.commit && result.data.commit.sha,
      path: CONFIG_PATH
    });
  } catch (error) {
    return sendJson(res, 500, {
      ok: false,
      error: "Publish failed"
    });
  }
};
