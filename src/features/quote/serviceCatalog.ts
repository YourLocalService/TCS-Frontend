import type { ServiceSummary } from "./types";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

/** Organization slug this site submits under; scopes both API paths. */
export const ORG_SLUG = process.env.NEXT_PUBLIC_ORG_SLUG || "tcs";

/**
 * Backend service slug -> this site's route slug.
 *
 * The catalogue is authoritative for ids and English names, but its slugs were
 * coined server-side and don't match our routes ("waterproofing" vs
 * "hydro-isolation"). This map is what lets a catalogue entry pick up the
 * translated label from the i18n dictionary, which is keyed by route slug.
 */
export const BACKEND_TO_ROUTE_SLUG: Record<string, string> = {
  "repair-and-insulation-of-roofs": "mounting",
  "thermal-imaging-survey": "thermal",
  waterproofing: "hydro-isolation",
  "civil-works": "remont",
  "dismantling-work": "dismantling",
  "landscaping-and-interlocking": "landscaping-and-interlocking",
  "deck-and-fences": "deck",
  "retaining-walls": "walls",
  gazebo: "gazebo",
  "facade-and-finishing-works": "side",
};

/**
 * Fetch the organization's offerings.
 *
 * Without this the form has no valid `serviceId` values and the quote POST is
 * unusable, so it runs server-side on the quote page. Revalidated hourly: the
 * catalogue changes rarely, and this keeps the page static between changes
 * instead of hitting the API on every request.
 */
export async function fetchServiceCatalog(): Promise<ServiceSummary[]> {
  try {
    const res = await fetch(`${API_BASE_URL}/api/orgs/${ORG_SLUG}/services`, {
      next: { revalidate: 3600 },
    });
    if (!res.ok) {
      console.error(
        `Service catalogue fetch failed: ${res.status} ${res.statusText}`,
      );
      return [];
    }
    return (await res.json()) as ServiceSummary[];
  } catch (error) {
    console.error("Service catalogue unreachable:", error);
    return [];
  }
}
