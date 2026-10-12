import { useSyncExternalStore } from "react";

/*
 * Pristanak na kolačiće (samo u pregledaču). Izbor se čuva u kolačiću `cookie_consent`:
 * "analytics" — prihvaćena je i analitika, "necessary" — samo neophodni kolačići.
 * Posle šest meseci kolačić ističe i traka se ponovo prikazuje.
 */
const COOKIE = "cookie_consent";
const MAX_AGE = 60 * 60 * 24 * 182;

const listeners = new Set<() => void>();

const subscribe = (onChange: () => void) => {
  listeners.add(onChange);
  return () => {
    listeners.delete(onChange);
  };
};

const read = () => {
  const value = document.cookie.match(new RegExp(`(?:^|; )${COOKIE}=([^;]*)`))?.[1];
  return value === "analytics" ? true : value === "necessary" ? false : null;
};

/**
 * true: analitika je dozvoljena, false: samo neophodni, null: posetilac još nije izabrao.
 * Na serveru izbor nije poznat (undefined), pa se ništa ne prikazuje dok se strana ne hidrira.
 */
export const useConsent = () => useSyncExternalStore(subscribe, read, () => undefined);

export function saveConsent(analytics: boolean) {
  document.cookie = `${COOKIE}=${analytics ? "analytics" : "necessary"}; path=/; max-age=${MAX_AGE}; samesite=lax`;
  listeners.forEach((listener) => listener());
}

/** Link „Cookie settings“ u futeru ponovo otvara traku, odmah na podešavanjima. */
export const OPEN_SETTINGS = "cookie-settings";
export const openCookieSettings = () => window.dispatchEvent(new Event(OPEN_SETTINGS));
