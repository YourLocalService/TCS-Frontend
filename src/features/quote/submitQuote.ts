import { ORG_SLUG } from "./serviceCatalog";
import type { QuoteFormData, QuoteRequest, QuoteResponse } from "./types";
import type { Dictionary } from "@/i18n/dictionaries";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

export interface SubmitResult {
  success: boolean;
  message: string;
  data?: QuoteResponse;
}

/** Trim to undefined so optional fields are omitted rather than sent blank. */
function optional(value: string): string | undefined {
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : undefined;
}

/** Flat form state -> the nested QuoteRequest the API expects. */
export function buildQuoteRequest(form: QuoteFormData): QuoteRequest {
  return {
    client: {
      firstName: form.firstName.trim(),
      lastName: form.lastName.trim(),
      email: form.email.trim(),
      phone: optional(form.phone),
    },
    location: {
      country: form.country,
      provinceState: optional(form.provinceState),
      city: form.city.trim(),
      street: form.street.trim(),
      postalCode: form.postalCode.trim(),
    },
    // Quantity is always 1: this form asks which services are needed, not how
    // many of each. The field exists for priced, itemised quotes later.
    services: form.serviceIds.map((serviceId) => ({ serviceId, quantity: 1 })),
    description: optional(form.description),
    pictureKeys: form.pictureKeys.length > 0 ? form.pictureKeys : undefined,
  };
}

/**
 * POST the quote to the organization-scoped endpoint. The backend stores it and
 * emails both sides asynchronously, so a 201 means "received", not "emailed".
 */
export async function submitQuote(
  form: QuoteFormData,
  t: Dictionary["quote"],
): Promise<SubmitResult> {
  try {
    const response = await fetch(
      `${API_BASE_URL}/api/orgs/${ORG_SLUG}/quotes`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(buildQuoteRequest(form)),
      },
    );

    if (!response.ok) {
      if (response.status === 400) {
        return { success: false, message: t.errValidation };
      }
      if (response.status === 404) {
        // Unknown org slug or a service id that isn't in this org's catalogue.
        return { success: false, message: t.errServer };
      }
      if (response.status === 429) {
        return { success: false, message: t.errRate };
      }
      if (response.status >= 500) {
        return { success: false, message: t.errServer };
      }
      return { success: false, message: t.errGeneric };
    }

    return {
      success: true,
      message: t.successBody,
      data: (await response.json()) as QuoteResponse,
    };
  } catch (error) {
    console.error("Quote submission failed:", error);
    return { success: false, message: t.errNetwork };
  }
}
