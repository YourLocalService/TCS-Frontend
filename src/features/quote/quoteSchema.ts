import type { FormErrors, QuoteFormData } from "./types";
import type { Dictionary } from "@/i18n/dictionaries";

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isValidPhone(phone: string): boolean {
  return /^[\d\s\-()+ ]{7,20}$/.test(phone);
}

/**
 * Mirrors the server's bean validation on QuoteRequest so the visitor sees
 * problems inline instead of a generic 400.
 *
 * One deliberate difference: `phone` is optional on the server but required
 * here. A construction quote that can't be called back is not much use, and
 * being stricter than the API can only reject payloads the API would too.
 */
export function validateQuoteForm(
  data: Partial<QuoteFormData>,
  t: Dictionary["quote"],
): FormErrors {
  const errors: FormErrors = {};

  // client
  if (!data.firstName?.trim()) errors.firstName = t.errFirstName;
  if (!data.lastName?.trim()) errors.lastName = t.errLastName;

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

  // services — @NotEmpty, max 20
  if (!data.serviceIds || data.serviceIds.length === 0) {
    errors.services = t.errService;
  }

  // location — city/street/postalCode are @NotBlank on the server
  if (!data.city?.trim()) errors.city = t.errCity;
  if (!data.street?.trim()) errors.street = t.errStreet;
  if (!data.postalCode?.trim()) errors.postalCode = t.errPostal;

  return errors;
}

export function hasErrors(errors: FormErrors): boolean {
  return Object.values(errors).some((e) => e !== undefined);
}

export function getInitialFormData(): QuoteFormData {
  return {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    serviceIds: [],
    country: "CANADA",
    provinceState: "ON",
    city: "",
    street: "",
    postalCode: "",
    description: "",
    pictureKeys: [],
  };
}
