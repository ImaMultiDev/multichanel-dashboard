import Link from "next/link";

export function AppHeader() {
  return (
    <header className="relative z-[2] border-b border-white/5 bg-[#0a0908]/90 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link
          href="/"
          className="font-[family-name:var(--font-display-var)] text-xl tracking-[0.08em] text-white transition-colors hover:text-rose-400"
        >
          CUARTEL GENERAL
        </Link>
        <nav className="flex items-center gap-4 text-sm">
          <Link
            href="/"
            className="text-[var(--text-muted)] transition-colors hover:text-white"
          >
            Identidades
          </Link>
          <Link
            href="/nueva"
            className="rounded border border-rose-500/40 bg-rose-500/10 px-3 py-1.5 font-medium text-rose-300 transition-colors hover:border-rose-400/70 hover:bg-rose-500/20"
          >
            Nueva identidad
          </Link>
        </nav>
      </div>
    </header>
  );
}
