"use client";

import Link from "next/link";
import {
  useActionState,
  useId,
  useState,
  type FormEvent,
  type ReactNode,
} from "react";
import type { Dictionary } from "@/content";
import { sendEnquiry, type EnquiryState } from "@/lib/enquiry";
import {
  ENQUIRY_FIELDS,
  ENQUIRY_LIMITS,
  checkField,
  readEnquiry,
  validateEnquiry,
  type EnquiryField,
  type FieldError,
  type FieldErrors,
} from "@/lib/enquiry-rules";
import { Plus } from "./ui";
import styles from "./EnquiryForm.module.scss";

type Form = Dictionary["contact"]["form"];
type Control = HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;

const initial: EnquiryState = { status: "idle" };

const isField = (name: string): name is EnquiryField =>
  (ENQUIRY_FIELDS as readonly string[]).includes(name);

function Field({
  id,
  label,
  required,
  error,
  full,
  children,
}: {
  id: string;
  label: string;
  required?: boolean;
  error?: string;
  full?: boolean;
  children: ReactNode;
}) {
  const classes = [styles.field, full && styles.full, error && styles.invalid];
  return (
    <div className={classes.filter(Boolean).join(" ")}>
      <label htmlFor={id} className={styles.caption}>
        {label}
        {required && <span aria-hidden="true"> *</span>}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} className={styles.message}>
          {error}
        </p>
      )}
    </div>
  );
}

/**
 * Kontakt forma: proverava polja u pregledaču (lib/enquiry-rules.ts), pa šalje upit
 * serveru (lib/enquiry.ts), koji ga ponovo proverava i prosleđuje na email studija.
 */
export default function EnquiryForm({
  form,
  privacyHref,
}: {
  form: Form;
  privacyHref: string;
}) {
  const [state, action, pending] = useActionState(sendEnquiry, initial);
  const [errors, setErrors] = useState<FieldErrors>({});
  // Posle prvog pokušaja slanja i prazna polja se proveravaju čim se napuste.
  const [attempted, setAttempted] = useState(false);
  // Bez mreže se upit ne šalje (akcija bi pukla), a uneti tekst ostaje.
  const [offline, setOffline] = useState(false);
  // Kad stigne odgovor servera, njegove greške zamenjuju one iz pregledača.
  const [answer, setAnswer] = useState(state);
  if (state !== answer) {
    setAnswer(state);
    setErrors(state.fieldErrors ?? {});
  }
  const uid = useId();
  const { fields } = form;
  const messages: Partial<
    Record<EnquiryField, Partial<Record<FieldError, string>>>
  > = form.validation;

  if (state.status === "success") {
    return (
      <div className={styles.success} role="status">
        <p className={styles.successTitle}>{form.success.title}</p>
        <p>{form.success.text}</p>
      </div>
    );
  }

  const check = ({ name, value }: Control) => {
    if (!isField(name)) return;
    setErrors((prev) => ({ ...prev, [name]: checkField(name, value) }));
  };

  // Polje se proverava kad ga korisnik napusti — prazno tek posle prvog slanja.
  const onBlur = ({ target }: { target: EventTarget }) => {
    const control = target as Control;
    if (control.value.trim() || attempted) check(control);
  };

  // Dok kuca, greška nestaje čim vrednost postane ispravna.
  const onChange = ({ target }: { target: EventTarget }) => {
    const control = target as Control;
    if (isField(control.name) && errors[control.name]) check(control);
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    const next = validateEnquiry(readEnquiry(new FormData(e.currentTarget)));
    setErrors(next);
    setAttempted(true);
    const first = ENQUIRY_FIELDS.find((field) => next[field]);
    if (first) {
      e.preventDefault();
      const control = e.currentTarget.elements.namedItem(first);
      (control as HTMLElement | null)?.focus();
      return;
    }
    setOffline(!navigator.onLine);
    if (!navigator.onLine) e.preventDefault();
  };

  // Poruka iznad dugmeta: bez mreže, pogrešna polja posle pokušaja slanja, ili greška servera.
  const failure = offline
    ? "failed"
    : attempted && ENQUIRY_FIELDS.some((field) => errors[field])
      ? "invalid"
      : state.status === "error"
        ? (state.error ?? "failed")
        : undefined;

  const error = (field: EnquiryField) => {
    const code = errors[field];
    return code && messages[field]?.[code];
  };

  // Zajednički atributi polja: id, ime, vrednost posle greške i veza sa porukom.
  const control = (field: EnquiryField) => ({
    id: `${uid}-${field}`,
    name: field,
    defaultValue: state.values?.[field],
    "aria-invalid": errors[field] ? true : undefined,
    "aria-describedby": errors[field] ? `${uid}-${field}-error` : undefined,
  });

  return (
    <form
      className={styles.form}
      action={action}
      onSubmit={onSubmit}
      onBlur={onBlur}
      onChange={onChange}
      noValidate
    >
      {/* Zamka za botove: ljudi ovo polje ne vide. */}
      <label className={styles.trap} aria-hidden="true">
        Company
        <input name="company" tabIndex={-1} autoComplete="off" />
      </label>

      <Field
        id={`${uid}-name`}
        label={fields.name}
        error={error("name")}
        required
        full
      >
        <input
          {...control("name")}
          autoComplete="name"
          maxLength={ENQUIRY_LIMITS.name}
          required
        />
      </Field>
      <Field
        id={`${uid}-email`}
        label={fields.email}
        error={error("email")}
        required
      >
        <input
          {...control("email")}
          type="email"
          autoComplete="email"
          maxLength={ENQUIRY_LIMITS.email}
          required
        />
      </Field>
      <Field id={`${uid}-phone`} label={fields.phone} error={error("phone")}>
        <input
          {...control("phone")}
          type="tel"
          autoComplete="tel"
          maxLength={ENQUIRY_LIMITS.phone}
        />
      </Field>

      <Field id={`${uid}-type`} label={fields.type}>
        {/* key: posle greške lista se ponovo postavlja na poslatu vrednost. */}
        <select key={state.values?.type} {...control("type")}>
          <option value="">{form.typePlaceholder}</option>
          {form.types.map((type) => (
            <option key={type}>{type}</option>
          ))}
        </select>
      </Field>
      <Field id={`${uid}-location`} label={fields.location}>
        <input
          {...control("location")}
          autoComplete="address-level2"
          maxLength={ENQUIRY_LIMITS.location}
        />
      </Field>

      <Field
        id={`${uid}-message`}
        label={fields.message}
        error={error("message")}
        required
        full
      >
        <textarea
          {...control("message")}
          rows={4}
          maxLength={ENQUIRY_LIMITS.message}
          required
        />
      </Field>

      {failure && (
        <p className={`${styles.error} ${styles.full}`} role="alert">
          {form.errors[failure]}
        </p>
      )}

      <div className={`${styles.foot} ${styles.full}`}>
        <p className={styles.privacy}>
          {form.privacy.text}{" "}
          <Link href={privacyHref}>{form.privacy.link}</Link>.
        </p>
        <button type="submit" className={styles.submit} disabled={pending}>
          {pending ? form.sending : form.submit}
          <Plus />
        </button>
      </div>
    </form>
  );
}
