"use client";

import Link from "next/link";
import { useActionState, type InputHTMLAttributes } from "react";
import type { Dictionary } from "@/content";
import type { Locale } from "@/content/site";
import { sendEnquiry, type EnquiryState } from "@/lib/enquiry";
import { Arrow } from "./ui";
import styles from "./EnquiryForm.module.scss";

type Form = Dictionary["contact"]["form"];

const initial: EnquiryState = { status: "idle" };

function Field({
  label,
  full,
  ...input
}: { label: string; full?: boolean } & InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label className={`${styles.field} ${full ? styles.full : ""}`}>
      <span className={styles.caption}>
        {label}
        {input.required && <span aria-hidden="true"> *</span>}
      </span>
      <input {...input} />
    </label>
  );
}

/** Kontakt forma: šalje upit serveru (lib/enquiry.ts), koji ga prosleđuje na email studija. */
export default function EnquiryForm({ locale, form, privacyHref }: { locale: Locale; form: Form; privacyHref: string }) {
  const [state, action, pending] = useActionState(sendEnquiry, initial);
  const { fields } = form;

  if (state.status === "success") {
    return (
      <div className={styles.success} role="status">
        <p className={styles.successTitle}>{form.success.title}</p>
        <p>{form.success.text}</p>
      </div>
    );
  }

  return (
    <form className={styles.form} action={action}>
      <input type="hidden" name="locale" value={locale} />
      {/* Zamka za botove: ljudi ovo polje ne vide. */}
      <label className={styles.trap} aria-hidden="true">
        Company
        <input name="company" tabIndex={-1} autoComplete="off" />
      </label>

      <Field name="name" label={fields.name} autoComplete="name" required full />
      <Field name="email" type="email" label={fields.email} autoComplete="email" dir="auto" required />
      <Field name="phone" type="tel" label={fields.phone} autoComplete="tel" dir="auto" />

      <label className={styles.field}>
        <span className={styles.caption}>{fields.type}</span>
        <select name="type" defaultValue="">
          <option value="">{form.typePlaceholder}</option>
          {form.types.map((type) => (
            <option key={type}>{type}</option>
          ))}
        </select>
      </label>
      <Field name="location" label={fields.location} autoComplete="address-level2" />

      <label className={`${styles.field} ${styles.full}`}>
        <span className={styles.caption}>
          {fields.message}
          <span aria-hidden="true"> *</span>
        </span>
        <textarea name="message" rows={5} required />
      </label>

      {state.status === "error" && (
        <p className={`${styles.error} ${styles.full}`} role="alert">
          {form.errors[state.error ?? "failed"]}
        </p>
      )}

      <div className={`${styles.foot} ${styles.full}`}>
        <p className={styles.privacy}>
          {form.privacy.text} <Link href={privacyHref}>{form.privacy.link}</Link>.
        </p>
        <button type="submit" className={`text-link ${styles.submit}`} disabled={pending}>
          {pending ? form.sending : form.submit}
          <Arrow />
        </button>
      </div>
    </form>
  );
}
