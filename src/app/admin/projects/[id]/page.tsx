import type { Metadata } from "next";
import ProjectForm from "@/components/admin/ProjectForm";
import { admin } from "@/content/admin";
import { formOptions } from "../form-options";

export const metadata: Metadata = { title: `${admin.form.editTitle} — ${admin.label}` };

export default async function Page({ params }: PageProps<"/admin/projects/[id]">) {
  const { id } = await params;
  return <ProjectForm id={id} {...formOptions()} />;
}
