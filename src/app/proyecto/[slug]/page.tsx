import Link from "next/link";
import { notFound } from "next/navigation";
import type { CSSProperties } from "react";
import { deleteNote } from "@/actions/notes";
import { deletePlatform } from "@/actions/platforms";
import { deleteResource } from "@/actions/resources";
import { DeleteProjectButton } from "@/components/delete-project-button";
import { AddNoteForm } from "@/components/forms/add-note-form";
import { AddPlatformForm } from "@/components/forms/add-platform-form";
import { AddResourceForm } from "@/components/forms/add-resource-form";
import { EditIdentityForm } from "@/components/forms/edit-identity-form";
import { PlatformIcon } from "@/components/platform-icon";
import { normalizeExternalHref } from "@/lib/external-url";
import { platformLabel } from "@/lib/platform-labels";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ slug: string }> };

export default async function ProyectoPage({ params }: Props) {
  const { slug } = await params;

  let project;
  try {
    project = await prisma.project.findUnique({
      where: { slug },
      include: {
        platforms: { orderBy: { sortOrder: "asc" } },
        resources: { orderBy: { sortOrder: "asc" } },
        notes: { orderBy: { sortOrder: "asc" } },
      },
    });
  } catch {
    notFound();
  }

  if (!project) {
    notFound();
  }

  const accent = project.accentHex || "#e11d48";

  return (
    <main
      className="mx-auto w-full max-w-4xl flex-1 px-4 py-8 sm:px-6 sm:py-12"
      style={{ "--accent": accent } as CSSProperties}
    >
      <Link
        href="/"
        className="text-sm text-[var(--text-muted)] transition-colors hover:text-white"
      >
        ← Todas las identidades
      </Link>

      {/* Cabecera / branding */}
      <header className="relative mt-8 overflow-hidden rounded-2xl border border-white/10 bg-[var(--bg-card)] glow-border">
        <div
          className="absolute inset-0 opacity-40"
          style={{
            background: `radial-gradient(ellipse 90% 70% at 15% -20%, ${accent}66, transparent 50%)`,
          }}
        />
        <div className="relative flex flex-col gap-6 p-6 sm:flex-row sm:items-end sm:p-10">
          <div className="relative h-32 w-32 shrink-0 overflow-hidden rounded-xl border border-white/15 bg-black/50 sm:h-40 sm:w-40">
            {project.imageUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={project.imageUrl}
                alt=""
                className="h-full w-full object-cover"
              />
            ) : (
              <div
                className="flex h-full w-full items-center justify-center font-[family-name:var(--font-display-var)] text-5xl text-white/30"
                style={{ color: accent }}
              >
                {project.name.slice(0, 1).toUpperCase()}
              </div>
            )}
          </div>
          <div className="min-w-0 flex-1">
            {project.styleTag ? (
              <p className="text-xs uppercase tracking-[0.2em] text-[var(--text-muted)]">
                {project.styleTag}
              </p>
            ) : null}
            <h1 className="font-[family-name:var(--font-display-var)] text-4xl tracking-wide text-white sm:text-5xl">
              {project.name}
            </h1>
            {project.tagline ? (
              <p className="mt-3 text-lg text-[var(--text-muted)]">
                {project.tagline}
              </p>
            ) : null}
          </div>
        </div>
        <div className="relative border-t border-white/5 px-4 py-3 sm:px-6">
          <EditIdentityForm project={project} />
        </div>
      </header>

      {/* Plataformas */}
      <section className="mt-12">
        <h2 className="font-[family-name:var(--font-display-var)] text-2xl tracking-wide text-white">
          Plataformas
        </h2>
        <p className="mt-1 text-sm text-[var(--text-muted)]">
          Sal al escenario digital en un clic.
        </p>
        <ul className="mt-6 grid gap-4 sm:grid-cols-2">
          {project.platforms.map((p) => (
            <li
              key={p.id}
              className="flex flex-col justify-between gap-4 rounded-xl border border-white/10 bg-[var(--bg-elevated)] p-5 transition-colors glow-border-hover"
            >
              <div className="flex gap-4">
                <div
                  className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-black/35 text-[color:var(--accent)]"
                  aria-hidden
                >
                  <PlatformIcon type={p.type} size="md" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-xs uppercase tracking-widest text-[color:var(--accent)]">
                    {platformLabel(p.type)}
                  </p>
                  {p.label ? (
                    <p className="mt-1 text-sm text-[var(--text-muted)]">
                      {p.label}
                    </p>
                  ) : null}
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <a
                  href={normalizeExternalHref(p.url)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex flex-1 items-center justify-center rounded-lg bg-[color:var(--accent)] px-4 py-2.5 text-center text-sm font-bold text-black hover:brightness-110"
                >
                  Abrir
                </a>
                <form action={deletePlatform.bind(null, slug, p.id)}>
                  <button
                    type="submit"
                    className="rounded-lg border border-white/15 px-3 py-2 text-xs text-white/50 hover:border-rose-500/40 hover:text-rose-300"
                  >
                    Quitar
                  </button>
                </form>
              </div>
            </li>
          ))}
        </ul>
        <AddPlatformForm slug={slug} />
      </section>

      {/* Recursos */}
      <section className="mt-14">
        <h2 className="font-[family-name:var(--font-display-var)] text-2xl tracking-wide text-white">
          Recursos y enlaces
        </h2>
        <p className="mt-1 text-sm text-[var(--text-muted)]">
          Presskit, playlists, herramientas — lo que uses a diario.
        </p>
        {project.resources.length === 0 ? (
          <p className="mt-6 text-sm italic text-white/35">
            Nada aquí todavía. Añade el primer enlace abajo.
          </p>
        ) : (
          <ul className="mt-6 divide-y divide-white/10 rounded-xl border border-white/10 bg-black/30">
            {project.resources.map((r) => (
              <li
                key={r.id}
                className="flex flex-wrap items-center justify-between gap-3 px-4 py-4 sm:px-5"
              >
                <a
                  href={r.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-white underline decoration-white/20 underline-offset-4 hover:decoration-[color:var(--accent)]"
                >
                  {r.title}
                </a>
                <form action={deleteResource.bind(null, slug, r.id)}>
                  <button
                    type="submit"
                    className="text-xs text-white/40 hover:text-rose-400"
                  >
                    Eliminar
                  </button>
                </form>
              </li>
            ))}
          </ul>
        )}
        <AddResourceForm slug={slug} />
      </section>

      {/* Notas */}
      <section className="mt-14 pb-8">
        <h2 className="font-[family-name:var(--font-display-var)] text-2xl tracking-wide text-white">
          Notas rápidas
        </h2>
        <p className="mt-1 text-sm text-[var(--text-muted)]">
          Ideas sueltas sin convertirse en tarea corporativa.
        </p>
        {project.notes.length === 0 ? (
          <p className="mt-6 text-sm italic text-white/35">
            Tira líneas aquí cuando te vengan en mente.
          </p>
        ) : (
          <ul className="mt-6 space-y-3">
            {project.notes.map((n) => (
              <li
                key={n.id}
                className="rounded-xl border border-amber-500/15 bg-amber-950/15 px-4 py-4"
              >
                <p className="whitespace-pre-wrap text-sm text-amber-50/90">
                  {n.content}
                </p>
                <div className="mt-3 flex items-center justify-between gap-2">
                  <span className="text-[10px] uppercase tracking-wider text-amber-200/40">
                    Nota
                  </span>
                  <form action={deleteNote.bind(null, slug, n.id)}>
                    <button
                      type="submit"
                      className="text-xs text-amber-200/50 hover:text-rose-400"
                    >
                      Borrar
                    </button>
                  </form>
                </div>
              </li>
            ))}
          </ul>
        )}
        <AddNoteForm slug={slug} />
      </section>

      <footer className="mt-6 border-t border-white/10 pt-8">
        <DeleteProjectButton slug={slug} />
      </footer>
    </main>
  );
}
