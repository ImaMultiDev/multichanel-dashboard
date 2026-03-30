import { prisma } from "@/lib/prisma";

export function slugify(text: string): string {
  const base = text
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{M}/gu, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
  return base || "identidad";
}

export async function uniqueSlugFromName(name: string): Promise<string> {
  const base = slugify(name);
  let candidate = base;
  let n = 0;
  while (
    await prisma.project.findUnique({
      where: { slug: candidate },
      select: { id: true },
    })
  ) {
    n += 1;
    candidate = `${base}-${n}`;
  }
  return candidate;
}
