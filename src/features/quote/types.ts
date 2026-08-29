import { services } from "@/data/site";

/**
 * Request body for POST /api/email/form (backend `QuoteDto`).
 * Field names are snake_case where the record is — do not rename.
 */
export interface QuoteFormData {
  name: string;
  lastname: string;
  email: string;
  phone: string;
  workType: string;
  service: string[];
  country: string;
  town: string;
  street: string;
  postal_code: string;
  description: string;
  images?: string[];
}

/** Response body of POST /api/email/form (backend `EmailDto`). */
export interface QuoteResponse {
  to: string;
  message: string;
}

export interface FormErrors {
  [key: string]: string | undefined;
}

export type FormStatus = "idle" | "submitting" | "success" | "error";

/** Backend `Country` enum — Country.valueOf() throws on anything else. */
export const countries = ["CANADA", "USA"] as const;

/**
 * The quote form offers the same service list the header nav does, plus the
 * facade work that only appears in the footer.
 *
 * `title` is the canonical English name and is what gets submitted, so the
 * business always receives one consistent vocabulary; `slug` keys the
 * translated label shown to the visitor.
 */
export type QuoteService = { slug: string; title: string };

export const quoteServices: QuoteService[] = [
  ...services.map((s) => ({ slug: s.slug, title: s.title })),
  { slug: "side", title: "Facade and finishing works" },
];
