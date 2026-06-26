import { Link } from "react-router";
import {
  Bug,
  DraftingCompass,
  LaptopMinimal,
  BookOpen,
  Smartphone,
  Settings2,
  RadioTower,
  Lightbulb,
  Globe,
} from "lucide-react";
import { FeatureCard } from "../components/FeatureCard";
import { FadeInSection } from "../components/FadeInSection";

export default function Home() {
  const features = [
    {
      icon: Bug,
      title: "Fix Bug & Logika Program",
      desc: "Solusi error, debugging, dan perbaikan alur logika program agar aplikasi kembali berjalan normal.",
    },
    {
      icon: DraftingCompass,
      title: "Slicing Design",
      desc: "Konversi desain dari Figma atau gambar ke kode HTML, CSS, JS, atau framework dengan hasil rapi.",
    },
    {
      icon: LaptopMinimal,
      title: "Frontend Dev",
      desc: "Pembuatan UI website dan aplikasi yang modern, responsif, dan nyaman digunakan di semua device.",
    },
    {
      icon: BookOpen,
      title: "Tugas Web",
      desc: "Bantuan pengerjaan tugas kuliah atau sekolah terkait website, coding, dan implementasi fitur.",
    },
    {
      icon: Smartphone,
      title: "Optimasi Responsive",
      desc: "Tampilan disesuaikan agar tetap sempurna di HP, tablet, laptop, sampai layar desktop besar.",
    },
    {
      icon: Settings2,
      title: "Design Figma & Canva",
      desc: "Melayani kebutuhan website custom, perbaikan fitur, dan pengembangan proyek sesuai kebutuhan.",
    },
  ];
  return (
    <>
      {/* HERO */}
      <FadeInSection className="home-section py-9 xl:py-16">
        <section id="content">
          <div className="container-custom">
            <div className="grid items-center gap-12 sm:grid-cols-2">
              <div>
                <span className="hero-eyebrow text-xs lg:text-base">
                  Website Development • Fix Bug • UI/UX • Tugas IT
                </span>

                <h1 className="hero-title max-w-2xl">
                  Jasa Pembuatan Website & Fix Logika Program
                </h1>

                <p className="hero-copy mt-6 max-w-xl">
                  Butuh bantuan untuk slicing design atau perbaikan fitur
                  aplikasi? Kami melayani jasa pengerjaan proyek website yang
                  responsif, rapi, dan sesuai kebutuhan.
                </p>

                <div className="hero-actions mt-8 flex flex-col gap-4 sm:flex-row">
                  <a
                    href="https://wa.me/6287835394899"
                    target="_blank"
                    rel="noreferrer"
                    className="cta"
                  >
                    <span>Hubungi via WhatsApp</span>
                    <svg width="13" height="10" viewBox="0 0 13 10" fill="none">
                      <path d="M1,5 L11,5" />
                      <polyline points="8 1 12 5 8 9" />
                    </svg>
                  </a>

                  <Link to="/catalog" className="cta cta-secondary">
                    <span>Lihat Layanan</span>
                    <svg width="13" height="10" viewBox="0 0 13 10" fill="none">
                      <path d="M1,5 L11,5" />
                      <polyline points="8 1 12 5 8 9" />
                    </svg>
                  </Link>
                </div>
              </div>

              <div className="relative w-full">
                <div className="home-image-wrap">
                  <img
                    src="/hero.png"
                    className="home-image w-full h-full object-cover"
                    alt="Jasa website dan coding"
                  />
                </div>

                <div className="hero-badge hero-badge--bug">
                  <div className="hero-badge-icon hero-badge-icon--bug">
                    <Bug size={22} />
                  </div>
                  <h2 className="hero-badge-title">Fix Bug</h2>
                  <span className="hero-badge-text">
                    Debugging & perbaikan logika
                  </span>
                </div>

                <div className="hero-badge hero-badge--front">
                  <div className="hero-badge-icon hero-badge-icon--front">
                    <Globe size={22} />
                  </div>
                  <h2 className="hero-badge-title">Frontend</h2>
                  <span className="hero-badge-text">UI rapi dan responsif</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </FadeInSection>

      {/* COUNTER */}
      <FadeInSection className="counter-section py-9 xl:py-16" delay={80}>
        <section>
          <div className="container-custom">
            <div className="grid gap-6 grid-cols-2 md:grid-cols-4">
              <div className="counter-card counter-card--pink">
                <div className="counter-icon counter-icon--pink">
                  <Globe className="h-10 w-10" />
                </div>
                <h2 className="counter-title">Website</h2>
                <p className="counter-text">Custom project & slicing</p>
              </div>

              <div className="counter-card counter-card--amber">
                <div className="counter-icon counter-icon--amber">
                  <Bug className="h-10 w-10" />
                </div>
                <h2 className="counter-title">Bug Fix</h2>
                <p className="counter-text">Debugging dan optimasi logic</p>
              </div>

              <div className="counter-card counter-card--lilac">
                <div className="counter-icon counter-icon--lilac">
                  <BookOpen className="h-10 w-10" />
                </div>
                <h2 className="counter-title">Tugas</h2>
                <p className="counter-text">Bantuan kuliah & sekolah</p>
              </div>

              <div className="counter-card counter-card--sky">
                <div className="counter-icon counter-icon--sky">
                  <Smartphone className="h-10 w-10" />
                </div>
                <h2 className="counter-title">Responsif</h2>
                <p className="counter-text">Mobile, tablet, dan desktop</p>
              </div>
            </div>
          </div>
        </section>
      </FadeInSection>

      {/* ABOUT */}
      <FadeInSection className="about-section py-9 xl:py-16" delay={100}>
        <section>
          <div className="container-custom">
            <div className="grid items-center gap-12 md:grid-cols-2 lg:gap-16">
              <div className="relative">
                <div className="about-image-wrap">
                  <img
                    src="/about.png"
                    className="about-image w-full h-full object-cover"
                    alt="Tentang layanan"
                  />
                </div>

                <div className="about-ribbon">
                  <h3 className="about-ribbon-title">
                    <span className="about-ribbon-number">Rapi</span>&
                    Terjangkau
                  </h3>
                </div>
              </div>

              <div>
                <div className="mb-8">
                  <h2 className="about-title">
                    Solusi coding & web development yang cepat dan tepat.
                  </h2>
                  <p className="about-copy mt-4 max-w-2xl">
                    Kami membantu pengerjaan proyek website, slicing design,
                    frontend development, fix bug, dan perbaikan logika program
                    dengan hasil yang rapi serta responsif.
                  </p>
                </div>

                <div className="space-y-6">
                  <div className="about-feature">
                    <div className="about-feature-icon about-feature-icon--pink">
                      <Lightbulb size={22} />
                    </div>
                    <div>
                      <h4 className="about-feature-title">
                        Terpercaya & Berpengalaman
                      </h4>
                      <p className="about-feature-copy">
                        Cocok untuk proyek pribadi, bisnis, maupun tugas kuliah
                        dan sekolah.
                      </p>
                    </div>
                  </div>

                  <div className="about-feature">
                    <div className="about-feature-icon about-feature-icon--amber">
                      <RadioTower size={22} />
                    </div>
                    <div>
                      <h4 className="about-feature-title">
                        Support yang Komunikatif
                      </h4>
                      <p className="about-feature-copy">
                        Bisa konsultasi terlebih dahulu agar hasil sesuai
                        kebutuhan.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-8">
                  <Link to="/catalog" className="cta">
                    <span>Lihat Layanan</span>
                    <svg width="13" height="10" viewBox="0 0 13 10" fill="none">
                      <path d="M1,5 L11,5" />
                      <polyline points="8 1 12 5 8 9" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </FadeInSection>

      {/* FEATURES */}
      <FadeInSection className="feature-section py-9 xl:py-16" delay={120}>
        <section>
          <div className="container-custom">
            <div className="section-title">
              <h4>Mengapa Memilih Kami</h4>
              <h1>Fokus pada hasil yang rapi, cepat, dan sesuai kebutuhan.</h1>
            </div>

            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {features.map((item, index) => (
                <FeatureCard key={index} item={item} />
              ))}
            </div>
          </div>
        </section>
      </FadeInSection>

      {/* SERVICE BANNER */}
      <FadeInSection className="service-section py-9 xl:py-16" delay={140}>
        <section>
          <div className="container-custom">
            <div className="grid gap-8 sm:grid-cols-2">
              <div className="service-card service-card--pink">
                <div className="service-card-content">
                  <h4>Koleksi Produk Ready</h4>
                  <h1>Source Code & Digital Product</h1>
                  <p className="line-clamp-2 lg:line-clamp-none leading-relaxed text-[var(--muted)] text-xs ">
                    Dapatkan berbagai source code aplikasi berkualitas dan
                    produk digital siap pakai untuk mempercepat pengembangan
                    proyek Anda.
                  </p>
                  <a
                    href="catalog"
                    rel="noreferrer"
                    className="cta"
                  >
                    <span>Lihat Produk</span>
                    <svg width="13" height="10" viewBox="0 0 13 10" fill="none">
                      <path d="M1,5 L11,5" />
                      <polyline points="8 1 12 5 8 9" />
                    </svg>
                  </a>
                </div>

                <div className="service-card-image">
                  <img src="/footer.png" className="" alt="Digital products" />
                </div>
              </div>

              <div className="service-card service-card--amber">
                <div className="service-card-content">
                  <h4>Khusus Mahasiswa UT</h4>
                  <h1>Akademik & IT Solutions</h1>
                  <p className="line-clamp-2 lg:line-clamp-none text-xs leading-relaxed text-[var(--muted)]">
                    Solusi tuntas diskusi Tuton, tugas akademik lintas jurusan,
                    proyek IT, hingga skripsi/tugas akhir mahasiswa UT dan umum
                    secara profesional dan berkualitas.
                  </p>
                  <a
                    href="https://wa.me/6287835394899"
                    target="_blank"
                    rel="noreferrer"
                    className="cta"
                  >
                    <span>Konsultasi Tugas</span>
                    <svg width="13" height="10" viewBox="0 0 13 10" fill="none">
                      <path d="M1,5 L11,5" />
                      <polyline points="8 1 12 5 8 9" />
                    </svg>
                  </a>
                </div>

                <div className="service-card-image">
                  <img src="/footer.png" className="" alt="Bantuan tugas UT" />
                </div>
              </div>
            </div>
          </div>
        </section>
      </FadeInSection>
    </>
  );
}
