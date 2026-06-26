import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router";
import { ArrowLeft, CheckCircle2, Sparkles } from "lucide-react";

import formatRupiah from "../lib/formatRupiah";
import { getPastelColor } from "../lib/getPastelColor";

import type { ProductDetailExtended } from "~/lib/types";
import {
  FALLBACK_PRODUCT,
  parseSheetToProductExtended,
} from "~/lib/parseSheetToProduct";

import { DetailsError, DetailsSkeleton } from "~/components/DetailsSkeleton";

const idSheet = import.meta.env.VITE_ID;
const apiKey = import.meta.env.VITE_API;

const SIDEBAR_LABELS = new Set(["Kategori", "Tipe", "Versi", "Format"]);

// Ubah ini sesuai tinggi navbar sticky kamu
const NAVBAR_OFFSET = "calc(var(--navbar-height, 80px) + 1rem)";

export default function Details() {
  const { slug } = useParams();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [product, setProduct] =
    useState<ProductDetailExtended>(FALLBACK_PRODUCT);
  const [lightbox, setLightbox] = useState<string | null>(null);

  console.log(product);

  useEffect(() => {
    if (!slug) {
      setError("Slug produk tidak ditemukan.");
      setLoading(false);
      return;
    }

    const controller = new AbortController();

    const load = async () => {
      try {
        setLoading(true);
        setError("");

        const sheetUrl = `https://sheets.googleapis.com/v4/spreadsheets/${idSheet}/values/${slug}?key=${apiKey}`;

        const response = await fetch(sheetUrl, {
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error(`Gagal mengambil data. Status: ${response.status}`);
        }

        const json = await response.json();
        const values: string[][] = json?.values ?? [];

        if (!values.length) {
          throw new Error("Data produk tidak ditemukan.");
        }

        const parsed = parseSheetToProductExtended(values);
        setProduct(parsed);
      } catch (err) {
        if ((err as Error).name === "AbortError") return;
        setError(
          (err as Error).message || "Terjadi kesalahan saat memuat data.",
        );
      } finally {
        setLoading(false);
      }
    };

    load();

    return () => controller.abort();
  }, [slug]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightbox(null);
    };

    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  const sidebarSpecs = useMemo(
    () => product.specs.filter((spec) => SIDEBAR_LABELS.has(spec.label)),
    [product.specs],
  );

  if (loading) return <DetailsSkeleton />;
  if (error) return <DetailsError message={error} />;

  return (
    <section className="details-section section-padding">
      <div className="container-custom">
        <div className="mb-8">
          <Link to="/catalog" className="details-back-btn">
            <ArrowLeft size={18} />
            Kembali ke katalog
          </Link>
        </div>

        <div className="grid gap-8 md:grid-cols-12 items-start">
          {/* Main content */}
          <div className="md:col-span-8">
            <div className="details-main-card overflow-hidden">
              <div className="details-image-wrap">
                <img
                  src={product.image}
                  alt={product.name}
                  className="details-image"
                />
              </div>

              <div className="details-content">
                <div className="flex flex-col gap-4 md:flex-row lg:items-start lg:justify-between">
                  <div className="min-w-0">
                    <h1 className="details-title">{product.name}</h1>
                    <p className="details-desc">{product.shortDesc}</p>
                  </div>

                  <div className="shrink-0 rounded-2xl border border-[var(--border)] bg-[var(--surface-2)] px-5 py-4 shadow-[var(--shadow-soft)]">
                    <div className="text-sm text-[var(--muted)] mb-1">
                      Harga
                    </div>
                    <div className="text-2xl font-bold text-[var(--primary)]">
                      {formatRupiah(product.price)}
                    </div>
                  </div>
                </div>

                {/* Deskripsi dengan penanganan break line manual */}
                <div className="details-block mt-8">
                  <h3 className="details-block__title ">Deskripsi</h3>
                  <p className="details-desc-text">
                    {product.longDesc
                      .replace(/<br\s*\/?>/g, "\n")
                      .split("\n")
                      .map((item, index, array) => (
                        <span key={index}>
                          {item}
                          {index < array.length - 1 && <br />}
                        </span>
                      ))}
                  </p>
                </div>

                {product.features.length > 0 && (
                  <div className="details-block mt-8">
                    <h3 className="details-block__title">Fitur Utama</h3>
                    <ul className="details-features">
                      {product.features.map((feature) => (
                        <li key={feature} className="details-feature">
                          <CheckCircle2 size={20} />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="md:col-span-4">
            <div
              className="details-sidebar-card space-y-6 "
              style={{
                top: NAVBAR_OFFSET,
                maxHeight: `calc(100vh - ${NAVBAR_OFFSET} - 1rem)`,
              }}
            >
              <div>
                <div className="details-sidebar-title">
                  <Sparkles size={20} />
                  Teknologi
                </div>

                {product.tech.length > 0 ? (
                  <div className="details-badges mt-4">
                    {product.tech.map((item) => {
                      const style = getPastelColor(item);

                      return (
                        <span
                          key={item}
                          className="details-badge"
                          style={{
                            background: style.background,
                            color: style.color,
                            borderColor: style.border,
                          }}
                        >
                          {item}
                        </span>
                      );
                    })}
                  </div>
                ) : (
                  <p className="mt-4 text-sm text-[var(--muted)]">
                    Tidak ada tech yang ditambahkan.
                  </p>
                )}
              </div>

              <div>
                <div className="details-sidebar-title">
                  <Sparkles size={20} />
                  Ringkasan Produk
                </div>

                <div className="details-specs mt-4">
                  {sidebarSpecs.map((spec) => (
                    <div key={spec.label} className="details-spec">
                      <span>{spec.label}</span>
                      <strong>{spec.value}</strong>
                    </div>
                  ))}
                </div>
              </div>

              <a
                href="https://wa.me/6287835394899"
                target="_blank"
                rel="noreferrer"
                className="consultation_btn details-whatsapp w-full text-center"
              >
                Konsultasi via WhatsApp
              </a>
            </div>
          </div>
        </div>

        {/* Gallery */}
        {product.images.length > 0 && (
          <div className="mt-10 rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-4 sm:p-6 shadow-[var(--shadow)]">
            <div className="mb-5 flex items-center justify-between gap-4">
              <div>
                <h2 className="details-block__title">Galeri</h2>
                <p className="text-sm text-[var(--muted)]">
                  Klik gambar untuk melihat ukuran penuh
                </p>
              </div>

              <div className="rounded-full border border-[var(--border)] bg-[var(--surface-2)] px-3 py-1 text-sm text-[var(--muted)]">
                {product.images.length} foto
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-4 auto-rows-[170px]">
              {product.images.map((src, index) => {
                const spanClass =
                  index % 7 === 0
                    ? "sm:col-span-2 sm:row-span-2"
                    : index % 7 === 3
                      ? "sm:row-span-2"
                      : index % 7 === 5
                        ? "sm:col-span-2"
                        : "";

                return (
                  <button
                    key={`${src}-${index}`}
                    type="button"
                    onClick={() => setLightbox(src)}
                    className={[
                      "group relative overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface-2)] shadow-[var(--shadow-soft)]",
                      "transition-transform duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-md)]",
                      "min-h-[160px] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]",
                      spanClass,
                    ]
                      .filter(Boolean)
                      .join(" ")}
                  >
                    <img
                      src={src}
                      alt={`${product.name} - gambar ${index + 1}`}
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-black/5 to-transparent opacity-100" />
                    <div className="absolute inset-x-0 bottom-0 p-3 text-left">
                      <span className="inline-flex rounded-full bg-white/90 px-2.5 py-1 text-xs font-medium text-[var(--text)] backdrop-blur">
                        Gambar {index + 1}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Lightbox */}
        {lightbox && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
            onClick={() => setLightbox(null)}
          >
            <button
              className="absolute right-4 top-4 rounded-full bg-white/10 p-2 text-white transition hover:bg-white/20"
              onClick={() => setLightbox(null)}
              aria-label="Tutup"
            >
              ✕
            </button>

            <img
              src={lightbox}
              alt="Preview"
              className="max-h-[90vh] max-w-full rounded-xl object-contain shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        )}
      </div>
    </section>
  );
}