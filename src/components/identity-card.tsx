import Link from "next/link";
import type { CSSProperties } from "react";
import type { Project } from "@prisma/client";
import { PlatformIcon } from "@/components/platform-icon";
import { normalizeExternalHref } from "@/lib/external-url";
import { platformLabel } from "@/lib/platform-labels";
import type { PlatformCardRow } from "@/lib/platform-types-display";
import { sortPlatformsForCard } from "@/lib/platform-types-display";

export type IdentityCardProject = Project & {
  platforms: PlatformCardRow[];
};

type Props = { project: IdentityCardProject; index: number };

export function IdentityCard({ project, index }: Props) {
  const accent = project.accentHex || "#e11d48";
  const platformsSorted = sortPlatformsForCard(project.platforms);
  const num = String(index).padStart(2, "0");

  return (
    <article
      className="group relative flex flex-col overflow-hidden rounded-xl border border-white/5 bg-[var(--bg-card)] transition-[box-shadow,transform] duration-200 glow-border-hover lg:flex-row lg:items-stretch lg:rounded-lg lg:border-white/[0.07]"
      style={{ "--accent": accent } as CSSProperties}
    >
      {/* Acento superior sólo móvil — como cinta / prioridad */}
      <div
        className="h-1 shrink-0 bg-[color:var(--accent)] shadow-[0_0_20px_-2px_var(--accent)] lg:hidden"
        aria-hidden
      />

      <div
        className="pointer-events-none absolute inset-0 opacity-25 transition-opacity group-hover:opacity-40 lg:hidden"
        style={{
          background: `radial-gradient(ellipse 90% 80% at 15% 0%, ${accent}50, transparent 55%)`,
        }}
      />

      {/* Desktop: columna de acento + brillo lateral */}
      <div
        className="relative hidden w-[5px] shrink-0 lg:block"
        aria-hidden
        style={{
          background: `linear-gradient(180deg, ${accent}, color-mix(in srgb, ${accent} 40%, black))`,
          boxShadow: `inset -1px 0 0 color-mix(in srgb, ${accent} 35%, transparent), 6px 0 28px -8px ${accent}`,
        }}
      />

      {/* Desktop: índice estilo rider / lista de tema */}
      <div className="relative hidden w-11 shrink-0 flex-col items-center justify-center gap-1 border-r border-dotted border-white/[0.12] bg-gradient-to-b from-black/40 to-black/25 py-3 font-mono lg:flex">
        <span className="text-[9px] uppercase tracking-[0.2em] text-white/25">
          tr
        </span>
        <span
          className="text-sm font-semibold tabular-nums leading-none text-white/50 transition-colors group-hover:text-[color:var(--accent)]"
          aria-hidden
        >
          {num}
        </span>
      </div>

      <div className="relative flex flex-1 flex-col gap-4 p-5 sm:p-6 lg:flex-row lg:items-center lg:gap-5 lg:py-3 lg:pl-5 lg:pr-4">
        <div className="flex min-w-0 flex-1 gap-4 lg:items-center">
          <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-lg border border-white/10 bg-black/40 lg:h-14 lg:w-14 lg:rounded-md">
            {project.imageUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={project.imageUrl}
                alt=""
                className="h-full w-full object-cover"
              />
            ) : (
              <div
                className="flex h-full w-full items-center justify-center text-2xl font-[family-name:var(--font-display-var)] lg:text-xl"
                style={{ color: accent }}
              >
                {project.name.slice(0, 1).toUpperCase()}
              </div>
            )}
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <h2 className="font-[family-name:var(--font-display-var)] text-2xl tracking-wide text-white transition-colors group-hover:text-[color:var(--accent)] lg:text-xl xl:text-2xl">
                {project.name}
              </h2>
              {project.styleTag ? (
                <span className="text-[10px] uppercase tracking-[0.18em] text-[var(--text-muted)]">
                  {project.styleTag}
                </span>
              ) : null}
            </div>
            <p className="mt-1.5 line-clamp-2 text-sm text-[var(--text-muted)] lg:line-clamp-1 lg:text-xs lg:text-[var(--text-muted)] xl:text-sm">
              {project.tagline ? (
                project.tagline
              ) : (
                <span className="italic text-white/25">Sin tagline — aún.</span>
              )}
            </p>
          </div>
        </div>

        {/* Divisor vertical desktop entre copy y acciones */}
        <div
          className="hidden h-12 w-px shrink-0 bg-gradient-to-b from-transparent via-white/15 to-transparent lg:block"
          aria-hidden
        />

        <div className="flex flex-col gap-3 border-t border-white/5 pt-3 sm:flex-row sm:items-center sm:justify-between sm:border-t-0 sm:pt-0 lg:shrink-0 lg:gap-4">
          <div className="min-w-0 flex flex-1 sm:justify-end lg:flex-initial lg:justify-end">
            <p className="sr-only">Enlaces directos a redes</p>
            {platformsSorted.length === 0 ? (
              <span className="text-xs text-white/30 lg:max-w-[140px] lg:text-right">
                Sin plataformas
              </span>
            ) : (
              <ul className="flex flex-wrap items-center gap-2 sm:justify-end">
                {platformsSorted.map((p) => {
                  const href = normalizeExternalHref(p.url);
                  const label = p.label
                    ? `${platformLabel(p.type)}: ${p.label}`
                    : platformLabel(p.type);
                  return (
                    <li key={p.id}>
                      <a
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        title={`${label} (nueva pestaña)`}
                        aria-label={`Abrir ${label} en nueva pestaña`}
                        className="flex h-9 w-9 items-center justify-center rounded-md border border-white/10 bg-black/35 text-white/60 transition-colors hover:border-[color:var(--accent)]/50 hover:bg-black/50 hover:text-[color:var(--accent)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--accent)] lg:h-8 lg:w-8"
                      >
                        <PlatformIcon type={p.type} />
                      </a>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>

          <Link
            href={`/proyecto/${project.slug}`}
            className="inline-flex w-full shrink-0 items-center justify-center whitespace-nowrap rounded-md border border-[color:var(--accent)]/55 bg-[color:var(--accent)]/12 px-4 py-2.5 text-center text-sm font-semibold text-white transition-all hover:bg-[color:var(--accent)]/22 hover:shadow-[0_0_20px_-6px_var(--accent)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--accent)] sm:w-auto lg:px-5"
          >
            Entrar al proyecto
          </Link>
        </div>
      </div>
    </article>
  );
}
