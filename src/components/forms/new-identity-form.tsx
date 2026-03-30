"use client";

import { useActionState } from "react";
import { createProject } from "@/actions/projects";

export function NewIdentityForm() {
  const [state, formAction, pending] = useActionState(createProject, null);

  return (
    <form action={formAction}
      className="mx-auto flex max-w-lg flex-col gap-5 rounded-xl border border-white/10 bg-[var(--bg-card)] p-6 sm:p-8"
    >
      <div>
        <label htmlFor="name" className="text-xs uppercase tracking-widest text-[var(--text-muted)]">
          Nombre de la identidad
        </label>
        <input
          id="name"
          name="name"
          required
          placeholder="Ej. Nombre del proyecto / alias"
          className="mt-2 w-full rounded-lg border border-white/10 bg-black/40 px-3 py-2.5 text-white outline-none ring-rose-500/0 transition-[box-shadow] placeholder:text-white/25 focus:border-rose-500/40 focus:ring-2 focus:ring-rose-500/30"
        />
      </div>
      <div>
        <label htmlFor="tagline" className="text-xs uppercase tracking-widest text-[var(--text-muted)]">
          Tagline <span className="normal-case text-white/35">(opcional)</span>
        </label>
        <input
          id="tagline"
          name="tagline"
          placeholder="Una línea que la define"
          className="mt-2 w-full rounded-lg border border-white/10 bg-black/40 px-3 py-2.5 text-white outline-none placeholder:text-white/25 focus:border-rose-500/40 focus:ring-2 focus:ring-rose-500/30"
        />
      </div>
      <div>
        <label htmlFor="styleTag" className="text-xs uppercase tracking-widest text-[var(--text-muted)]">
          Estilo / género <span className="normal-case text-white/35">(opcional)</span>
        </label>
        <input
          id="styleTag"
          name="styleTag"
          placeholder="Ej. dark synth · post-punk"
          className="mt-2 w-full rounded-lg border border-white/10 bg-black/40 px-3 py-2.5 text-white outline-none placeholder:text-white/25 focus:border-rose-500/40 focus:ring-2 focus:ring-rose-500/30"
        />
      </div>
      <div>
        <label htmlFor="imageUrl" className="text-xs uppercase tracking-widest text-[var(--text-muted)]">
          URL de imagen <span className="normal-case text-white/35">(Cloudinary u otro)</span>
        </label>
        <input
          id="imageUrl"
          name="imageUrl"
          type="url"
          placeholder="https://..."
          className="mt-2 w-full rounded-lg border border-white/10 bg-black/40 px-3 py-2.5 text-white outline-none placeholder:text-white/25 focus:border-rose-500/40 focus:ring-2 focus:ring-rose-500/30"
        />
      </div>
      <div>
        <label htmlFor="accentHex" className="text-xs uppercase tracking-widest text-[var(--text-muted)]">
          Color de acento <span className="font-mono text-[10px] text-white/35">#RRGGBB</span>
        </label>
        <input
          id="accentHex"
          name="accentHex"
          type="text"
          placeholder="#e11d48"
          pattern="^#[0-9A-Fa-f]{6}$"
          className="mt-2 w-full rounded-lg border border-white/10 bg-black/40 px-3 py-2.5 font-mono text-sm text-white outline-none placeholder:text-white/25 focus:border-rose-500/40 focus:ring-2 focus:ring-rose-500/30"
        />
      </div>
      {state?.error ? (
        <p className="text-sm text-rose-400" role="alert">
          {state.error}
        </p>
      ) : null}
      <button
        type="submit"
        disabled={pending}
        className="mt-2 rounded-lg bg-rose-600 px-4 py-3 font-semibold text-white transition-colors hover:bg-rose-500 disabled:opacity-50"
      >
        {pending ? "Creando…" : "Crear identidad"}
      </button>
    </form>
  );
}
