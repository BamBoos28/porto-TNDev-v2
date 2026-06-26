import type { LucideIcon } from "lucide-react";

type BreadcrumbProps = {
  title: string;
  subtitle?: string;
  icon?: LucideIcon;
};

export default function Breadcrumb({
  title,
  subtitle,
  icon: Icon,
}: BreadcrumbProps) {
  return (
    <section className="relative py-16 border-b border-[var(--border)] bg-[var(--bg)] overflow-hidden">
      {/* Efek Gradient Background agar konsisten dengan section lain */}
      <div className="absolute inset-0 opacity-50 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top_left,rgba(236,72,153,0.05),transparent_24%)]" />
      </div>

      <div className="container-custom relative z-10">
        <div className="flex flex-col items-center text-center">
          {/* Subtitle & Icon Section */}
          {(Icon || subtitle) && (
            <div className="flex items-center gap-2 mb-4">
              {Icon && <Icon size={18} className="text-[var(--primary)]" />}
              {subtitle && (
                <span className="text-sm font-bold uppercase tracking-widest text-[var(--primary)] font-poppins">
                  {subtitle}
                </span>
              )}
            </div>
          )}

          {/* Title */}
          <h1 className="text-4xl md:text-5xl font-extrabold text-[var(--text)] tracking-tight font-inter">
            {title}
          </h1>
        </div>
      </div>
    </section>
  );
}