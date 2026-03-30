import Link from "next/link";
import { IdentityCard } from "@/components/identity-card";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

async function loadProjects() {
  try {
    return await prisma.project.findMany({
      orderBy: { updatedAt: "desc" },
      include: {
        platforms: {
          select: {
            id: true,
            type: true,
            url: true,
            sortOrder: true,
            label: true,
          },
        },
      },
    });
  } catch {
    return null;
  }
}

export default async function HomePage() {
  const projects = await loadProjects();

  if (projects === null) {
    return (
      <main className="mx-auto flex max-w-2xl flex-1 flex-col justify-center px-4 py-16 sm:px-6">
        <div className="rounded-xl border border-rose-500/30 bg-rose-950/20 p-8 text-center">
          <h1 className="font-[family-name:var(--font-display-var)] text-3xl tracking-wide text-white">
            Sin conexión a la base de datos
          </h1>
          <p className="mt-4 text-[var(--text-muted)]">
            Configura{" "}
            <code className="rounded bg-black/40 px-1.5 py-0.5 font-mono text-sm text-rose-200">
              DATABASE_URL
            </code>{" "}
            en <code className="font-mono text-sm text-white/80">.env</code> (por
            ejemplo tu Postgres en Railway) y ejecuta{" "}
            <code className="font-mono text-sm text-white/80">
              npx prisma db push
            </code>
            .
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col px-4 py-10 sm:px-6 sm:py-14 xl:max-w-5xl 2xl:max-w-6xl">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-rose-400/80">
            Panel
          </p>
          <h1 className="font-[family-name:var(--font-display-var)] text-4xl tracking-wide text-white sm:text-5xl">
            Tus identidades
          </h1>
          <p className="mt-2 max-w-xl text-[var(--text-muted)]">
            Un vistazo a todos tus proyectos. Entra en uno y salta a plataformas
            o enlaces en segundos.
          </p>
        </div>
        <Link
          href="/nueva"
          className="inline-flex items-center justify-center rounded-lg border border-rose-500/50 bg-rose-600 px-5 py-3 font-semibold text-white shadow-lg shadow-rose-900/30 transition-colors hover:bg-rose-500"
        >
          Nueva identidad
        </Link>
      </div>

      {projects.length === 0 ? (
        <div className="mt-16 flex flex-col items-center rounded-2xl border border-white/10 bg-[var(--bg-card)] px-8 py-20 text-center glow-border">
          <p className="font-[family-name:var(--font-display-var)] text-2xl text-white/90">
            Aún no hay proyectos
          </p>
          <p className="mt-3 max-w-md text-[var(--text-muted)]">
            Crea tu primera identidad musical: nombre, imagen opcional y un
            color que la represente. Luego añade Spotify, YouTube y el resto.
          </p>
          <Link
            href="/nueva"
            className="mt-8 rounded-lg bg-white px-6 py-3 font-semibold text-black hover:bg-white/90"
          >
            Crear primera identidad
          </Link>
        </div>
      ) : (
        <ul className="mt-12 flex flex-col gap-4 sm:gap-5">
          {projects.map((p, i) => (
            <li key={p.id}>
              <IdentityCard project={p} index={i + 1} />
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
