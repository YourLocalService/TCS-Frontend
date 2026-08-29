import type { FormErrors, QuoteFormData } from "./types";
import type { Dictionary } from "@/i18n/dictionaries";

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isValidPhone(phone: string): boolean {
  return /^[\d\s\-()+ ]{7,20}$/.test(phone);
}

export function validateQuoteForm(
  data: Partial<QuoteFormData>,
  t: Dictionary["quote"],
): FormErrors {
  const errors: FormErrors = {};

  if (!data.name?.trim()) errors.name = t.errFirstName;
  if (!data.lastname?.trim()) errors.lastname = t.errLastName;

  if (!data.email?.trim()) {
    errors.email = t.errEmail;
  } else if (!isValidEmail(data.email)) {
    errors.email = t.errEmailInvalid;
  }

  if (!data.phone?.trim()) {
    errors.phone = t.errPhone;
  } else if (!isValidPhone(data.phone)) {
    errors.phone = t.errPhoneInvalid;
  }

  if (!data.service || data.service.length === 0) {
    errors.service = t.errService;
  }

  return errors;
}

export function hasErrors(errors: FormErrors): boolean {
  return Object.values(errors).some((e) => e !== undefined);
}

/**
 * `workType` is a fixed constant, not a user choice. The backend picks the
 * notification sender from a hardcoded workType -> email map in EmailService;
 * an unmapped value makes the sender null and the send fails. "Construction"
 * must therefore exist in that map — keep the two in sync.
 */
export const TCS_WORK_TYPE = "Construction";

export function getInitialFormData(): QuoteFormData {
  return {
    name: "",
    lastname: "",
    email: "",
    phone: "",
    workType: TCS_WORK_TYPE,
    service: [],
    country: "CANADA",
    town: "",
    street: "",
    postal_code: "",
    description: "",
    images: [],
  };
}
