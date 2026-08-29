"use client";

import { useState } from "react";
import { submitQuote } from "./submitQuote";
import { uploadToS3 } from "./uploadToS3";
import { getInitialFormData, hasErrors, validateQuoteForm } from "./quoteSchema";
import { countries, quoteServices } from "./types";
import type { FormErrors, FormStatus, QuoteFormData } from "./types";
import type { Dictionary } from "@/i18n/dictionaries";

const FIELD =
  "w-full border border-black/20 bg-white px-[18px] py-[14px] text-[16px] text-black outline-none transition-colors placeholder:text-black/35 focus:border-navy-light";
const LABEL = "mb-[10px] block text-[14px] uppercase tracking-wide text-black/60";
const ERROR = "mt-[6px] block text-[13px] text-[#b3261e]";

export default function QuoteForm({
  dict: t,
  serviceNames,
}: {
  dict: Dictionary["quote"];
  serviceNames: Dictionary["services"];
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

  const toggleService = (title: string) => {
    set(
      "service",
      form.service.includes(title)
        ? form.service.filter((s) => s !== title)
        : [...form.service, title],
    );
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
    let images: string[] = [];
    if (files.length > 0) {
      setUploadNote(t.uploading);
      try {
        images = await Promise.all(files.map(uploadToS3));
      } catch {
        setUploadNote("");
        setStatus("error");
        setMessage(t.errUpload);
        return;
      }
      setUploadNote("");
    }

    const result = await submitQuote({ ...form, images }, t);
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

  return (
    <form onSubmit={onSubmit} noValidate className="mx-auto mt-[65px] max-w-[960px]">
      <div className="grid grid-cols-2 gap-x-[30px] gap-y-[30px] max-md:grid-cols-1">
        <div>
          <label className={LABEL} htmlFor="name">{t.firstName} *</label>
          <input
            id="name" className={FIELD} value={form.name}
            onChange={(e) => set("name", e.target.value)}
          />
          {errors.name && <span className={ERROR}>{errors.name}</span>}
        </div>

        <div>
          <label className={LABEL} htmlFor="lastname">{t.lastName} *</label>
          <input
            id="lastname" className={FIELD} value={form.lastname}
            onChange={(e) => set("lastname", e.target.value)}
          />
          {errors.lastname && <span className={ERROR}>{errors.lastname}</span>}
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
          {quoteServices.map((s) => (
            <label
              key={s.slug}
              className="flex cursor-pointer items-start gap-[12px] text-[16px] leading-[24px] text-black"
            >
              <input
                type="checkbox"
                checked={form.service.includes(s.title)}
                onChange={() => toggleService(s.title)}
                className="mt-[3px] h-[18px] w-[18px] shrink-0 accent-[#222e55]"
              />
              {serviceNames[s.slug as keyof typeof serviceNames] ?? s.title}
            </label>
          ))}
        </div>
        {errors.service && <span className={ERROR}>{errors.service}</span>}
      </fieldset>

      <fieldset className="mt-[50px]">
        <legend className="font-serif text-[24px] font-normal text-black">
          {t.locationLegend}
        </legend>
        <div className="mt-[25px] grid grid-cols-2 gap-x-[30px] gap-y-[30px] max-md:grid-cols-1">
          <div>
            <label className={LABEL} htmlFor="country">{t.country}</label>
            <select
              id="country" className={FIELD} value={form.country}
              onChange={(e) => set("country", e.target.value)}
            >
              {countries.map((c) => (
                <option key={c} value={c}>
                  {c === "CANADA" ? "Canada" : "USA"}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className={LABEL} htmlFor="town">{t.town}</label>
            <input
              id="town" className={FIELD} value={form.town}
              onChange={(e) => set("town", e.target.value)} placeholder="Toronto"
            />
          </div>

          <div>
            <label className={LABEL} htmlFor="street">{t.street}</label>
            <input
              id="street" className={FIELD} value={form.street}
              onChange={(e) => set("street", e.target.value)}
              placeholder="4548 Dufferin St."
            />
          </div>

          <div>
            <label className={LABEL} htmlFor="postal">{t.postal}</label>
            <input
              id="postal" className={FIELD} value={form.postal_code}
              onChange={(e) => set("postal_code", e.target.value)} placeholder="M3H 5R9"
            />
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
        />
      </div>

      <div className="mt-[40px]">
        <label className={LABEL} htmlFor="photos">{t.photos}</label>
        <input
          id="photos" type="file" accept="image/*" multiple
          onChange={(e) => setFiles(Array.from(e.target.files ?? []))}
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
