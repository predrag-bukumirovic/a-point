import { ar } from "./ar";
import { en, type Dictionary } from "./en";
import type { Locale } from "./site";

const dictionaries: Record<Locale, Dictionary> = { en, ar };

export const getDictionary = (locale: Locale) => dictionaries[locale];
export type { Dictionary };
