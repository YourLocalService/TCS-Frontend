import type { FormErrors, QuoteFormData } from "./types";

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isValidPhone(phone: string): boolean {
  return /^[\d\s\-()+ ]{7,20}$/.test(phone);
}

export function validateQuoteForm(data: Partial<QuoteFormData>): FormErrors {
  const errors: FormErrors = {};

  if (!data.name?.trim()) errors.name = "First name is required";
  if (!data.lastname?.trim()) errors.lastname = "Last name is required";

  if (!data.email?.trim()) {
    errors.email = "Email is required";
  } else if (!isValidEmail(data.email)) {
    errors.email = "Please enter a valid email address";
  }

  if (!data.phone?.trim()) {
    errors.phone = "Phone number is required";
  } else if (!isValidPhone(data.phone)) {
    errors.phone = "Please enter a valid phone number";
  }

  if (!data.service || data.service.length === 0) {
    errors.service = "Please select at least one service";
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
