import {
  BadgeCheck,
  BriefcaseBusiness,
  Code2,
  Globe,
  LaptopMinimal,
  MessageCircle,
  MonitorSmartphone,
  Sparkles,
  Users,
} from "lucide-react";
import Breadcrumb from "../components/Breadcrumb";
import { FadeInSection } from "../components/FadeInSection";

const services = [
  { icon: Code2, label: "Bug Fixing", desc: "Clean & scalable code" },
  { icon: MonitorSmartphone, label: "Responsive", desc: "Mobile first design" },
  { icon: Sparkles, label: "UI Slicing", desc: "Pixel perfect result" },
  { icon: Globe, label: "Web Dev", desc: "Modern technologies" },
];

export default function Profile() {
  return (
    <>
      <Breadcrumb
        title="Profil"
        subtitle="Kenali Layanan & Pengalaman"
        icon={BadgeCheck}
      />

      <section className="section-padding relative overflow-hidden bg-[var(--bg)]">
        {/* Decorative Background Glows */}
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute left-1/4 top-0 h-96 w-96 rounded-full bg-[rgba(236,72,153,0.10)] blur-[120px]" />
          <div className="absolute bottom-0 right-1/4 h-96 w-96 rounded-full bg-[rgba(245,158,11,0.10)] blur-[120px]" />
        </div>

        <div className="container-custom">
          <FadeInSection>
            {/* PERBAIKAN GRID: Menghapus lg:grid-rows-3 agar tinggi baris fleksibel (auto-height) 
              menyesuaikan kepadatan isi konten masing-masing item.
            */}
            <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
              {/* [DIV 1] Main Hero Card */}
              <div className="group relative overflow-hidden rounded-[2rem] border border-[var(--border)] bg-[var(--surface)] p-8 shadow-[var(--shadow-soft)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-md)] col-span-2 md:col-span-3 flex flex-col justify-between">
                <div className="absolute inset-0 bg-gradient-to-br from-[rgba(236,72,153,0.06)] via-transparent to-[rgba(245,158,11,0.06)]" />
                <div className="relative z-10 flex h-full flex-col justify-between">
                  <div>
                    <div className="inline-flex items-center gap-2 rounded-full border border-[rgba(236,72,153,0.18)] bg-[var(--surface-2)] px-4 py-1.5 text-xs font-bold uppercase tracking-[0.18em] text-[var(--primary)]">
                      <Sparkles className="h-3.5 w-3.5" />
                      Available for Projects
                    </div>

                    <h2 className="mt-6 max-w-2xl text-3xl font-bold leading-tight text-[var(--text)] lg:text-4xl">
                      Solusi Digital Modern <br />
                    </h2>

                    <p className="mt-3 max-w-xl  text-[var(--muted)]">
                      Spesialis dalam membangun website yang tidak hanya
                      estetik, tapi juga performan dan responsif. Berpengalaman
                      menangani sistem informasi akademik hingga e-commerce
                      ritel.
                    </p>
                  </div>

                  <div className="mt-8 flex items-center gap-4">
                    <div className="flex -space-x-3">
                      {[1, 2, 3].map((i) => (
                        <div
                          key={i}
                          className="h-8 w-8 rounded-full border-2 border-[var(--surface)] bg-[var(--primary-2)] opacity-80"
                        />
                      ))}
                    </div>
                    <p className="text-xs font-semibold text-[var(--muted)]">
                      Dipercaya oleh{" "}
                      <span className="text-[var(--text)]">30+ klien</span>{" "}
                      mahasiswa & pelaku usaha
                    </p>
                  </div>
                </div>

                <div className="absolute -bottom-10 -right-10 opacity-[0.04] transition-transform duration-500 group-hover:scale-110">
                  <Code2 size={240} />
                </div>
              </div>

              {/* [DIV 2] Profile Image Card */}
              <div className="overflow-hidden rounded-[2rem] border border-[var(--border)] bg-[var(--surface-2)] shadow-[var(--shadow-soft)] min-h-[250px] col-span-2 md:col-span-1">
                <img
                  src="/slogan.png"
                  alt="Profil"
                  className="h-full w-full object-contain transition-transform duration-500 hover:scale-105"
                />
              </div>

              {/* [DIV 3] Stats WhatsApp */}
              <div className="group/card  rounded-[1.5rem] border border-[var(--border)] bg-[var(--surface)] p-6 shadow-[var(--shadow-soft)] transition-all duration-300 hover:-translate-y-1 hover:border-[rgba(236,72,153,0.25)] hover:shadow-[var(--shadow-md)] flex flex-col justify-between gap-4 h-50 relative overflow-hidden pb-8">
                <div className="flex items-center justify-between">
                  <div className="inline-flex rounded-2xl bg-emerald-500/15 p-3 text-emerald-600">
                    <MessageCircle className="h-6 w-6" />
                  </div>
                  {/* Real-time Status Pulse Indicator */}
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-emerald-500">
                    <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" />
                    Online
                  </span>
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-[var(--muted)]">
                    Hubungi Admin
                  </p>
                  <h4 className="mt-1 text-lg font-bold tracking-tight text-[var(--text)] break-words xl:text-xl">
                    +62 878-3539-4899
                  </h4>
                </div>
                {/* Aksesori Garis Bawah Pastel (Emerald/Hijau) */}
                <div className="absolute bottom-0 left-6 right-6 h-[3px] rounded-full bg-emerald-400/30 transition-all duration-300 group-hover/card:left-0 group-hover/card:right-0 group-hover/card:rounded-none group-hover/card:bg-emerald-400/60" />
              </div>

              {/* [DIV 4] Stats Project Selesai */}
              <div className="group/card rounded-[1.5rem] border border-[var(--border)] bg-[var(--surface)] p-6 shadow-[var(--shadow-soft)] transition-all duration-300 hover:-translate-y-1 hover:border-[rgba(236,72,153,0.25)] hover:shadow-[var(--shadow-md)] flex flex-col justify-between gap-4  relative overflow-hidden pb-8">
                <div className="inline-flex w-fit rounded-2xl bg-sky-500/15 p-3 text-sky-600">
                  <BriefcaseBusiness className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-[var(--muted)]">
                    Project Selesai
                  </p>
                  <h4 className="text-2xl font-black tracking-tight text-[var(--text)] lg:text-3xl">
                    48+
                  </h4>
                </div>
                {/* Aksesori Garis Bawah Pastel (Sky/Biru) */}
                <div className="absolute bottom-0 left-6 right-6 h-[3px] rounded-full bg-sky-400/30 transition-all duration-300 group-hover/card:left-0 group-hover/card:right-0 group-hover/card:rounded-none group-hover/card:bg-sky-400/60" />
              </div>

              {/* [DIV 5] Stats Demo UI */}
              <div className="group/card rounded-[1.5rem] border border-[var(--border)] bg-[var(--surface)] p-6 shadow-[var(--shadow-soft)] transition-all duration-300 hover:-translate-y-1 hover:border-[rgba(236,72,153,0.25)] hover:shadow-[var(--shadow-md)] flex flex-col justify-between gap-4  relative overflow-hidden pb-8">
                <div className="inline-flex w-fit rounded-2xl bg-violet-500/15 p-3 text-violet-600">
                  <LaptopMinimal className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-[var(--muted)]">
                    Slicing UI / Demo
                  </p>
                  <h4 className="text-2xl font-black tracking-tight text-[var(--text)] lg:text-3xl">
                    22+
                  </h4>
                </div>
                {/* Aksesori Garis Bawah Pastel (Violet/Ungu) */}
                <div className="absolute bottom-0 left-6 right-6 h-[3px] rounded-full bg-violet-400/30 transition-all duration-300 group-hover/card:left-0 group-hover/card:right-0 group-hover/card:rounded-none group-hover/card:bg-violet-400/60" />
              </div>

              {/* [DIV 6] Stats Happy Clients */}
              <div className="group/card rounded-[1.5rem] border border-[var(--border)] bg-[var(--surface)] p-6 shadow-[var(--shadow-soft)] transition-all duration-300 hover:-translate-y-1 hover:border-[rgba(236,72,153,0.25)] hover:shadow-[var(--shadow-md)] flex flex-col justify-between gap-4  relative overflow-hidden pb-8">
                <div className="inline-flex w-fit rounded-2xl bg-orange-500/15 p-3 text-orange-600">
                  <Users className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-[var(--muted)]">
                    Klien Puas
                  </p>
                  <h4 className="text-2xl font-black tracking-tight text-[var(--text)] lg:text-3xl">
                    31+
                  </h4>
                </div>
                {/* Aksesori Garis Bawah Pastel (Orange) */}
                <div className="absolute bottom-0 left-6 right-6 h-[3px] rounded-full bg-orange-400/30 transition-all duration-300 group-hover/card:left-0 group-hover/card:right-0 group-hover/card:rounded-none group-hover/card:bg-orange-400/60" />
              </div>

              {/* [DIV 7] Services Card */}
              <div className="rounded-[2rem] border border-[var(--border)] bg-[var(--surface)] p-6 shadow-[var(--shadow-md)] md:col-span-4 col-span-2">
                <div className="mb-6 flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--primary)]">
                      Service Stack
                    </p>
                    <h3 className="mt-1 text-xl font-bold text-[var(--text)]">
                      Layanan Utama Yang Kami Sediakan
                    </h3>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                  {services.map((s, idx) => (
                    <div
                      key={idx}
                      className="group cursor-default rounded-[1.25rem] border border-[var(--border)] bg-[var(--surface-2)] p-4 transition-all duration-300 hover:-translate-y-1 hover:border-[rgba(236,72,153,0.22)] hover:shadow-[var(--shadow-soft)] flex flex-col h-full"
                    >
                      <div className="mb-3 inline-flex w-fit rounded-xl bg-gradient-to-br from-[rgba(236,72,153,0.14)] to-[rgba(245,158,11,0.14)] p-2.5 text-[var(--primary)] transition-colors group-hover:text-[var(--accent)]">
                        <s.icon className="h-5 w-5" />
                      </div>
                      <h4 className="text-sm font-bold text-[var(--text)]">
                        {s.label}
                      </h4>
                      <p className="mt-1 text-[11px] leading-relaxed text-[var(--muted)]">
                        {s.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </FadeInSection>
        </div>
      </section>
    </>
  );
}
