import type { Props } from "~/lib/types";

function SkeletonCard({ index }: { index: number }) {
  const aspectClass =
    index % 3 === 0
      ? "aspect-[3/4]"
      : index % 2 === 0
        ? "aspect-square"
        : "aspect-[2/3]";

  return (
    <div className="break-inside-avoid">
      <div
        className={`group relative overflow-hidden rounded-[1.5rem] border border-[var(--border)] bg-[var(--surface)] shadow-sm ${aspectClass}`}
      >
        <div className="absolute inset-0 animate-pulse bg-gradient-to-br from-slate-200 via-slate-100 to-slate-200 dark:from-zinc-800 dark:via-zinc-700 dark:to-zinc-800" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

        <div className="absolute right-3 top-3 h-9 w-9 rounded-full bg-white/20 backdrop-blur-md dark:bg-black/20" />

        <div className="absolute bottom-0 left-0 w-full p-4">
          <div className="mb-2 h-4 w-2/3 rounded-full bg-white/25" />
          <div className="h-3 w-1/2 rounded-full bg-white/20" />
        </div>
      </div>
    </div>
  );
}

export function SkeletonGrid({pageSize}:Props) {
  return (
    <div className="columns-2 gap-3 space-y-3 sm:columns-3 lg:columns-4 xl:columns-6 w-full">
      {Array.from({ length: pageSize }).map((_, index) => (
        <SkeletonCard key={index} index={index} />
      ))}
    </div>
  );
}