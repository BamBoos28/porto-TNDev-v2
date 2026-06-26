import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router";
import {
  ChevronLeft,
  ChevronRight,
  MessageSquareText,
  X,
  Maximize2,
} from "lucide-react";
import Breadcrumb from "../components/Breadcrumb";
import { FadeInSection } from "../components/FadeInSection";
import type { Testimonial } from "~/lib/types";
import { parseTestimonials } from "~/lib/parseTestimonials";
import { SkeletonGrid } from "~/components/SkeletonCardTesti";

const PAGE_SIZE = 12;
const idSheet = import.meta.env.VITE_ID;
const apiUrl = import.meta.env.VITE_API;

const SHEET_URL =
  `https://sheets.googleapis.com/v4/spreadsheets/${idSheet}/values/testimoni?key=${apiUrl}`;

export default function Testimoni() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selected, setSelected] = useState<Testimonial | null>(null);
  const [data, setData] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const testimonials = useMemo(() => data, [data]);

  const activeCategory = searchParams.get("category") || "all";

  const categories = useMemo(() => {
    const unique = Array.from(
      new Set(
        testimonials
          .map((item) => item.cat?.trim())
          .filter((cat): cat is string => Boolean(cat)),
      ),
    );
    return unique;
  }, [testimonials]);

  const filteredTestimonials = useMemo(() => {
    if (activeCategory === "all") return testimonials;
    return testimonials.filter(
      (item) => item.cat?.trim() === activeCategory.trim(),
    );
  }, [activeCategory, testimonials]);

  const page = Math.max(1, Number(searchParams.get("page") || "1"));
  const totalPages = Math.max(1, Math.ceil(filteredTestimonials.length / PAGE_SIZE));
  const safePage = Math.min(page, totalPages);

  const pageItems = useMemo(() => {
    const startIndex = (safePage - 1) * PAGE_SIZE;
    return filteredTestimonials.slice(startIndex, startIndex + PAGE_SIZE);
  }, [safePage, filteredTestimonials]);

  useEffect(() => {
    const controller = new AbortController();

    const loadTestimonials = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(SHEET_URL, {
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error(`Gagal mengambil data. Status: ${response.status}`);
        }

        const json = await response.json();
        const values: string[][] = json?.values ?? [];
        const parsed = parseTestimonials(values);

        setData(parsed);
      } catch (err) {
        if ((err as Error).name === "AbortError") return;
        setError(
          (err as Error).message || "Terjadi kesalahan saat memuat data.",
        );
      } finally {
        setLoading(false);
      }
    };

    loadTestimonials();

    return () => controller.abort();
  }, []);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelected(null);
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const goToPage = (nextPage: number) => {
    const next = new URLSearchParams(searchParams);
    next.set("page", String(nextPage));
    setSearchParams(next);

    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const setCategory = (category: string) => {
    const next = new URLSearchParams(searchParams);

    if (category === "all") {
      next.delete("category");
    } else {
      next.set("category", category);
    }

    next.set("page", "1");
    setSearchParams(next);

    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <>
      <Breadcrumb
        title="Testimoni"
        subtitle="Suara Klien Kami"
        icon={MessageSquareText}
      />

      <section className="section-padding">
        <div className="container-custom">
          <div className="mb-6 flex flex-wrap items-center justify-center gap-2">
            <button
              onClick={() => setCategory("all")}
              className={`inline-flex h-10 items-center justify-center rounded-full border px-4 text-sm font-semibold transition ${
                activeCategory === "all"
                  ? "border-[var(--primary)] bg-[var(--primary)] text-white shadow-sm"
                  : "border-[var(--border)] bg-[var(--surface)] text-[var(--text)] hover:bg-[var(--surface-2)] "
              }`}
            >
              ALL
            </button>

            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`inline-flex h-10 items-center justify-center rounded-full border px-4 text-sm font-semibold transition ${
                  activeCategory === cat
                    ? "border-[var(--primary)] bg-[var(--primary)] text-white shadow-sm uppercase"
                    : "border-[var(--border)] bg-[var(--surface)] text-[var(--text)] hover:bg-[var(--surface-2)] capitalize"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="flex w-full justify-center">
            {loading ? (
              <SkeletonGrid pageSize={PAGE_SIZE} />
            ) : error ? (
              <div className="w-full max-w-2xl rounded-[1.5rem] border border-[var(--border)] bg-[var(--surface)] p-6 text-center shadow-sm">
                <h3 className="text-lg font-bold text-[var(--text)]">
                  Gagal memuat testimoni
                </h3>
                <p className="mt-2 text-sm text-[var(--text-muted)]">{error}</p>
                <button
                  onClick={() => window.location.reload()}
                  className="mt-5 inline-flex h-10 items-center justify-center rounded-xl border border-[var(--border)] bg-[var(--surface-2)] px-4 text-sm font-semibold text-[var(--text)] transition hover:opacity-90"
                >
                  Coba lagi
                </button>
              </div>
            ) : filteredTestimonials.length === 0 ? (
              <div className="w-full max-w-2xl rounded-[1.5rem] border border-[var(--border)] bg-[var(--surface)] p-6 text-center shadow-sm">
                <h3 className="text-lg font-bold text-[var(--text)]">
                  Belum ada testimoni
                </h3>
                <p className="mt-2 text-sm text-[var(--text-muted)]">
                  {activeCategory === "all"
                    ? "Data dari Google Sheets masih kosong."
                    : `Belum ada testimoni untuk kategori "${activeCategory}".`}
                </p>
              </div>
            ) : (
              <div className="columns-2 gap-3 space-y-3 sm:columns-3 lg:columns-4 xl:columns-6 w-full">
                {pageItems.map((item, index) => {
                  const itemDelay = (index % PAGE_SIZE) * 75;
                  const aspectClass =
                    index % 3 === 0
                      ? "aspect-[3/4]"
                      : index % 2 === 0
                        ? "aspect-square"
                        : "aspect-[2/3]";

                  return (
                    <FadeInSection
                      key={item.id}
                      delay={itemDelay}
                      className="break-inside-avoid"
                    >
                      <article
                        onClick={() => setSelected(item)}
                        className={`group relative cursor-zoom-in overflow-hidden rounded-[1.5rem] border border-[var(--border)] bg-[var(--surface)] shadow-sm transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl ${aspectClass}`}
                      >
                        <div className="relative h-full w-full">
                          <img
                            src={item.image}
                            alt={item.title}
                            className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                            loading="lazy"
                          />

                          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent opacity-70 transition-opacity duration-300 group-hover:opacity-100" />

                          <div className="absolute right-3 top-3 rounded-full border border-white/20 bg-white/15 p-2 text-white backdrop-blur-md opacity-0 transition-all duration-300 group-hover:opacity-100">
                            <Maximize2 className="h-4 w-4" />
                          </div>

                          <div className="absolute bottom-0 left-0 w-full p-4 transition-transform duration-300 group-hover:translate-y-0">
                            <h3 className="mb-1 text-sm font-bold leading-tight text-white">
                              {item.title}
                            </h3>
                            <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[var(--primary-2)] opacity-90">
                              {item.cat}
                            </p>
                          </div>
                        </div>
                      </article>
                    </FadeInSection>
                  );
                })}
              </div>
            )}
          </div>

          {!loading && !error && filteredTestimonials.length > 0 && totalPages > 1 && (
            <div className="mt-12 flex items-center justify-center gap-2">
              <button
                onClick={() => goToPage(Math.max(1, safePage - 1))}
                disabled={safePage === 1}
                className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-[var(--border)] bg-[var(--surface)] text-[var(--text)] shadow-sm transition hover:bg-[var(--surface-2)] disabled:cursor-not-allowed disabled:opacity-40"
                aria-label="Previous page"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>

              <div className="flex h-10 items-center rounded-xl border border-[var(--border)] bg-[var(--surface-2)] px-4 text-xs font-black text-[var(--text)] shadow-sm">
                {safePage} / {totalPages}
              </div>

              <button
                onClick={() => goToPage(Math.min(totalPages, safePage + 1))}
                disabled={safePage === totalPages}
                className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-[var(--border)] bg-[var(--surface)] text-[var(--text)] shadow-sm transition hover:bg-[var(--surface-2)] disabled:cursor-not-allowed disabled:opacity-40"
                aria-label="Next page"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          )}
        </div>
      </section>

      {selected && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-md"
          onClick={(e) => e.target === e.currentTarget && setSelected(null)}
        >
          <div className="relative w-full max-w-lg overflow-hidden rounded-[2rem] border border-white/10 bg-[var(--surface)] shadow-2xl animate-fade-in flex flex-col justify-center">
            <button
              onClick={() => setSelected(null)}
              className="absolute right-5 top-5 z-20 flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-black/35 text-white backdrop-blur-xl transition hover:bg-[var(--primary)]"
              aria-label="Close preview"
            >
              <X className="h-5 w-5" />
            </button>

            <img
              src={selected.image}
              alt={selected.title}
              className="h-[36em] object-contain"
            />

            <div className="border-t border-[var(--border)] bg-[var(--surface)] p-8 text-center">
              <h3 className="text-2xl font-black leading-tight text-[var(--text)]">
                {selected.title}
              </h3>
              <div className="mt-3 inline-flex rounded-full bg-[var(--surface-2)] px-4 py-1 text-xs font-bold uppercase tracking-[0.18em] text-[var(--primary)]">
                {selected.cat}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}