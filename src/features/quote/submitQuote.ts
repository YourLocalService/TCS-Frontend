import type { QuoteFormData, QuoteResponse } from "./types";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";
const QUOTE_ENDPOINT = "/api/email/form";

export interface SubmitResult {
  success: boolean;
  message: string;
  data?: QuoteResponse;
}

/** POST the quote to the Spring Boot backend, which stores it and emails both sides. */
export async function submitQuote(formData: QuoteFormData): Promise<SubmitResult> {
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
          message: "Please check your details and try again.",
        };
      }
      if (response.status === 429) {
        return {
          success: false,
          message: "Too many requests. Please wait a moment and try again.",
        };
      }
      if (response.status >= 500) {
        return {
          success: false,
          message:
            "We couldn't submit your request right now. Please try again later, or call us directly.",
        };
      }
      return { success: false, message: "Something went wrong. Please try again." };
    }

    return {
      success: true,
      message: "Thank you — your request has been sent. We'll be in touch shortly.",
      data: (await response.json()) as QuoteResponse,
    };
  } catch (error) {
    console.error("Quote submission failed:", error);
    return {
      success: false,
      message:
        "Unable to reach the server. Please check your connection and try again.",
    };
  }
}
