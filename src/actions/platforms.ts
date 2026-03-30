"use server";

import { revalidatePath } from "next/cache";
import type { PlatformType } from "@prisma/client";
import { prisma } from "@/lib/prisma";

const types: PlatformType[] = [
  "SPOTIFY",
  "YOUTUBE",
  "INSTAGRAM",
  "TIKTOK",
  "FACEBOOK",
  "WEBSITE",
  "OTHER",
];

function parseType(v: string): PlatformType {
  return types.includes(v as PlatformType) ? (v as PlatformType) : "OTHER";
}

export async function createPlatform(
  slug: string,
  _prev: { error?: string } | null,
  formData: FormData,
) {
  const project = await prisma.project.findUnique({ where: { slug } });
  if (!project) {
    return { error: "Proyecto no encontrado." };
  }

  const url = String(formData.get("url") ?? "").trim();
  if (!url) {
    return { error: "La URL es obligatoria." };
  }

  const type = parseType(String(formData.get("type") ?? "OTHER"));
  const label = String(formData.get("label") ?? "").trim() || null;

  const last = await prisma.platform.findFirst({
    where: { projectId: project.id },
    orderBy: { sortOrder: "desc" },
    select: { sortOrder: true },
  });
  const sortOrder = (last?.sortOrder ?? -1) + 1;

  await prisma.platform.create({
    data: {
      projectId: project.id,
      type,
      label,
      url,
      sortOrder,
    },
  });

  revalidatePath(`/proyecto/${slug}`);
  revalidatePath("/");
  return null;
}

export async function deletePlatform(slug: string, platformId: string) {
  const project = await prisma.project.findUnique({ where: { slug } });
  if (!project) return;

  await prisma.platform.deleteMany({
    where: { id: platformId, projectId: project.id },
  });

  revalidatePath(`/proyecto/${slug}`);
  revalidatePath("/");
}
