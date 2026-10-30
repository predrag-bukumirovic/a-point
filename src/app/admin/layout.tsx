import type { Metadata } from "next";
import AdminFrame from "@/components/admin/AdminFrame";

// Admin ne treba da se pojavi u pretraživačima.
export const metadata: Metadata = {
  title: "Admin",
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: LayoutProps<"/admin">) {
  return <AdminFrame>{children}</AdminFrame>;
}
