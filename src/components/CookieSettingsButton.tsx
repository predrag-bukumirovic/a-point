"use client";

import { openCookieSettings } from "@/lib/consent";

export default function CookieSettingsButton({
  label,
  className,
}: {
  label: string;
  className?: string;
}) {
  return (
    <button type="button" className={className} onClick={openCookieSettings}>
      {label}
    </button>
  );
}
