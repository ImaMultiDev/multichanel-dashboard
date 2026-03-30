"use client";

import { useActionState, useEffect, useRef } from "react";
import { createResource } from "@/actions/resources";

type Props = { slug: string };

export function AddResourceForm({ slug }: Props) {
  const [state, formAction, pending] = useActionState(
    createResource.bind(null, slug),
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
        Nuevo recurso o enlace
      </p>
      <div className="flex flex-col gap-3 sm:flex-row">
        <input
          name="title"
          required
          placeholder="Título"
          className="flex-1 rounded-lg border border-white/10 bg-black/40 px-3 py-2 text-sm text-white outline-none placeholder:text-white/30 focus:border-rose-500/40"
        />
        <input
          name="url"
          type="url"
          required
          placeholder="https://…"
          className="flex-[2] rounded-lg border border-white/10 bg-black/40 px-3 py-2 text-sm text-white outline-none placeholder:text-white/30 focus:border-rose-500/40"
        />
      </div>
      {state?.error ? (
        <p className="text-sm text-rose-400">{state.error}</p>
      ) : null}
      <button
        type="submit"
        disabled={pending}
        className="self-start rounded-lg bg-white/10 px-4 py-2 text-sm font-medium text-white hover:bg-white/15 disabled:opacity-50"
      >
        {pending ? "Guardando…" : "Añadir enlace"}
      </button>
    </form>
  );
}
