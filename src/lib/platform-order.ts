import type { PlatformType } from "@prisma/client";

/** Orden fijo para mostrar iconos en tarjetas y listas. */
export const PLATFORM_TYPE_ORDER: PlatformType[] = [
  "WEBSITE",
  "SPOTIFY",
  "YOUTUBE",
  "INSTAGRAM",
  "TIKTOK",
  "FACEBOOK",
  "OTHER",
];

export function platformTypeSortKey(type: PlatformType): number {
  const i = PLATFORM_TYPE_ORDER.indexOf(type);
  return i === -1 ? 999 : i;
}
