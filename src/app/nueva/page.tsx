import Link from "next/link";
import { NewIdentityForm } from "@/components/forms/new-identity-form";

export default function NuevaIdentidadPage() {
  return (
    <main className="mx-auto flex w-full max-w-2xl flex-1 flex-col px-4 py-10 sm:px-6 sm:py-14">
      <Link
        href="/"
        className="text-sm text-[var(--text-muted)] transition-colors hover:text-white"
      >
        ← Volver al panel
      </Link>
      <h1 className="mt-6 font-[family-name:var(--font-display-var)] text-4xl tracking-wide text-white">
        Nueva identidad
      </h1>
      <p className="mt-2 text-[var(--text-muted)]">
        Dale nombre y personalidad. Siempre podrás ajustar branding y enlaces
        después.
      </p>
      <div className="mt-10">
        <NewIdentityForm />
      </div>
    </main>
  );
}
