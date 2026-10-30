import type { Metadata } from "next";
import AdminLogin from "@/components/admin/AdminLogin";
import { admin } from "@/content/admin";

export const metadata: Metadata = { title: `${admin.login.title} — ${admin.label}` };

export default function Page() {
  return <AdminLogin />;
}
