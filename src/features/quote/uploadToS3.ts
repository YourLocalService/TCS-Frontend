const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

/**
 * Two-step upload: ask the backend for a presigned S3 PUT URL, then send the
 * file straight to S3. Only the returned key is stored on the quote.
 *
 * The presigned URL is short-lived (60s), so upload immediately after asking.
 */
export async function uploadToS3(file: File): Promise<string> {
  const presignedRes = await fetch(
    `${API_BASE_URL}/api/upload/${encodeURIComponent(file.name)}`,
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

  return file.name;
}
