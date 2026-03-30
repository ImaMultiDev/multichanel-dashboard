"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";

export async function createResource(
  slug: string,
  _prev: { error?: string } | null,
  formData: FormData,
) {
  const project = await prisma.project.findUnique({ where: { slug } });
  if (!project) {
    return { error: "Proyecto no encontrado." };
  }

  const title = String(formData.get("title") ?? "").trim();
  const url = String(formData.get("url") ?? "").trim();
  if (!title || !url) {
    return { error: "Título y URL son obligatorios." };
  }

  const last = await prisma.resourceLink.findFirst({
    where: { projectId: project.id },
    orderBy: { sortOrder: "desc" },
    select: { sortOrder: true },
  });
  const sortOrder = (last?.sortOrder ?? -1) + 1;

  await prisma.resourceLink.create({
    data: {
      projectId: project.id,
      title,
      url,
      sortOrder,
    },
  });

  revalidatePath(`/proyecto/${slug}`);
  return null;
}

export async function deleteResource(slug: string, resourceId: string) {
  const project = await prisma.project.findUnique({ where: { slug } });
  if (!project) return;

  await prisma.resourceLink.deleteMany({
    where: { id: resourceId, projectId: project.id },
  });

  revalidatePath(`/proyecto/${slug}`);
}
