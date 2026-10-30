import type { Metadata } from "next";
import ProjectForm from "@/components/admin/ProjectForm";
import { admin } from "@/content/admin";
import { formOptions } from "../form-options";

export const metadata: Metadata = { title: `${admin.form.newTitle} — ${admin.label}` };

export default function Page() {
  return <ProjectForm {...formOptions()} />;
}
