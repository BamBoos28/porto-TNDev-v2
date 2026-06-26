import { ArrowLeft, Link } from "lucide-react";

export function DetailsSkeleton() {
  return (
    <section className="details-section section-padding">
      <div className="container-custom">
        <div className="mb-8">
          <div className="h-11 w-52 rounded-2xl border border-[var(--border)] bg-[var(--surface)] animate-pulse" />
        </div>

        <div className="grid gap-6 md:grid-cols-12">
          <div className="md:col-span-8">
            <div className="overflow-hidden rounded-[2rem] border border-[var(--border)] bg-[var(--surface)] shadow-sm">
              <div className="aspect-[16/9] w-full animate-pulse bg-gradient-to-r from-slate-200 via-slate-100 to-slate-200 dark:from-zinc-800 dark:via-zinc-700 dark:to-zinc-800" />

              <div className="p-6 md:p-8">
                <div className="mb-5 flex flex-wrap gap-2">
                  <div className="h-8 w-24 rounded-full bg-slate-200 animate-pulse dark:bg-zinc-700" />
                  <div className="h-8 w-20 rounded-full bg-slate-200 animate-pulse dark:bg-zinc-700" />
                </div>

                <div className="h-8 w-3/4 rounded-xl bg-slate-200 animate-pulse dark:bg-zinc-700" />
                <div className="mt-4 h-5 w-full rounded-lg bg-slate-200 animate-pulse dark:bg-zinc-700" />
                <div className="mt-3 h-5 w-11/12 rounded-lg bg-slate-200 animate-pulse dark:bg-zinc-700" />
                <div className="mt-3 h-5 w-10/12 rounded-lg bg-slate-200 animate-pulse dark:bg-zinc-700" />

                <div className="mt-8 space-y-4">
                  <div className="h-6 w-32 rounded-lg bg-slate-200 animate-pulse dark:bg-zinc-700" />
                  <div className="space-y-3">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <div className="mt-0.5 h-5 w-5 rounded-full bg-slate-200 animate-pulse dark:bg-zinc-700" />
                        <div className="h-5 flex-1 rounded-lg bg-slate-200 animate-pulse dark:bg-zinc-700" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="md:col-span-4">
            <div className="overflow-hidden rounded-[2rem] border border-[var(--border)] bg-[var(--surface)] p-6 shadow-sm">
              <div className="h-6 w-28 rounded-lg bg-slate-200 animate-pulse dark:bg-zinc-700" />

              <div className="mt-6 space-y-3">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between gap-4 rounded-2xl border border-[var(--border)] bg-[var(--surface-2)] p-4"
                  >
                    <div className="h-4 w-20 rounded bg-slate-200 animate-pulse dark:bg-zinc-700" />
                    <div className="h-4 w-28 rounded bg-slate-200 animate-pulse dark:bg-zinc-700" />
                  </div>
                ))}
              </div>

              <div className="mt-6 h-14 rounded-2xl bg-slate-200 animate-pulse dark:bg-zinc-700" />
              <div className="mt-4 h-12 rounded-2xl bg-slate-200 animate-pulse dark:bg-zinc-700" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function DetailsError({ message }: { message: string }) {
  return (
    <section className="details-section section-padding">
      <div className="container-custom">
        <div className="mb-8">
          <Link to="/catalog" className="details-back-btn">
            <ArrowLeft size={18} />
            Kembali ke katalog
          </Link>
        </div>

        <div className="rounded-[2rem] border border-[var(--border)] bg-[var(--surface)] p-6 text-center shadow-sm">
          <h2 className="text-xl font-bold text-[var(--text)]">
            Gagal memuat detail produk
          </h2>
          <p className="mt-2 text-sm text-[var(--text-muted)]">{message}</p>
        </div>
      </div>
    </section>
  );
}