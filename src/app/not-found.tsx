import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8 text-center bg-bg text-fg">
      <div className="max-w-md space-y-4">
        <p className="text-sm font-mono text-accent">404 — Not Found</p>
        <h1 className="text-3xl font-bold tracking-tight">Page does not exist</h1>
        <p className="text-sm text-fg-muted">
          The requested route or project resource could not be found.
        </p>
        <div className="pt-4">
          <Link
            href="/"
            className="inline-flex items-center px-4 py-2 rounded-md bg-accent text-accent-fg font-medium text-sm transition hover:opacity-90"
          >
            Return Home
          </Link>
        </div>
      </div>
    </main>
  );
}
