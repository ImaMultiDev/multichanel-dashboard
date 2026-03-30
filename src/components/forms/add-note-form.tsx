"use client";

import { useActionState, useEffect, useRef } from "react";
import { createNote } from "@/actions/notes";

type Props = { slug: string };

export function AddNoteForm({ slug }: Props) {
  const [state, formAction, pending] = useActionState(
    createNote.bind(null, slug),
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
      className="mt-4 flex flex-col gap-3 rounded-lg border border-dashed border-amber-500/20 bg-amber-950/10 p-4"
    >
      <p className="text-xs uppercase tracking-widest text-amber-200/60">
        Idea o nota rápida
      </p>
      <textarea
        name="content"
        required
        rows={3}
        placeholder="Lírica, fecha de lanzamiento, idea de reel…"
        className="w-full resize-y rounded-lg border border-white/10 bg-black/40 px-3 py-2 text-sm text-white outline-none placeholder:text-white/30 focus:border-amber-500/40"
      />
      {state?.error ? (
        <p className="text-sm text-rose-400">{state.error}</p>
      ) : null}
      <button
        type="submit"
        disabled={pending}
        className="self-start rounded-lg border border-amber-500/35 bg-amber-500/15 px-4 py-2 text-sm font-medium text-amber-100 hover:bg-amber-500/25 disabled:opacity-50"
      >
        {pending ? "Guardando…" : "Añadir nota"}
      </button>
    </form>
  );
}
