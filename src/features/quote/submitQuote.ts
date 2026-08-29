import type { QuoteFormData, QuoteResponse } from "./types";
import type { Dictionary } from "@/i18n/dictionaries";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";
const QUOTE_ENDPOINT = "/api/email/form";

export interface SubmitResult {
  success: boolean;
  message: string;
  data?: QuoteResponse;
}

/** POST the quote to the Spring Boot backend, which stores it and emails both sides. */
export async function submitQuote(
  formData: QuoteFormData,
  t: Dictionary["quote"],
): Promise<SubmitResult> {
  try {
    const response = await fetch(`${API_BASE_URL}${QUOTE_ENDPOINT}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      if (response.status === 400) {
        return {
          success: false,
          message: t.errValidation,
        };
      }
      if (response.status === 429) {
        return {
          success: false,
          message: t.errRate,
        };
      }
      if (response.status >= 500) {
        return {
          success: false,
          message: t.errServer,
        };
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
    return {
      success: false,
      message: t.errNetwork,
    };
  }
}
