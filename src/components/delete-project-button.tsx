"use client";

import { deleteProject } from "@/actions/projects";

type Props = { slug: string };

export function DeleteProjectButton({ slug }: Props) {
  return (
    <form
      action={deleteProject.bind(null, slug)}
      onSubmit={(e) => {
        if (
          !confirm(
            "¿Eliminar esta identidad? Se borrarán plataformas, enlaces y notas.",
          )
        ) {
          e.preventDefault();
        }
      }}
    >
      <button
        type="submit"
        className="text-sm text-rose-400/90 underline decoration-rose-500/40 underline-offset-2 hover:text-rose-300"
      >
        Eliminar identidad
      </button>
    </form>
  );
}
