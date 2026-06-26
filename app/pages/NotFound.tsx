import Breadcrumb from "../components/Breadcrumb";
import { Link } from "react-router";
import { AlertTriangle, ArrowLeft } from "lucide-react";

export function NotFound() {
  return (
    <>
      <Breadcrumb title="404 - Not Found" />

      <section className="min-h-[70vh] section-padding flex items-center justify-center">
        <div className="container-custom">
          <div className="mx-auto max-w-2xl">
            <div className="rounded-[2rem] border border-[var(--border)] bg-[var(--surface)] p-8 md:p-12 text-center shadow-lg transition-colors">
              <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-red-500/10 text-red-500">
                <AlertTriangle size={40} />
              </div>

              <h1 className="text-7xl md:text-8xl font-black tracking-tight text-[var(--text)]">
                404
              </h1>

              <h2 className="mt-4 text-2xl md:text-3xl font-bold text-[var(--text)]">
                Halaman Tidak Ditemukan
              </h2>

              <p className="mt-4 text-base md:text-lg text-[var(--text-muted)] max-w-xl mx-auto leading-relaxed">
                Maaf, halaman yang kamu cari tidak tersedia, telah dipindahkan,
                atau URL yang dimasukkan tidak valid.
              </p>

              <div className="mt-8 flex justify-center">
                <Link
                  to="/"
                  className="
                    inline-flex
                    items-center
                    gap-2
                    rounded-2xl
                    px-6
                    py-3
                    font-medium
                    bg-[var(--primary)]
                    text-white
                    transition-all
                    duration-300
                    hover:-translate-y-1
                    hover:shadow-lg
                  "
                >
                  <ArrowLeft size={18} />
                  Kembali ke Home
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute left-1/4 top-20 h-72 w-72 rounded-full bg-blue-500/10 blur-3xl" />
          <div className="absolute right-1/4 bottom-20 h-72 w-72 rounded-full bg-purple-500/10 blur-3xl" />
        </div>
      </section>
    </>
  );
}

export default NotFound;
