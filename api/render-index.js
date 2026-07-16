const fs = require("node:fs");
const path = require("node:path");

const BLOB_CONFIG_PATH = "config/artist-config.js";
const DEFAULT_SITE = "https://artistpass.vercel.app";
let blobSdk;
let cachedHtml;

function isDemoReadOnly() {
  return /^(1|true|yes|on)$/i.test(String(process.env.ARTISTPASS_DEMO_READONLY || ""));
}

function readIndexHtml() {
  if (cachedHtml) return cachedHtml;
  cachedHtml = fs.readFileSync(path.resolve(__dirname, "..", "index.html"), "utf8");
  return cachedHtml;
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

function parseArtistConfig(source) {
  const trimmed = String(source || "").trim();
  const match = trimmed.match(/^window\.ARTIST_CONFIG\s*=\s*([\s\S]+?);?\s*$/);
  if (!match) return null;
  try {
    const value = JSON.parse(match[1].trim().replace(/;$/, "").trim());
    if (!value || typeof value !== "object" || Array.isArray(value)) return null;
    return value;
  } catch (error) {
    return null;
  }
}

function escapeAttribute(value) {
  return String(value == null ? "" : value)
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function escapeText(value) {
  return String(value == null ? "" : value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function absoluteUrl(base, src) {
  const raw = String(src || "").trim();
  if (!raw) return "";
  try {
    return new URL(raw, base + "/").href;
  } catch (error) {
    return raw;
  }
}

function firstLine(text) {
  return String(text || "").split(/\r?\n/)[0].trim();
}

function deriveMeta(config, siteUrl) {
  const name = (config && typeof config.name === "string") ? config.name.trim() : "";
  const images = (config && config.images && typeof config.images === "object") ? config.images : {};
  const sharing = (config && config.sharing && typeof config.sharing === "object") ? config.sharing : {};
  const rawImage = images.headshot || images.hero || sharing.image || "";
  const image = absoluteUrl(siteUrl, rawImage);
  const template = String(sharing.profileText || "");
  const rendered = template.replace(/\{name\}/g, name).replace(/\{[a-zA-Z0-9_]+\}/g, "").trim();
  const description = firstLine(rendered).slice(0, 240);
  return {
    name,
    image,
    description,
    title: name ? name + " | Actor EPK" : ""
  };
}

function replaceMetaContent(html, matcher, value) {
  if (!value) return html;
  const escapedValue = escapeAttribute(value);
  return html.replace(matcher, (match) =>
    match.replace(/content=(["'])[^"']*\1/, 'content="' + escapedValue + '"'));
}

function applyMeta(html, meta) {
  let out = html;
  if (meta.title) {
    out = out.replace(/<title>[^<]*<\/title>/i, "<title>" + escapeText(meta.title) + "</title>");
    out = replaceMetaContent(out, /<meta\s+property=["']og:title["'][^>]*>/i, meta.title);
    out = replaceMetaContent(out, /<meta\s+name=["']twitter:title["'][^>]*>/i, meta.title);
  }
  if (meta.description) {
    out = replaceMetaContent(out, /<meta\s+name=["']description["'][^>]*>/i, meta.description);
    out = replaceMetaContent(out, /<meta\s+property=["']og:description["'][^>]*>/i, meta.description);
    out = replaceMetaContent(out, /<meta\s+name=["']twitter:description["'][^>]*>/i, meta.description);
  }
  if (meta.image) {
    out = replaceMetaContent(out, /<meta\s+property=["']og:image["'][^>]*>/i, meta.image);
    out = replaceMetaContent(out, /<meta\s+name=["']twitter:image["'][^>]*>/i, meta.image);
  }
  return out;
}

function siteOrigin(req) {
  const headers = (req && req.headers) || {};
  const host = headers["x-forwarded-host"] || headers.host;
  const proto = headers["x-forwarded-proto"] || "https";
  if (!host) return DEFAULT_SITE;
  return proto + "://" + host;
}

function sendHtml(res, status, body) {
  res.statusCode = status;
  res.setHeader("Content-Type", "text/html; charset=utf-8");
  res.setHeader("Cache-Control", "public, s-maxage=60, stale-while-revalidate=86400");
  res.end(body);
}

module.exports = async function renderIndex(req, res) {
  if (req.method !== "GET" && req.method !== "HEAD") {
    res.statusCode = 405;
    res.setHeader("Allow", "GET, HEAD");
    return res.end("Method Not Allowed");
  }

  let html;
  try {
    html = readIndexHtml();
  } catch (error) {
    res.statusCode = 500;
    return res.end("index.html not available");
  }

  // Preserve the official demo's static fictional metadata.
  if (isDemoReadOnly()) return sendHtml(res, 200, html);

  let configSource = "";
  try {
    configSource = await readBlobConfig();
  } catch (error) {
    return sendHtml(res, 200, html);
  }

  const config = parseArtistConfig(configSource);
  if (!config) return sendHtml(res, 200, html);

  return sendHtml(res, 200, applyMeta(html, deriveMeta(config, siteOrigin(req))));
};

module.exports.__internals = { parseArtistConfig, deriveMeta, applyMeta };
