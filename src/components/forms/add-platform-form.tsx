"use client";

import { useActionState, useEffect, useRef } from "react";
import { createPlatform } from "@/actions/platforms";

const types = [
  { value: "WEBSITE", label: "Web oficial" },
  { value: "SPOTIFY", label: "Spotify" },
  { value: "YOUTUBE", label: "YouTube" },
  { value: "INSTAGRAM", label: "Instagram" },
  { value: "TIKTOK", label: "TikTok" },
  { value: "FACEBOOK", label: "Facebook" },
  { value: "OTHER", label: "Otro" },
] as const;

type Props = { slug: string };

export function AddPlatformForm({ slug }: Props) {
  const [state, formAction, pending] = useActionState(
    createPlatform.bind(null, slug),
    null,
  );
  const ref = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state === null && !pending) {
      ref.current?.reset();
    }
  }, [state, pending]);

  return (
    <form
      ref={ref}
      action={formAction}
      className="mt-4 flex flex-col gap-3 rounded-lg border border-dashed border-white/15 bg-black/20 p-4"
    >
      <p className="text-xs uppercase tracking-widest text-[var(--text-muted)]">
        Añadir plataforma
      </p>
      <div className="grid gap-3 sm:grid-cols-2">
        <select
          name="type"
          className="rounded-lg border border-white/10 bg-[var(--bg-elevated)] px-3 py-2 text-sm text-white outline-none focus:border-rose-500/40"
        >
          {types.map((t) => (
            <option key={t.value} value={t.value}>
              {t.label}
            </option>
          ))}
        </select>
        <input
          name="label"
          placeholder="Etiqueta opcional"
          className="rounded-lg border border-white/10 bg-black/40 px-3 py-2 text-sm text-white outline-none placeholder:text-white/30 focus:border-rose-500/40"
        />
      </div>
      <input
        name="url"
        type="url"
        required
        placeholder="URL del perfil o canal"
        className="w-full rounded-lg border border-white/10 bg-black/40 px-3 py-2 text-sm text-white outline-none placeholder:text-white/30 focus:border-rose-500/40"
      />
      {state?.error ? (
        <p className="text-sm text-rose-400">{state.error}</p>
      ) : null}
      <button
        type="submit"
        disabled={pending}
        className="self-start rounded-lg bg-white/10 px-4 py-2 text-sm font-medium text-white hover:bg-white/15 disabled:opacity-50"
      >
        {pending ? "Añadiendo…" : "Añadir"}
      </button>
    </form>
  );
}
