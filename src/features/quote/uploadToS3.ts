const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

/** Max key length accepted by QuoteRequest.pictureKeys. */
const MAX_KEY_LENGTH = 1024;

/**
 * Build a collision-proof object key.
 *
 * The backend presigns whatever name it is handed and stores objects at the
 * bucket root, so two visitors uploading "photo.jpg" would overwrite one
 * another — the second quote's images would silently become the first's. The
 * key we ask to presign is ours to choose, so prefix it with a UUID.
 */
function buildKey(fileName: string): string {
  const safe = fileName
    .normalize("NFKD")
    .replace(/[^\w.\-]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(-120);
  const key = `${crypto.randomUUID()}-${safe || "upload"}`;
  return key.slice(0, MAX_KEY_LENGTH);
}

/**
 * Two-step upload: ask the backend for a presigned S3 PUT URL, then send the
 * file straight to S3. Only the key travels with the quote, as `pictureKeys`.
 *
 * The presigned URL is short-lived (60s), so upload immediately after asking.
 */
export async function uploadToS3(file: File): Promise<string> {
  const key = buildKey(file.name);

  const presignedRes = await fetch(
    `${API_BASE_URL}/api/upload/${encodeURIComponent(key)}`,
    { method: "GET" },
  );

  if (!presignedRes.ok) {
    throw new Error("Failed to get an upload URL");
  }

  const data: { url?: string } | string = await presignedRes.json();
  const uploadUrl = typeof data === "string" ? data : data.url;

  if (!uploadUrl) {
    throw new Error("Upload URL missing from response");
  }

  const uploadRes = await fetch(uploadUrl, {
    method: "PUT",
    body: file,
    headers: { "Content-Type": file.type || "application/octet-stream" },
  });

  if (!uploadRes.ok) {
    throw new Error("Failed to upload the file");
  }

  return key;
}
