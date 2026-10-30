"use server";

import { dictionary } from "@/content";
import { CONTACT } from "@/content/site";
import { readEnquiry, validateEnquiry, type EnquiryValues, type FieldErrors } from "./enquiry-rules";

export type EnquiryState = {
  status: "idle" | "success" | "error";
  error?: "invalid" | "unavailable" | "failed";
  fieldErrors?: FieldErrors;
  // Poslate vrednosti, da forma posle greške ne ostane prazna.
  values?: EnquiryValues;
};

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

  const data = readEnquiry(formData);
  // Vrsta projekta mora biti jedna od ponuđenih.
  if (!dictionary.contact.form.types.includes(data.type)) data.type = "";

  const fieldErrors = validateEnquiry(data);
  if (Object.keys(fieldErrors).length) {
    return { status: "error", error: "invalid", fieldErrors, values: data };
  }

  const key = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL || CONTACT.email;

  if (!key || !to) {
    if (process.env.NODE_ENV !== "production") {
      console.info("[enquiry] (slanje nije podešeno — upit samo ispisan)", data);
      return { status: "success" };
    }
    console.error("[enquiry] RESEND_API_KEY / CONTACT_TO_EMAIL nisu podešeni");
    return { status: "error", error: "unavailable", values: data };
  }

  const text = [
    `Name: ${data.name}`,
    `Email: ${data.email}`,
    `Phone: ${data.phone || "—"}`,
    `Project type: ${data.type || "—"}`,
    `Location: ${data.location || "—"}`,
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
      return { status: "error", error: "failed", values: data };
    }
    return { status: "success" };
  } catch (err) {
    console.error("[enquiry]", err);
    return { status: "error", error: "failed", values: data };
  }
}
