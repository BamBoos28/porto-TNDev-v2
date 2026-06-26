import { useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router";
import { ChevronLeft, ChevronRight, Eye, Filter, Code2 } from "lucide-react";
import Breadcrumb from "../components/Breadcrumb";
import { FadeInSection } from "../components/FadeInSection";
import type { Product } from "~/lib/types";
import SkeletonGrid from "~/components/SkeletonCardCatalog";
import formatRupiah from "~/lib/formatRupiah";

const idSheet = import.meta.env.VITE_ID;
const apiUrl = import.meta.env.VITE_API;
const SHEET_URL = `https://sheets.googleapis.com/v4/spreadsheets/${idSheet}/values/project?key=${apiUrl}`;

const PAGE_SIZE: number = 8;

/* =========================
   MAIN COMPONENT
========================= */
export function Catalog() {
  const [searchParams, setSearchParams] = useSearchParams();

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const page = Math.max(1, Number(searchParams.get("page") || "1"));
  const category = searchParams.get("category") || "all";
  const sort = searchParams.get("sort") || "default";

  /* =========================
     FETCH GOOGLE SHEETS
  ========================= */
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const res = await fetch(SHEET_URL);
        const json = await res.json();

        const rows = json.values || [];
        const [, ...data] = rows;

        const mapped: Product[] = data.map((row: string[], i: number) => ({
          id: i + 1,
          name: row[0],
          category: row[1],
          description: row[2],
          price: Number(row[3]),
          image: row[4],
          slug: row[5],
        }));

        setProducts(mapped);
      } catch (err) {
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  /* =========================
     FILTER + SORT
  ========================= */
  const categories = useMemo(() => {
    return [
      "all",
      ...Array.from(new Set(products.map((item) => item.category))),
    ];
  }, [products]);

  console.log(products);

  const filteredProducts = useMemo(() => {
    let result = [...products];

    if (category !== "all") {
      result = result.filter((item) => item.category === category);
    }

    if (sort === "price-asc") {
      result.sort((a, b) => a.price - b.price);
    } else if (sort === "price-desc") {
      result.sort((a, b) => b.price - a.price);
    }

    return result;
  }, [products, category, sort]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredProducts.length / PAGE_SIZE),
  );
  const safePage = Math.min(page, totalPages);

  const paginatedProducts = useMemo(() => {
    const start = (safePage - 1) * PAGE_SIZE;
    return filteredProducts.slice(start, start + PAGE_SIZE);
  }, [filteredProducts, safePage]);

  const updateParams = (updates: Record<string, string>) => {
    const next = new URLSearchParams(searchParams);

    Object.entries(updates).forEach(([key, value]) => {
      if (value === "" || value === "all" || value === "default") {
        next.delete(key);
      } else {
        next.set(key, value);
      }
    });

    if (updates.category || updates.sort) next.delete("page");

    setSearchParams(next);
  };

  const goToPage = (nextPage: number) => {
    const next = new URLSearchParams(searchParams);
    next.set("page", String(nextPage));
    setSearchParams(next);
  };

  return (
    <>
      <Breadcrumb
        title="Katalog Produk"
        subtitle="Eksplorasi Koleksi Sistem Digital"
        icon={Code2}
      />

      <section className="catalog-section section-padding">
        <div className="container-custom">
          {/* TOOLBAR */}
          <FadeInSection delay={50}>
            <div className="catalog-toolbar mb-6">
              <div className="catalog-toolbar__label">
                <Filter className="h-4 w-4" />
                <span>Filter katalog</span>
              </div>

              <div className="catalog-toolbar__group">
                <select
                  value={category}
                  onChange={(e) => updateParams({ category: e.target.value })}
                  className="catalog-select"
                >
                  {categories.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>

              <div className="catalog-toolbar__group">
                <select
                  value={sort}
                  onChange={(e) => updateParams({ sort: e.target.value })}
                  className="catalog-select"
                >
                  <option value="default">Default</option>
                  <option value="price-asc">Harga terendah</option>
                  <option value="price-desc">Harga tertinggi</option>
                </select>
              </div>
            </div>
          </FadeInSection>

          {/* GRID */}
          {loading ? (
            <SkeletonGrid pageSize={PAGE_SIZE} />
          ) : (
            <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
              {paginatedProducts.map((item, index) => (
                <FadeInSection key={item.id} delay={100 + (index % 4) * 80}>
                  <article className="catalog-card ">
                    <img src={item.image} className="catalog-card__image" />

                    <div className="catalog-card__body">
                      <div className="catalog-card__category">
                        {item.category}
                      </div>

                      <h3 className="catalog-card__title capitalize">
                        {item.name}
                      </h3>

                      <p className="catalog-card__desc line-clamp-2">
                        {item.description}
                      </p>

                      <div className="catalog-card__footer">
                        <span className="catalog-card__price">
                          {formatRupiah(item.price)}
                        </span>

                        <Link
                          to={`/catalog/${item.slug}`}
                          className="catalog-card__btn"
                        >
                          Detail <Eye className="h-4 w-4" />
                        </Link>
                      </div>
                    </div>
                  </article>
                </FadeInSection>
              ))}
            </div>
          )}

          {/* EMPTY */}
          {!loading && filteredProducts.length === 0 && (
            <div className="catalog-empty">Tidak ada produk</div>
          )}

          {/* PAGINATION */}
          {!loading && totalPages > 1 && (
            <div className="catalog-pagination">
              {/* Navigasi Pagination */}
              {totalPages > 1 && (
                <FadeInSection delay={200}>
                  <div className="catalog-pagination">
                    <button
                      type="button"
                      onClick={() => goToPage(Math.max(1, safePage - 1))}
                      disabled={safePage === 1}
                      className="catalog-pagination__btn"
                    >
                      <ChevronLeft className="h-4 w-4" />
                      Prev
                    </button>

                    {Array.from(
                      { length: totalPages },
                      (_, index) => index + 1,
                    ).map((num) => (
                      <button
                        key={num}
                        type="button"
                        onClick={() => goToPage(num)}
                        className={`catalog-pagination__page ${
                          num === safePage
                            ? "catalog-pagination__page--active"
                            : ""
                        }`}
                      >
                        {num}
                      </button>
                    ))}

                    <button
                      type="button"
                      onClick={() =>
                        goToPage(Math.min(totalPages, safePage + 1))
                      }
                      disabled={safePage === totalPages}
                      className="catalog-pagination__btn"
                    >
                      Next
                      <ChevronRight className="h-4 w-4" />
                    </button>
                  </div>
                </FadeInSection>
              )}
            </div>
          )}
        </div>
      </section>
    </>
  );
}

export default Catalog;
