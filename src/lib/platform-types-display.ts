import type { Platform } from "@prisma/client";
import { platformTypeSortKey } from "@/lib/platform-order";

export type PlatformCardRow = Pick<
  Platform,
  "id" | "type" | "url" | "sortOrder" | "label"
>;

/** Plataformas en orden de presentación (tipo fijo, luego sortOrder). */
export function sortPlatformsForCard(
  platforms: PlatformCardRow[],
): PlatformCardRow[] {
  return [...platforms].sort((a, b) => {
    const byType = platformTypeSortKey(a.type) - platformTypeSortKey(b.type);
    if (byType !== 0) return byType;
    return a.sortOrder - b.sortOrder;
  });
}
