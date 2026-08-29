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
 */
export const quoteServices: string[] = [
  ...services.map((s) => s.title),
  "Facade and finishing works",
];
