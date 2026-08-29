"use client";

import { useState } from "react";

export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sent">("idle");

  return (
    <form
      className="space-y-4"
      onSubmit={(e) => {
        e.preventDefault();
        // TODO: wire this up to a real form endpoint (e.g. an API route that
        // sends email, or a service like Formspree) — this is a front-end-only
        // placeholder so the clone has no working backend yet.
        setStatus("sent");
      }}
    >
      <div>
        <label className="mb-1 block text-sm font-medium text-ink/70">
          Name
        </label>
        <input
          required
          type="text"
          className="w-full rounded-md border border-black/10 px-4 py-3 text-sm outline-none focus:border-navy"
        />
      </div>
      <div>
        <label className="mb-1 block text-sm font-medium text-ink/70">
          Phone
        </label>
        <input
          required
          type="tel"
          className="w-full rounded-md border border-black/10 px-4 py-3 text-sm outline-none focus:border-navy"
        />
      </div>
      <div>
        <label className="mb-1 block text-sm font-medium text-ink/70">
          Message
        </label>
        <textarea
          rows={4}
          className="w-full rounded-md border border-black/10 px-4 py-3 text-sm outline-none focus:border-navy"
        />
      </div>
      <button
        type="submit"
        className="btn-shine w-full bg-gold px-8 py-4 text-[18px] font-medium uppercase text-black transition-colors hover:bg-gold-dark"
      >
        Get a Free Consultation
      </button>
      {status === "sent" && (
        <p className="text-sm text-green-700">
          Thanks! This demo form doesn&apos;t send yet — connect it to an email
          service to go live.
        </p>
      )}
    </form>
  );
}
