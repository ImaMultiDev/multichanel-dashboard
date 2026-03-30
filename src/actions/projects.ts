"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { uniqueSlugFromName } from "@/lib/slug";

const hex = /^#[0-9A-Fa-f]{6}$/;

export async function createProject(
  _prev: { error?: string } | null,
  formData: FormData,
) {
  const name = String(formData.get("name") ?? "").trim();
  if (!name) {
    return { error: "El nombre es obligatorio." };
  }

  const tagline = String(formData.get("tagline") ?? "").trim() || null;
  const imageUrl = String(formData.get("imageUrl") ?? "").trim() || null;
  const styleTag = String(formData.get("styleTag") ?? "").trim() || null;
  let accentHex = String(formData.get("accentHex") ?? "").trim() || "#e11d48";
  if (!hex.test(accentHex)) {
    accentHex = "#e11d48";
  }

  const slug = await uniqueSlugFromName(name);

  await prisma.project.create({
    data: {
      name,
      slug,
      tagline,
      imageUrl,
      styleTag,
      accentHex,
    },
  });

  revalidatePath("/");
  redirect(`/proyecto/${slug}`);
}

export async function updateProject(
  slug: string,
  _prev: { error?: string } | null,
  formData: FormData,
) {
  const project = await prisma.project.findUnique({ where: { slug } });
  if (!project) {
    return { error: "Proyecto no encontrado." };
  }

  const name = String(formData.get("name") ?? "").trim();
  if (!name) {
    return { error: "El nombre es obligatorio." };
  }

  const tagline = String(formData.get("tagline") ?? "").trim() || null;
  const imageUrl = String(formData.get("imageUrl") ?? "").trim() || null;
  const styleTag = String(formData.get("styleTag") ?? "").trim() || null;
  let accentHex = String(formData.get("accentHex") ?? "").trim() || "#e11d48";
  if (!hex.test(accentHex)) {
    accentHex = "#e11d48";
  }

  await prisma.project.update({
    where: { id: project.id },
    data: {
      name,
      tagline,
      imageUrl,
      styleTag,
      accentHex,
    },
  });

  revalidatePath("/");
  revalidatePath(`/proyecto/${slug}`);
  return null;
}

export async function deleteProject(slug: string) {
  await prisma.project.deleteMany({ where: { slug } });
  revalidatePath("/");
  redirect("/");
}
