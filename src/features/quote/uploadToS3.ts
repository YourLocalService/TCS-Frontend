import { ORG_SLUG } from "./serviceCatalog";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

/** Response of POST /api/orgs/{slug}/uploads. */
interface UploadTarget {
  /** Server-built object key, e.g. orgs/tcs/{uuid}-roof-photo.jpg */
  key: string;
  /** Presigned S3 PUT URL for that key. */
  url: string;
}

/**
 * Two-step upload: ask the backend to mint an upload target, then send the file
 * straight to S3. Only the key travels with the quote, as `pictureKeys`.
 *
 * The client deliberately names nothing but the file. The backend derives the
 * key from the org slug in the path it already validates and a UUID it
 * generates, so a caller cannot address another organization's prefix, and the
 * key never has to survive a URL path segment — Tomcat rejects the `%2F` a
 * prefixed key would need.
 */
export async function uploadToS3(file: File): Promise<string> {
  const targetRes = await fetch(`${API_BASE_URL}/api/orgs/${ORG_SLUG}/uploads`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ fileName: file.name }),
  });

  if (!targetRes.ok) {
    throw new Error("Failed to get an upload URL");
  }

  const target = (await targetRes.json()) as Partial<UploadTarget>;
  if (!target.key || !target.url) {
    throw new Error("Upload target missing from response");
  }

  const uploadRes = await fetch(target.url, {
    method: "PUT",
    body: file,
    headers: { "Content-Type": file.type || "application/octet-stream" },
  });

  if (!uploadRes.ok) {
    throw new Error("Failed to upload the file");
  }

  return target.key;
}
