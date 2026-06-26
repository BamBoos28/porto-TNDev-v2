import type { Props } from "~/lib/types";

function SkeletonCard() {
  return (
    <div className="overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)]">
      <div className="animate-pulse">
        {/* image */}
        <div className="h-40 w-full bg-gradient-to-r from-slate-200 via-slate-100 to-slate-200 dark:from-zinc-800 dark:via-zinc-700 dark:to-zinc-800" />

        <div className="p-4 space-y-3">
          <div className="h-3 w-1/3 rounded bg-slate-200 dark:bg-zinc-700" />
          <div className="h-4 w-2/3 rounded bg-slate-200 dark:bg-zinc-700" />
          <div className="h-3 w-full rounded bg-slate-200 dark:bg-zinc-700" />
          <div className="h-3 w-5/6 rounded bg-slate-200 dark:bg-zinc-700" />

          <div className="flex justify-between pt-2">
            <div className="h-4 w-1/3 rounded bg-slate-200 dark:bg-zinc-700" />
            <div className="h-8 w-16 rounded-lg bg-slate-200 dark:bg-zinc-700" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function SkeletonGrid({pageSize}:Props) {
  return (
    <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
      {Array.from({ length: pageSize }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  );
}
