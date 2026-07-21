import assert from "node:assert/strict";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const configRoute = require("../api/config.js");
const publishRoute = require("../api/publish-config.js");
const uploadRoute = require("../api/upload.js");
const renderIndexRoute = require("../api/render-index.js");

function responseRecorder() {
  return {
    statusCode: 0,
    headers: {},
    body: "",
    setHeader(name, value) {
      this.headers[String(name).toLowerCase()] = value;
    },
    end(value = "") {
      this.body = String(value);
    }
  };
}

async function invoke(route, request) {
  const response = responseRecorder();
  await route(request, response);
  return response;
}

const originalFetch = global.fetch;
const savedEnv = { ...process.env };

try {
  global.fetch = async () => new Response("{}", { status: 404 });
  delete process.env.BLOB_READ_WRITE_TOKEN;
  delete process.env.GITHUB_TOKEN;
  delete process.env.ADMIN_PUBLISH_PASSWORD;
  delete process.env.ARTIST_ADMIN_PASSWORD;
  delete process.env.ARTISTPASS_DEMO_READONLY;

  let response = await invoke(configRoute, { method: "POST" });
  assert.equal(response.statusCode, 405);

  response = await invoke(configRoute, { method: "GET" });
  assert.equal(response.statusCode, 200);
  assert.match(response.body, /window\.ARTIST_CONFIG\s*=/);

  response = await invoke(publishRoute, { method: "GET" });
  assert.equal(response.statusCode, 405);

  response = await invoke(publishRoute, { method: "POST", body: {} });
  assert.equal(response.statusCode, 503);

  process.env.ARTISTPASS_DEMO_READONLY = "true";
  response = await invoke(publishRoute, { method: "POST", body: {} });
  assert.equal(response.statusCode, 403);

  delete process.env.ARTISTPASS_DEMO_READONLY;
  process.env.ADMIN_PUBLISH_PASSWORD = "not-a-secret";
  process.env.BLOB_READ_WRITE_TOKEN = "not-a-token";
  response = await invoke(publishRoute, { method: "POST", body: { password: "wrong" } });
  assert.equal(response.statusCode, 401);

  response = await invoke(uploadRoute, { method: "GET" });
  assert.equal(response.statusCode, 405);

  process.env.ARTISTPASS_DEMO_READONLY = "true";
  response = await invoke(uploadRoute, { method: "POST", body: {} });
  assert.equal(response.statusCode, 403);

  delete process.env.ARTISTPASS_DEMO_READONLY;

  const rejected = await invoke(renderIndexRoute, { method: "POST", headers: {} });
  assert.equal(rejected.statusCode, 405);

  const staticFallback = await invoke(renderIndexRoute, { method: "GET", headers: { host: "example.test" } });
  assert.equal(staticFallback.statusCode, 200);
  assert.match(staticFallback.headers["content-type"] || "", /text\/html/);
  assert.match(staticFallback.headers["cache-control"] || "", /s-maxage/);
  assert.match(staticFallback.body, /<title>ArtistPass \| Actor Portfolio Website Template<\/title>/);

  const { parseArtistConfig, deriveMeta, applyMeta } = renderIndexRoute.__internals;
  const sampleConfig = {
    name: "Test Artist",
    images: { headshot: "portfolio/test/headshot.png" },
    sharing: { profileText: "{name}\nActor - Test City\n\nDetails here." }
  };
  const parsed = parseArtistConfig("window.ARTIST_CONFIG = " + JSON.stringify(sampleConfig) + ";\n");
  assert.equal(parsed && parsed.name, "Test Artist");
  const meta = deriveMeta(parsed, "https://example.test");
  assert.equal(meta.title, "Test Artist | Actor EPK");
  assert.equal(meta.description, "Test Artist");
  assert.equal(meta.image, "https://example.test/portfolio/test/headshot.png");

  const originalHtml = [
    "<html><head>",
    "<title>Old Title</title>",
    "<meta name=\"description\" content=\"old\">",
    "<meta property=\"og:title\" content=\"old\">",
    "<meta property=\"og:description\" content=\"old\">",
    "<meta property=\"og:image\" content=\"https://old/img.png\">",
    "<meta name=\"twitter:title\" content=\"old\">",
    "<meta name=\"twitter:description\" content=\"old\">",
    "<meta name=\"twitter:image\" content=\"https://old/img.png\">",
    "</head><body></body></html>"
  ].join("\n");
  const rewritten = applyMeta(originalHtml, meta);
  assert.match(rewritten, /<title>Test Artist \| Actor EPK<\/title>/);
  assert.match(rewritten, /property="og:title" content="Test Artist \| Actor EPK"/);
  assert.match(rewritten, /property="og:image" content="https:\/\/example.test\/portfolio\/test\/headshot.png"/);
  assert.match(rewritten, /name="twitter:image" content="https:\/\/example.test\/portfolio\/test\/headshot.png"/);
  assert.match(rewritten, /name="description" content="Test Artist"/);

  const injectionMeta = deriveMeta({ name: "Rogue\" onerror=x", sharing: { profileText: "safe" } }, "https://example.test");
  const injected = applyMeta(originalHtml, injectionMeta);
  assert.doesNotMatch(injected, /content="[^"]*"\s+onerror=/);
  assert.match(injected, /content="Rogue&quot; onerror=x \| Actor EPK"/);

  process.env.ARTISTPASS_DEMO_READONLY = "true";
  const demoRender = await invoke(renderIndexRoute, { method: "GET", headers: { host: "example.test" } });
  assert.equal(demoRender.statusCode, 200);
  assert.match(demoRender.body, /<title>ArtistPass \| Actor Portfolio Website Template<\/title>/);
  delete process.env.ARTISTPASS_DEMO_READONLY;

  console.log("Validated API method, fallback, unconfigured, read-only, wrong-password and crawler metadata paths.");
} finally {
  global.fetch = originalFetch;
  for (const key of Object.keys(process.env)) {
    if (!(key in savedEnv)) delete process.env[key];
  }
  Object.assign(process.env, savedEnv);
}
