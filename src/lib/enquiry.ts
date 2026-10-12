"use server";

import { CONTACT } from "@/content/site";

export type EnquiryState = {
  status: "idle" | "success" | "error";
  error?: "invalid" | "unavailable" | "failed";
};

const FIELDS = ["name", "email", "phone", "type", "location", "message", "locale"] as const;

/*
 * Slanje upita sa kontakt forme na email studija (preko Resend API-ja).
 * Potrebne promenljive okruženja:
 *   RESEND_API_KEY      — ključ sa resend.com
 *   CONTACT_TO_EMAIL    — adresa na koju stižu upiti (podrazumevano CONTACT.email)
 *   CONTACT_FROM_EMAIL  — pošiljalac sa verifikovanog domena, npr. "A Point <website@domen.com>"
 * Dok nisu podešene, u razvoju se upit samo ispisuje u konzoli servera.
 */
export async function sendEnquiry(_prev: EnquiryState, formData: FormData): Promise<EnquiryState> {
  // Polje koje ljudi ne vide — popunjavaju ga samo botovi.
  if (String(formData.get("company") ?? "")) return { status: "success" };

  const data = Object.fromEntries(
    FIELDS.map((key) => [key, String(formData.get(key) ?? "").trim().slice(0, key === "message" ? 5000 : 200)]),
  ) as Record<(typeof FIELDS)[number], string>;

  if (!data.name || !data.message || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    return { status: "error", error: "invalid" };
  }

  const key = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL || CONTACT.email;

  if (!key || !to) {
    if (process.env.NODE_ENV !== "production") {
      console.info("[enquiry] (slanje nije podešeno — upit samo ispisan)", data);
      return { status: "success" };
    }
    console.error("[enquiry] RESEND_API_KEY / CONTACT_TO_EMAIL nisu podešeni");
    return { status: "error", error: "unavailable" };
  }

  const text = [
    `Name: ${data.name}`,
    `Email: ${data.email}`,
    `Phone: ${data.phone || "—"}`,
    `Project type: ${data.type || "—"}`,
    `Location: ${data.location || "—"}`,
    `Language: ${data.locale || "—"}`,
    "",
    data.message,
  ].join("\n");

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: process.env.CONTACT_FROM_EMAIL || "A Point website <onboarding@resend.dev>",
        to: [to],
        reply_to: data.email,
        subject: `Website enquiry — ${data.name}${data.type ? ` (${data.type})` : ""}`,
        text,
      }),
    });
    if (!res.ok) {
      console.error("[enquiry] Resend:", res.status, await res.text());
      return { status: "error", error: "failed" };
    }
    return { status: "success" };
  } catch (err) {
    console.error("[enquiry]", err);
    return { status: "error", error: "failed" };
  }
}
