"use client"

import { useState } from "react";

type Status = "idle" | "sending" | "sent" | "error";

export default function QuoteForm({ className = "" }: { className?: string }) {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    setError("");

    const formEl = e.currentTarget;
    const form = new FormData(formEl);

    const payload = {
      name: String(form.get("name") || "").trim(),
      email: String(form.get("email") || "").trim(),
      phone: String(form.get("phone") || "").trim(),
      city: String(form.get("city") || "").trim(),
      zip: String(form.get("zip") || "").trim(),
      service: String(form.get("service") || "").trim(),
      message: String(form.get("message") || "").trim(),

      //honeypot field (hidden)
      company: String(form.get("company") || "").trim(),
    };

    const res = await fetch("/.netlify/functions/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const json = await res.json().catch(() => ({}));

    if (res.ok && json.ok) {
      setStatus("sent");
      formEl.reset();
      return;
    }

    setStatus("error");
    setError(json.error || "Something went wrong.");
  }

  return (
    <form onSubmit={onSubmit} className={`mt-6 grid grid-cols-1 gap-3 ${className}`}>
      {/* Honeypot (spam trap) */}
      <input name="company" tabIndex={-1} autoComplete="off" className="hidden" />

      <div className="grid gap-3 sm:grid-cols-2">
        <input
          name="name"
          required
          placeholder="Your name"
          className="h-12 rounded-xl border border-neutral-300 bg-white px-3 text-[16px] outline-none focus:ring-2 focus:ring-neutral-800"
        />
        <input
          name="email"
          required
          type="email"
          placeholder="Email"
          className="h-12 rounded-xl border border-neutral-300 bg-white px-3 text-[16px] outline-none focus:ring-2 focus:ring-neutral-800"
        />
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <input
          name="phone"
          required
          inputMode="tel"
          placeholder="Phone"
          className="h-12 rounded-xl border border-neutral-300 bg-white px-3 text-[16px] outline-none focus:ring-2 focus:ring-neutral-800"
        />
        <input
          name="city"
          placeholder="City (optional)"
          className="h-12 rounded-xl border border-neutral-300 bg-white px-3 text-[16px] outline-none focus:ring-2 focus:ring-neutral-800"
        />
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <input
          name="zip"
          inputMode="numeric"
          placeholder="ZIP (optional)"
          className="h-12 rounded-xl border border-neutral-300 bg-white px-3 text-[16px] outline-none focus:ring-2 focus:ring-neutral-800"
        />
        <select
          name="service"
          required
          defaultValue=""
          className="h-12 rounded-xl border border-neutral-300 bg-white px-3 text-[16px] outline-none focus:ring-2 focus:ring-neutral-800"
        >
          <option value="" disabled>
            What do you need help with?
          </option>
          <option value="Irrigation & Sprinklers">Irrigation & Sprinklers</option>
          <option value="Outdoor Lighting">Outdoor Lighting</option>
          <option value="Snow Removal">Snow Removal</option>
        </select>
      </div>

      <textarea
        name="message"
        rows={5}
        placeholder="Briefly describe what you need…"
        className="rounded-xl border border-neutral-300 bg-white px-3 py-3 text-[16px] outline-none focus:ring-2 focus:ring-neutral-800"
      />

      <button
        type="submit"
        disabled={status === "sending"}
        className="h-12 rounded-xl bg-neutral-900 text-white text-[16px] font-medium hover:opacity-95 active:opacity-90 disabled:opacity-60"
      >
        {status === "sending" ? "Sending..." : "Send request"}
      </button>

      {status === "sent" && (
        <p className="text-[13px] text-green-700">
          Sent! We received your request and will get back to you soon.
        </p>
      )}
      {status === "error" && <p className="text-[13px] text-red-700">{error}</p>}

      <p className="text-[12px] text-neutral-500">
        By submitting, you agree we may contact you by phone/text to coordinate service.
      </p>
    </form>
  );
}
