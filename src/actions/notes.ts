"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";

export async function createNote(
  slug: string,
  _prev: { error?: string } | null,
  formData: FormData,
) {
  const project = await prisma.project.findUnique({ where: { slug } });
  if (!project) {
    return { error: "Proyecto no encontrado." };
  }

  const content = String(formData.get("content") ?? "").trim();
  if (!content) {
    return { error: "Escribe algo en la nota." };
  }

  const last = await prisma.quickNote.findFirst({
    where: { projectId: project.id },
    orderBy: { sortOrder: "desc" },
    select: { sortOrder: true },
  });
  const sortOrder = (last?.sortOrder ?? -1) + 1;

  await prisma.quickNote.create({
    data: {
      projectId: project.id,
      content,
      sortOrder,
    },
  });

  revalidatePath(`/proyecto/${slug}`);
  return null;
}

export async function updateNote(
  slug: string,
  noteId: string,
  _prev: { error?: string } | null,
  formData: FormData,
) {
  const project = await prisma.project.findUnique({ where: { slug } });
  if (!project) {
    return { error: "Proyecto no encontrado." };
  }

  const content = String(formData.get("content") ?? "").trim();
  if (!content) {
    return { error: "La nota no puede estar vacía." };
  }

  await prisma.quickNote.updateMany({
    where: { id: noteId, projectId: project.id },
    data: { content },
  });

  revalidatePath(`/proyecto/${slug}`);
  return null;
}

export async function deleteNote(slug: string, noteId: string) {
  const project = await prisma.project.findUnique({ where: { slug } });
  if (!project) return;

  await prisma.quickNote.deleteMany({
    where: { id: noteId, projectId: project.id },
  });

  revalidatePath(`/proyecto/${slug}`);
}
