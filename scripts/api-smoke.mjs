import assert from "node:assert/strict";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const configRoute = require("../api/config.js");
const publishRoute = require("../api/publish-config.js");
const uploadRoute = require("../api/upload.js");

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

  console.log("Validated API method, fallback, unconfigured, read-only and wrong-password paths.");
} finally {
  global.fetch = originalFetch;
  for (const key of Object.keys(process.env)) {
    if (!(key in savedEnv)) delete process.env[key];
  }
  Object.assign(process.env, savedEnv);
}
