"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, type ReactNode } from "react";
import { admin } from "@/content/admin";
import { signOut, useAdminSession } from "@/lib/admin/session";
import Logo from "../Logo";
import styles from "./AdminFrame.module.scss";

export default function AdminFrame({ children }: { children: ReactNode }) {
  const session = useAdminSession();
  const pathname = usePathname();
  const router = useRouter();
  const known = session !== undefined;
  const signedIn = Boolean(session);
  const isLogin = pathname === "/admin/login";

  useEffect(() => {
    if (!known) return;
    if (!signedIn && !isLogin) router.replace("/admin/login");
    if (signedIn && isLogin) router.replace("/admin");
  }, [known, signedIn, isLogin, router]);

  if (!known) return null;
  if (isLogin) return signedIn ? null : children;
  if (!signedIn) return null;

  return (
    <>
      <header className={styles.header}>
        <div className={styles.bar}>
          <div className={styles.brand}>
            <Link href="/admin" aria-label={admin.nav.projects}>
              <Logo className={styles.logo} />
            </Link>
            <span className={styles.badge}>{admin.label}</span>
          </div>
          <nav className={styles.nav}>
            <Link
              href="/admin"
              aria-current={pathname.startsWith("/admin") ? "page" : undefined}
            >
              {admin.nav.projects}
            </Link>
            <Link href="/" target="_blank">
              {admin.nav.viewSite}
            </Link>
            <span className={styles.email}>{session?.email}</span>
            <button type="button" onClick={signOut}>
              {admin.nav.signOut}
            </button>
          </nav>
        </div>
      </header>
      <main id="main">{children}</main>
    </>
  );
}
