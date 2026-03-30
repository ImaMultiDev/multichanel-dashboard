"use client";

import { useActionState } from "react";
import type { Project } from "@prisma/client";
import { updateProject } from "@/actions/projects";

type Props = { project: Project };

export function EditIdentityForm({ project }: Props) {
  const [state, formAction, pending] = useActionState(
    updateProject.bind(null, project.slug),
    null,
  );

  return (
    <details className="group rounded-xl border border-white/10 bg-black/25">
      <summary className="cursor-pointer list-none px-4 py-3 text-sm text-[var(--text-muted)] transition-colors marker:content-none group-open:text-white">
        <span className="underline decoration-white/20 underline-offset-4 group-open:decoration-rose-500/50">
          Editar branding
        </span>
      </summary>
      <form action={formAction} className="flex flex-col gap-4 border-t border-white/5 p-4 pt-4">
        <div>
          <label htmlFor={`name-${project.id}`} className="text-xs uppercase tracking-widest text-[var(--text-muted)]">
            Nombre
          </label>
          <input
            id={`name-${project.id}`}
            name="name"
            required
            defaultValue={project.name}
            className="mt-1.5 w-full rounded-lg border border-white/10 bg-black/40 px-3 py-2 text-white outline-none focus:border-rose-500/40 focus:ring-2 focus:ring-rose-500/30"
          />
        </div>
        <div>
          <label htmlFor={`tagline-${project.id}`} className="text-xs uppercase tracking-widest text-[var(--text-muted)]">
            Tagline
          </label>
          <input
            id={`tagline-${project.id}`}
            name="tagline"
            defaultValue={project.tagline ?? ""}
            className="mt-1.5 w-full rounded-lg border border-white/10 bg-black/40 px-3 py-2 text-white outline-none focus:border-rose-500/40 focus:ring-2 focus:ring-rose-500/30"
          />
        </div>
        <div>
          <label htmlFor={`styleTag-${project.id}`} className="text-xs uppercase tracking-widest text-[var(--text-muted)]">
            Estilo
          </label>
          <input
            id={`styleTag-${project.id}`}
            name="styleTag"
            defaultValue={project.styleTag ?? ""}
            className="mt-1.5 w-full rounded-lg border border-white/10 bg-black/40 px-3 py-2 text-white outline-none focus:border-rose-500/40 focus:ring-2 focus:ring-rose-500/30"
          />
        </div>
        <div>
          <label htmlFor={`imageUrl-${project.id}`} className="text-xs uppercase tracking-widest text-[var(--text-muted)]">
            URL imagen
          </label>
          <input
            id={`imageUrl-${project.id}`}
            name="imageUrl"
            type="url"
            defaultValue={project.imageUrl ?? ""}
            className="mt-1.5 w-full rounded-lg border border-white/10 bg-black/40 px-3 py-2 text-white outline-none focus:border-rose-500/40 focus:ring-2 focus:ring-rose-500/30"
          />
        </div>
        <div>
          <label htmlFor={`accent-${project.id}`} className="text-xs uppercase tracking-widest text-[var(--text-muted)]">
            Acento #hex
          </label>
          <input
            id={`accent-${project.id}`}
            name="accentHex"
            defaultValue={project.accentHex}
            pattern="^#[0-9A-Fa-f]{6}$"
            className="mt-1.5 w-full rounded-lg border border-white/10 bg-black/40 px-3 py-2 font-mono text-sm text-white outline-none focus:border-rose-500/40 focus:ring-2 focus:ring-rose-500/30"
          />
        </div>
        {state?.error ? (
          <p className="text-sm text-rose-400">{state.error}</p>
        ) : null}
        <button
          type="submit"
          disabled={pending}
          className="rounded-lg border border-white/15 bg-white/5 px-3 py-2 text-sm font-medium text-white hover:bg-white/10 disabled:opacity-50"
        >
          {pending ? "Guardando…" : "Guardar cambios"}
        </button>
      </form>
    </details>
  );
}
