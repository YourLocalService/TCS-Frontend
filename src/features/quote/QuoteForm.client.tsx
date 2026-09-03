"use client";

import { useState } from "react";
import { submitQuote } from "./submitQuote";
import { uploadToS3 } from "./uploadToS3";
import { getInitialFormData, hasErrors, validateQuoteForm } from "./quoteSchema";
import { BACKEND_TO_ROUTE_SLUG } from "./serviceCatalog";
import { countries } from "./types";
import type {
  FormErrors,
  FormStatus,
  QuoteFormData,
  ServiceSummary,
} from "./types";
import type { Dictionary } from "@/i18n/dictionaries";

const FIELD =
  "w-full border border-black/20 bg-white px-[18px] py-[14px] text-[16px] text-black outline-none transition-colors placeholder:text-black/35 focus:border-navy-light";
const LABEL = "mb-[10px] block text-[14px] uppercase tracking-wide text-black/60";
const ERROR = "mt-[6px] block text-[13px] text-[#b3261e]";

export default function QuoteForm({
  dict: t,
  serviceNames,
  catalog,
}: {
  dict: Dictionary["quote"];
  serviceNames: Dictionary["services"];
  /** Offerings from GET /api/orgs/{slug}/services — the source of serviceId. */
  catalog: ServiceSummary[];
}) {
  const [form, setForm] = useState<QuoteFormData>(getInitialFormData);
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<FormStatus>("idle");
  const [message, setMessage] = useState("");
  const [files, setFiles] = useState<File[]>([]);
  const [uploadNote, setUploadNote] = useState("");

  const set = <K extends keyof QuoteFormData>(key: K, value: QuoteFormData[K]) => {
    setForm((f) => ({ ...f, [key]: value }));
    setErrors((e) => ({ ...e, [key]: undefined }));
  };

  const toggleService = (id: number) => {
    setForm((f) => ({
      ...f,
      serviceIds: f.serviceIds.includes(id)
        ? f.serviceIds.filter((s) => s !== id)
        : [...f.serviceIds, id],
    }));
    setErrors((e) => ({ ...e, services: undefined }));
  };

  /** Catalogue name is canonical English; show the translated label when we
   *  can map its slug onto one of our routes. */
  const labelFor = (service: ServiceSummary) => {
    const routeSlug = BACKEND_TO_ROUTE_SLUG[service.slug];
    const translated = routeSlug
      ? serviceNames[routeSlug as keyof typeof serviceNames]
      : undefined;
    return translated ?? service.name;
  };

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();

    const found = validateQuoteForm(form, t);
    setErrors(found);
    if (hasErrors(found)) {
      setStatus("error");
      setMessage(t.errFix);
      return;
    }

    setStatus("submitting");
    setMessage("");

    // Photos go straight to S3; only the keys travel with the quote.
    let pictureKeys: string[] = [];
    if (files.length > 0) {
      setUploadNote(t.uploading);
      try {
        pictureKeys = await Promise.all(files.map(uploadToS3));
      } catch {
        setUploadNote("");
        setStatus("error");
        setMessage(t.errUpload);
        return;
      }
      setUploadNote("");
    }

    const result = await submitQuote({ ...form, pictureKeys }, t);
    setStatus(result.success ? "success" : "error");
    setMessage(result.message);

    if (result.success) {
      setForm(getInitialFormData());
      setFiles([]);
    }
  }

  if (status === "success") {
    return (
      <div className="mx-auto mt-[60px] max-w-[760px] border border-black/10 bg-gold/20 px-[40px] py-[60px] text-center">
        <h2 className="font-serif text-[32px] font-normal text-black">
          {t.successTitle}
        </h2>
        <p className="mt-[20px] text-[18px] leading-[30.6px] text-black">{message}</p>
        <button
          onClick={() => {
            setStatus("idle");
            setMessage("");
          }}
          className="btn-shine mt-[40px] inline-block bg-gold px-[60px] py-[22px] text-[18px] font-medium uppercase text-black transition-colors hover:bg-gold-dark"
        >
          {t.sendAnother}
        </button>
      </div>
    );
  }

  // Without a catalogue there are no valid serviceId values, so the quote POST
  // cannot succeed. Say so rather than showing a form that will always fail.
  if (catalog.length === 0) {
    return (
      <p className="mx-auto mt-[60px] max-w-[760px] border-l-[3px] border-[#b3261e] bg-[#b3261e]/5 px-[20px] py-[14px] text-center text-[16px] text-[#b3261e]">
        {t.catalogUnavailable}
      </p>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="mx-auto mt-[65px] max-w-[960px]">
      <div className="grid grid-cols-2 gap-x-[30px] gap-y-[30px] max-md:grid-cols-1">
        <div>
          <label className={LABEL} htmlFor="firstName">{t.firstName} *</label>
          <input
            id="firstName" className={FIELD} value={form.firstName}
            onChange={(e) => set("firstName", e.target.value)}
          />
          {errors.firstName && <span className={ERROR}>{errors.firstName}</span>}
        </div>

        <div>
          <label className={LABEL} htmlFor="lastName">{t.lastName} *</label>
          <input
            id="lastName" className={FIELD} value={form.lastName}
            onChange={(e) => set("lastName", e.target.value)}
          />
          {errors.lastName && <span className={ERROR}>{errors.lastName}</span>}
        </div>

        <div>
          <label className={LABEL} htmlFor="email">{t.email} *</label>
          <input
            id="email" type="email" className={FIELD} value={form.email}
            onChange={(e) => set("email", e.target.value)} placeholder="you@example.com"
          />
          {errors.email && <span className={ERROR}>{errors.email}</span>}
        </div>

        <div>
          <label className={LABEL} htmlFor="phone">{t.phone} *</label>
          <input
            id="phone" type="tel" className={FIELD} value={form.phone}
            onChange={(e) => set("phone", e.target.value)} placeholder="+1 647 809 7778"
          />
          {errors.phone && <span className={ERROR}>{errors.phone}</span>}
        </div>
      </div>

      <fieldset className="mt-[50px]">
        <legend className="font-serif text-[24px] font-normal text-black">
          {t.servicesLegend} *
        </legend>
        <div className="mt-[25px] grid grid-cols-3 gap-x-[30px] gap-y-[16px] max-lg:grid-cols-2 max-md:grid-cols-1">
          {catalog.map((service) => (
            <label
              key={service.id}
              className="flex cursor-pointer items-start gap-[12px] text-[16px] leading-[24px] text-black"
            >
              <input
                type="checkbox"
                checked={form.serviceIds.includes(service.id)}
                onChange={() => toggleService(service.id)}
                className="mt-[3px] h-[18px] w-[18px] shrink-0 accent-[#222e55]"
              />
              {labelFor(service)}
            </label>
          ))}
        </div>
        {errors.services && <span className={ERROR}>{errors.services}</span>}
      </fieldset>

      <fieldset className="mt-[50px]">
        <legend className="font-serif text-[24px] font-normal text-black">
          {t.locationLegend}
        </legend>
        <div className="mt-[25px] grid grid-cols-2 gap-x-[30px] gap-y-[30px] max-md:grid-cols-1">
          <div>
            <label className={LABEL} htmlFor="country">{t.country} *</label>
            <select
              id="country" className={FIELD} value={form.country}
              onChange={(e) => set("country", e.target.value as QuoteFormData["country"])}
            >
              {countries.map((c) => (
                <option key={c} value={c}>
                  {c === "CANADA" ? "Canada" : "USA"}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className={LABEL} htmlFor="provinceState">{t.provinceState}</label>
            <input
              id="provinceState" className={FIELD} value={form.provinceState}
              onChange={(e) => set("provinceState", e.target.value)} placeholder="ON"
            />
          </div>

          <div>
            <label className={LABEL} htmlFor="city">{t.town} *</label>
            <input
              id="city" className={FIELD} value={form.city}
              onChange={(e) => set("city", e.target.value)} placeholder="Toronto"
            />
            {errors.city && <span className={ERROR}>{errors.city}</span>}
          </div>

          <div>
            <label className={LABEL} htmlFor="street">{t.street} *</label>
            <input
              id="street" className={FIELD} value={form.street}
              onChange={(e) => set("street", e.target.value)}
              placeholder="4548 Dufferin St."
            />
            {errors.street && <span className={ERROR}>{errors.street}</span>}
          </div>

          <div>
            <label className={LABEL} htmlFor="postalCode">{t.postal} *</label>
            <input
              id="postalCode" className={FIELD} value={form.postalCode}
              onChange={(e) => set("postalCode", e.target.value)} placeholder="M3H 5R9"
            />
            {errors.postalCode && <span className={ERROR}>{errors.postalCode}</span>}
          </div>
        </div>
      </fieldset>

      <div className="mt-[50px]">
        <label className={LABEL} htmlFor="description">{t.description}</label>
        <textarea
          id="description" rows={6} className={`${FIELD} resize-y`}
          value={form.description}
          onChange={(e) => set("description", e.target.value)}
          placeholder={t.descriptionPlaceholder}
          maxLength={4000}
        />
      </div>

      <div className="mt-[40px]">
        <label className={LABEL} htmlFor="photos">{t.photos}</label>
        <input
          id="photos" type="file" accept="image/*" multiple
          onChange={(e) => setFiles(Array.from(e.target.files ?? []).slice(0, 20))}
          className="block w-full text-[16px] text-black file:mr-4 file:border-0 file:bg-navy-light file:px-[24px] file:py-[12px] file:text-[14px] file:uppercase file:text-white hover:file:bg-navy"
        />
        {files.length > 0 && (
          <p className="mt-[10px] text-[14px] text-black/60">
            {files.length} {t.filesSelected}
          </p>
        )}
      </div>

      {message && status === "error" && (
        <p className="mt-[30px] border-l-[3px] border-[#b3261e] bg-[#b3261e]/5 px-[20px] py-[14px] text-[16px] text-[#b3261e]">
          {message}
        </p>
      )}

      <div className="mt-[50px] flex items-center gap-[24px] max-md:flex-col max-md:items-start">
        <button
          type="submit"
          disabled={status === "submitting"}
          className="btn-shine inline-block bg-gold px-[60px] py-[22px] text-[18px] font-medium uppercase text-black transition-colors hover:bg-gold-dark disabled:cursor-not-allowed disabled:opacity-60"
        >
          {status === "submitting" ? t.submitting : t.submit}
        </button>
        {uploadNote && <span className="text-[14px] text-black/60">{uploadNote}</span>}
      </div>
    </form>
  );
}
