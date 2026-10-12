"use client";

import { openCookieSettings } from "@/lib/consent";

/** Link u futeru koji ponovo otvara podešavanja kolačića, da posetilac može da promeni izbor. */
export default function CookieSettingsButton({ label, className }: { label: string; className?: string }) {
  return (
    <button type="button" className={className} onClick={openCookieSettings}>
      {label}
    </button>
  );
}
