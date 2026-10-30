/*
 * Pravila kontakt forme — ista se koriste u pregledaču (EnquiryForm) i na serveru (enquiry.ts).
 */
export const ENQUIRY_FIELDS = [
  "name",
  "email",
  "phone",
  "type",
  "location",
  "message",
] as const;

export type EnquiryField = (typeof ENQUIRY_FIELDS)[number];
export type EnquiryValues = Record<EnquiryField, string>;
export type FieldError = "required" | "invalid" | "short";
export type FieldErrors = Partial<Record<EnquiryField, FieldError>>;

/** Najveća dužina svakog polja (u znakovima). */
export const ENQUIRY_LIMITS: Record<EnquiryField, number> = {
  name: 100,
  email: 254,
  phone: 30,
  type: 100,
  location: 100,
  message: 5000,
};

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
// Cifre, razmaci, zagrade, tačke i crtice; "+" samo na početku.
const PHONE = /^\+?[\d\s().-]+$/;

/** Vrednosti iz forme: bez razmaka na krajevima i skraćene na dozvoljenu dužinu. */
export function readEnquiry(data: FormData): EnquiryValues {
  return Object.fromEntries(
    ENQUIRY_FIELDS.map((field) => [
      field,
      String(data.get(field) ?? "")
        .trim()
        .slice(0, ENQUIRY_LIMITS[field]),
    ]),
  ) as EnquiryValues;
}

/** Greška jednog polja, ili undefined ako je vrednost ispravna. */
export function checkField(
  field: EnquiryField,
  raw: string,
): FieldError | undefined {
  const value = raw.trim();
  switch (field) {
    case "name":
      if (!value) return "required";
      if (value.length < 2) return "short";
      return;
    case "email":
      if (!value) return "required";
      if (!EMAIL.test(value)) return "invalid";
      return;
    case "phone": {
      if (!value) return;
      const digits = value.replace(/\D/g, "").length;
      if (!PHONE.test(value) || digits < 7 || digits > 15) return "invalid";
      return;
    }
    case "message":
      if (!value) return "required";
      if (value.length < 10) return "short";
      return;
  }
}

/** Sve greške forme; prazan objekat znači da je forma ispravna. */
export function validateEnquiry(values: EnquiryValues): FieldErrors {
  const errors: FieldErrors = {};
  for (const field of ENQUIRY_FIELDS) {
    const error = checkField(field, values[field]);
    if (error) errors[field] = error;
  }
  return errors;
}
