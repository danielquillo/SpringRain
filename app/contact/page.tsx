import Link from "next/link"

const COMPANY = "Spring Rain Lawn Sprinkler Inc.";
const PHONE_DISPLAY = "847-322-5748";
const PHONE_TEL = "8473225748";

export const metadata = {
  title: `Contact | ${COMPANY}`,
  description:
    "Request a quote for irrigation, outdoor lighting, or snow removal in Chicago North's Suburbs",
};

export default function ContactPage() {
  return (
    <div className="bg-[--bg] text-[--fg]">
      <section className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8 pt-12 pb-6">
        <div className="max-w-2xl">
          <h1 className="text-[34px]/[1.1] md:text-[48px]/[1.05] font-semibold tracking-tight">
            Contact
          </h1>
          <p className="mt-3 text-[15px] md:text-[16px] text-neutral-600">
            Fast quotes for irrigation, outdoor lighting, and winter snow removal.
          </p>
        </div>

        <div className="mt-6 grid gap-3 sm:grid-cols-3">
          <a
            href={`tel:${PHONE_TEL}`}
            className="h-12 rounded-2xl bg-neutral-900 text-white text-[15px] font-medium flex items-center justify-center hover:opacity-95"
          >
            Call {PHONE_DISPLAY}
          </a>
          <a
          href={`sms:${PHONE_TEL}`}
          className="h-12 rounded-2xl border border-[var(--border)] bg-white text-neutral-900 text-[15px] font-medium flex items-center justify-center hover:bg-neutral-50"
          >
            Text
          </a>
          <a
          href={`sms:${PHONE_TEL}`}
          className="h-12 rounded-2xl border border-[var(--border)] bg-white text-neutral-900 text-[15px] font-medium flex items-center justify-center hover:bg-neutral-50"
          >
            Request a quote
          </a>
        </div>
      </section>
      <section className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8 pb-16">
        <div className="grid gap-6 lg:grid-cols-12">
          <div id="quote" className="lg:col-span-7">
            <div className="rounded-3xl border border-[var(--border)] bg-white p-6 sm:p-8 shadow-sm">
              <h2 className="text-xl font-semibold tracking-tight">Request a quote</h2>
              <p className="mt-1 text-sm text-neutral-600">
                Include your city/ZIP for fastest scheduling.
              </p>

              <form action="/api/contact" method="post" className="mt-6 grid grid-cols-1 gap-3">
                <div className="grid gap-3 sm:grid-cols-2">
                  <input
                    name="name"
                    required
                    placeholder="Your name"
                    className="h-12 rounded-xl border border-neutral-300 bg-white px-3 text-[16px] outline-none focus:ring-2 focus:ring-neutral-800"
                  />
                  <input
                    name="phone"
                    required
                    inputMode="tel"
                    placeholder="Phone"
                    className="h-12 rounded-xl border border-neutral-300 bg-white px-3 text-[16px] outline-none focus:ring-2 focus:ring-neutral-800"
                  />
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  <input
                    name="city"
                    placeholder="City (optional)"
                    className="h-12 rounded-xl border border-neutral-300 bg-white px-3 text-[16px] outline-none focus:ring-2 focus:ring-neutral-800"
                  />
                  <input
                    name="zip"
                    inputMode="numeric"
                    placeholder="ZIP (optional)"
                    className="h-12 rounded-xl border border-neutral-300 bg-white px-3 text-[16px] outline-none focus:ring-2 focus:ring-neutral-800"
                  />
                </div>

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

                <textarea
                  name="message"
                  rows={5}
                  placeholder="Briefly describe what you need…"
                  className="rounded-xl border border-neutral-300 bg-white px-3 py-3 text-[16px] outline-none focus:ring-2 focus:ring-neutral-800"
                />

                <button
                  type="submit"
                  className="h-12 rounded-xl bg-neutral-900 text-white text-[16px] font-medium hover:opacity-95 active:opacity-90"
                >
                  Send request
                </button>

                <p className="text-[12px] text-neutral-500">
                  By submitting, you agree we may contact you by phone/text to coordinate service.
                </p>
              </form>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="rounded-3xl border border-[var(--border)] bg-[var(--card)] p-6 sm:p-8">
              <h2 className="text-xl font-semibold tracking-tight">Quick Info</h2>

              <div className="mt-4 space-y-3 text-[14px] text-neutral-700">
                <div className="rounded-2xl border border-[var(--border)] bg-white p-4">
                  <p className="font-semibold">Phone</p>
                  <a className="mt-1 inline-block underline underline-offset-4" href={`tel:${PHONE_TEL}`}>
                    {PHONE_DISPLAY}
                  </a>
                </div>

                <div className="rounded-2xl border border-[var(--border)] bg-white p-4">
                  <p className="font-semibold">Typical hours</p>
                  <p className="mt-1 text-neutral-600">Mon–Sat: 9:00am–5:00pm</p>
                  <p className="mt-1 text-neutral-600">Seasonal service available</p>
                </div>

                <div className="rounded-2xl border border-[var(--border)] bg-white p-4">
                  <p className="font-semibold">Service area</p>
                  <p className="mt-1 text-neutral-600">Chicago’s North Shore + nearby suburbs.</p>
                  <Link href="/service-areas" className="mt-2 inline-block underline underline-offset-4">
                    View service areas →
                  </Link>
                </div>
              </div>

              <div className="mt-5 rounded-2xl overflow-hidden border border-[var(--border)] bg-white">
                <iframe
                  title="Service area map"
                  className="w-full h-[240px]"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  src="https://www.google.com/maps?q=Northbrook,+IL&output=embed"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
