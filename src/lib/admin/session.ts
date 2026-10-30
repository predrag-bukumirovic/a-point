import { useSyncExternalStore } from "react";

/*
 * Prijava u admin — za sada samo na frontendu (bez servera).
 * signIn prihvata samo demo pristup (DEMO_LOGIN) i pamti sesiju u ovom pregledaču.
 * Kad backend bude spreman, signIn/signOut postaju pozivi API-ja (npr. POST /api/admin/login),
 * a sesiju čuva server (httpOnly kolačić); komponente koje ih koriste ostaju iste.
 */
const KEY = "apoint_admin_session";
const EVENT = "admin-session";

export type AdminSession = { email: string };

/** Demo pristup dok nema servera (vidljiv je u kodu stranice, pa nije prava zaštita). */
export const DEMO_LOGIN = { email: "admin@a-pnt.com", password: "apoint2026" };

const subscribe = (onChange: () => void) => {
  window.addEventListener("storage", onChange);
  window.addEventListener(EVENT, onChange);
  return () => {
    window.removeEventListener("storage", onChange);
    window.removeEventListener(EVENT, onChange);
  };
};

const read = () => {
  try {
    return localStorage.getItem(KEY) ?? "";
  } catch {
    return "";
  }
};

/** Prijavljeni administrator; null — niko nije prijavljen; undefined — još se ne zna (na serveru). */
export function useAdminSession(): AdminSession | null | undefined {
  const raw = useSyncExternalStore(subscribe, read, () => undefined);
  if (raw === undefined) return undefined;
  if (!raw) return null;
  try {
    return JSON.parse(raw) as AdminSession;
  } catch {
    return null;
  }
}

export async function signIn(email: string, password: string): Promise<{ ok: boolean }> {
  // Kratka pauza, kao da odgovara server.
  await new Promise((resolve) => setTimeout(resolve, 600));
  const valid = email.trim().toLowerCase() === DEMO_LOGIN.email && password === DEMO_LOGIN.password;
  if (!valid) return { ok: false };
  localStorage.setItem(KEY, JSON.stringify({ email: email.trim() } satisfies AdminSession));
  window.dispatchEvent(new Event(EVENT));
  return { ok: true };
}

export function signOut() {
  localStorage.removeItem(KEY);
  window.dispatchEvent(new Event(EVENT));
}
