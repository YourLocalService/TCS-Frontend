/**
 * Types for POST /api/orgs/{slug}/quotes.
 *
 * These mirror the backend records one-for-one (QuoteRequest, ClientRequest,
 * LocationRequest, QuoteLineItemRequest, QuoteResponse). The old flat
 * `/api/email/form` payload is gone — that endpoint still exists but is
 * `@Deprecated` and only kept for frontends that haven't migrated.
 */

/** Backend `Country` enum — anything else fails Country.valueOf(). */
export const countries = ["CANADA", "USA"] as const;
export type Country = (typeof countries)[number];

/** Backend `QuoteStatus`. */
export type QuoteStatus =
  | "SUBMITTED"
  | "SENT"
  | "ACCEPTED"
  | "DECLINED"
  | "EXPIRED";

export interface ClientRequest {
  firstName: string;
  lastName: string;
  email: string;
  /** Optional server-side, max 32 chars. */
  phone?: string;
}

export interface LocationRequest {
  country: Country;
  /** Optional server-side, max 100 chars. */
  provinceState?: string;
  city: string;
  street: string;
  postalCode: string;
}

export interface QuoteLineItemRequest {
  serviceId: number;
  /** @Min(1) @Max(999) on the server. */
  quantity: number;
  description?: string;
}

export interface QuoteRequest {
  client: ClientRequest;
  location: LocationRequest;
  /** @NotEmpty, max 20 items. */
  services: QuoteLineItemRequest[];
  description?: string;
  /** S3 object keys, max 20, each max 1024 chars. */
  pictureKeys?: string[];
}

export interface ClientSummary extends ClientRequest {
  id: number;
}

export interface LocationSummary extends LocationRequest {
  id: number;
}

export interface QuoteLineItemResponse {
  id: number;
  serviceId: number;
  serviceName: string;
  serviceSlug: string;
  unitPrice: number | null;
  quantity: number;
  lineTotal: number | null;
  description: string | null;
}

export interface QuoteResponse {
  id: number;
  organizationSlug: string;
  status: QuoteStatus;
  createdAt: string;
  expiresAt: string | null;
  client: ClientSummary;
  location: LocationSummary;
  services: QuoteLineItemResponse[];
  description: string | null;
  pictureKeys: string[];
}

/** One offering from GET /api/orgs/{slug}/services. */
export interface ServiceSummary {
  id: number;
  name: string;
  slug: string;
  description: string | null;
}

/** Flat shape the form holds; mapped onto QuoteRequest on submit. */
export interface QuoteFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  /** Selected catalogue service ids. */
  serviceIds: number[];
  country: Country;
  provinceState: string;
  city: string;
  street: string;
  postalCode: string;
  description: string;
  pictureKeys: string[];
}

export interface FormErrors {
  [key: string]: string | undefined;
}

export type FormStatus = "idle" | "submitting" | "success" | "error";
