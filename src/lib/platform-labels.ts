import type { PlatformType } from "@prisma/client";

const labels: Record<PlatformType, string> = {
  SPOTIFY: "Spotify",
  YOUTUBE: "YouTube",
  INSTAGRAM: "Instagram",
  TIKTOK: "TikTok",
  FACEBOOK: "Facebook",
  WEBSITE: "Web oficial",
  OTHER: "Otro",
};

export function platformLabel(type: PlatformType): string {
  return labels[type];
}
