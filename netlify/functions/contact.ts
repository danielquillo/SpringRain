import type { Handler } from "@netlify/functions";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function line(label: string, value: string) {
  const v = value.trim();
  return v ? `${label}: ${v}\n` : "";
}

export const handler: Handler = async (event) => {
  try {
    if (event.httpMethod !== "POST") {
      return { statusCode: 405, body: "Method Not Allowed" };
    }

    const contentType = event.headers["content-type"] || "";
    if (!contentType.includes("application/json")) {
      return { statusCode: 400, body: "Expected application/json" };
    }

    const data = JSON.parse(event.body || "{}");

    // Required
    const name = String(data.name || "").trim();
    const email = String(data.email || "").trim();
    const phone = String(data.phone || "").trim();
    const service = String(data.service || "").trim();
    const message = String(data.message || "").trim();

    //Optional
    const city = String(data.city || "").trim();
    const zip = String(data.zip || "").trim();


    // Honeypot (spam trap) — front-end should include this field hidden
    const company = String(data.company || "").trim();
    if (company.length > 0) {
      // Pretend success to avoid tipping off bots
      return { statusCode: 200, body: JSON.stringify({ ok: true }) };
    }

    // Validate required fields 
    if (!name || !email || !phone || !service || !message) {
      return {
        statusCode: 400,
        body: JSON.stringify({ ok: false, error: "Missing required fields." }),
      };
    }

    if (!isValidEmail(email)) {
      return {
        statusCode: 400,
        body: JSON.stringify({ ok: false, error: "Invalid email." }),
      };
    }

    // Safety limits (prevents abuse)
    if (message.length > 2000) {
      return {
        statusCode: 400,
        body: JSON.stringify({ ok: false, error: "Message too long." }),
      };
    }

    const OWNER_EMAIL = process.env.OWNER_EMAIL!;
    const FROM_EMAIL = process.env.FROM_EMAIL!; // must be verified in Resend
    const REPLY_TO = email;

    // owner email
    const ownerText = 
      `New website inquiry\n\n` + 
      line("Name", name) + 
      line("Email", email) + 
      line("Phone", phone) + 
      line("Service", service) + 
      line("City", city) + 
      line("ZIP", zip) +
      `\nMessage:\n${message || "(no message provided)"}\n`;
    
    // customer confirmation email
    const customerText = 
      `Hi ${name}, \n\n` + 
      `Thanks for reaching out to SpringRain! We received your request` + 
      (service ? ` for ${service}` : "") + 
      ` and will get back to you soon.\n\n` + 
      (phone ? `We may contact you at: ${phone}\n\n` : "") +
      (message ? `Your message:\n${message}\n\n` : "") + 
      `- SpringRain\n`;

    // Send owner notification + customer confirmation
    const [ownerResult, customerResult] = await Promise.all([
      resend.emails.send({
        from: FROM_EMAIL,
        to: OWNER_EMAIL,
        replyTo: REPLY_TO,
        subject: `New website inquiry: ${service} - ${name}`,
        text: ownerText,
      }),
      resend.emails.send({
        from: FROM_EMAIL,
        to: email,
        subject: "We received your request - SpringRain",
        text: customerText,
      }),
    ]);

    if (ownerResult.error) {
      console.error("Owner email failed:", ownerResult.error);
      return { statusCode: 502, body: JSON.stringify({ ok: false, error: ownerResult.error.message }) };
    }

    if (customerResult.error) {
      console.error("Customer email failed:", customerResult.error);
      // You can decide: treat as failure, OR still succeed but warn
      return { statusCode: 502, body: JSON.stringify({ ok: false, error: customerResult.error.message }) };
    }

    console.log("Resend ownerResult:", ownerResult);
    console.log("Resend customerResult", customerResult);

    return { statusCode: 200, body: JSON.stringify({ ok: true }) };
  } catch (err: any) {
    console.error("contact function error:", err);
    return {
      statusCode: 500,
      body: JSON.stringify({ ok: false, error: "Server error." }),
    };
  }
};
