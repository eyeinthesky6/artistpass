const MAX_IMAGE_SIZE = 12 * 1024 * 1024;
const MAX_PDF_SIZE = 20 * 1024 * 1024;
const IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif", "image/svg+xml", "image/x-icon", "image/vnd.microsoft.icon"];
const PDF_TYPES = ["application/pdf"];

let blobClient;

function sendJson(res, status, body) {
  res.statusCode = status;
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.end(JSON.stringify(body));
}

async function readJson(req) {
  if (req.body && typeof req.body === "object") return req.body;
  if (typeof req.body === "string") return JSON.parse(req.body || "{}");

  let raw = "";
  for await (const chunk of req) raw += chunk;
  return raw ? JSON.parse(raw) : {};
}

function parsePayload(raw) {
  if (!raw) return {};
  if (typeof raw === "object") return raw;
  try {
    return JSON.parse(raw);
  } catch (error) {
    return {};
  }
}

function cleanPath(pathname) {
  return String(pathname || "").replace(/\\/g, "/");
}

module.exports = async function upload(req, res) {
  if (req.method === "OPTIONS") return sendJson(res, 200, { ok: true });
  if (req.method !== "POST") return sendJson(res, 405, { ok: false, error: "Use POST" });

  const publishPassword = process.env.ADMIN_PUBLISH_PASSWORD || process.env.ARTIST_ADMIN_PASSWORD;
  if (!publishPassword || !process.env.BLOB_READ_WRITE_TOKEN) {
    return sendJson(res, 503, { ok: false, error: "Uploads are not configured on Vercel" });
  }

  let body;
  try {
    body = await readJson(req);
  } catch (error) {
    return sendJson(res, 400, { ok: false, error: "Invalid upload request" });
  }

  try {
    if (!blobClient) blobClient = require("@vercel/blob/client");
    const result = await blobClient.handleUpload({
      request: req,
      body,
      onBeforeGenerateToken: async (pathname, clientPayload) => {
        const payload = parsePayload(clientPayload);
        if (payload.password !== publishPassword) {
          throw new Error("Wrong upload password");
        }

        const path = cleanPath(pathname);
        if (!path.startsWith("uploads/") || path.includes("../")) {
          throw new Error("Upload path not allowed");
        }

        const kind = payload.kind === "pdf" ? "pdf" : "image";
        return {
          allowedContentTypes: kind === "pdf" ? PDF_TYPES : IMAGE_TYPES,
          maximumSizeInBytes: kind === "pdf" ? MAX_PDF_SIZE : MAX_IMAGE_SIZE,
          addRandomSuffix: true,
          cacheControlMaxAge: 31536000,
          tokenPayload: JSON.stringify({ kind })
        };
      },
      onUploadCompleted: async () => {}
    });

    return sendJson(res, 200, result);
  } catch (error) {
    return sendJson(res, 400, {
      ok: false,
      error: (error && error.message) || "Upload failed"
    });
  }
};
