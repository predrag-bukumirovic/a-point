/*
 * Novi projekti iz admina — za sada se čuvaju samo u ovom pregledaču (IndexedDB, zajedno sa slikama).
 * Kad backend bude spreman, ove funkcije postaju pozivi API-ja (lista, čitanje, snimanje, brisanje),
 * a slike se šalju na server; komponente koje ih koriste ostaju iste.
 */

export type DraftImage = { file: Blob; alt: string; portrait: boolean };

export type DraftProject = {
  id: string;
  slug: string;
  createdAt: number;
  updatedAt: number;
  title: string;
  category: string;
  location: string;
  year: string;
  scope: string;
  summary: string;
  body: string[];
  caption: string;
  featured: boolean;
  credits?: { client: string; architect: string };
  cover: Blob;
  gallery: DraftImage[];
};

const DB_NAME = "apoint-admin";
const STORE = "drafts";

const openDb = () =>
  new Promise<IDBDatabase>((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, 1);
    request.onupgradeneeded = () => request.result.createObjectStore(STORE, { keyPath: "id" });
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });

async function run<T>(mode: IDBTransactionMode, action: (store: IDBObjectStore) => IDBRequest<T>) {
  const db = await openDb();
  return new Promise<T>((resolve, reject) => {
    const request = action(db.transaction(STORE, mode).objectStore(STORE));
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  }).finally(() => db.close());
}

/** Svi nacrti, najnoviji prvi. */
export const listDrafts = async () =>
  (await run<DraftProject[]>("readonly", (store) => store.getAll())).sort((a, b) => b.updatedAt - a.updatedAt);

export const getDraft = (id: string) => run<DraftProject | undefined>("readonly", (store) => store.get(id));

export const saveDraft = (draft: DraftProject) => run("readwrite", (store) => store.put(draft));

export const deleteDraft = (id: string) => run("readwrite", (store) => store.delete(id));

/** Adresa projekta iz naslova: „Palm Villa“ → „palm-villa“. */
export const slugify = (title: string) =>
  title
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
