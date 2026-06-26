import { useState } from "react";
import type { ChangeEvent, MouseEvent } from "react";
import type { LucideIcon } from "lucide-react";
import { FadeInSection } from "./FadeInSection";

interface FeatureItem {
  title: string;
  desc: string;
  icon: LucideIcon;
}

interface FeatureCardProps {
  item: FeatureItem;
}

export function FeatureCard({ item }: FeatureCardProps) {
  const [expectedPrice, setExpectedPrice] = useState("");

  // Fungsi utilitas untuk memformat angka ke format ribuan rupiah
  const formatRupiah = (value: string) => {
    const cleanNumber = value.replace(/\D/g, "");
    if (!cleanNumber) return "";
    return new Intl.NumberFormat("id-ID").format(Number(cleanNumber));
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value;
    // Format input agar user melihat pemisah ribuan (titik)
    const formatted = formatRupiah(rawValue);
    setExpectedPrice(formatted);
  };

  const handleConsultation = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();

    const phoneNumber = "6287835394899";
    // Mengambil nilai angka bersih tanpa titik untuk pesan WhatsApp
    const cleanPrice = expectedPrice ? `Rp ${expectedPrice}` : "-";

    const message =
      `Halo, saya tertarik dengan layanan: *${item.title}*\n\n` +
      `Deskripsi: ${item.desc}\n` +
      `Budget/Harga yang diharapkan: ${cleanPrice}\n\n` +
      `Mohon informasinya lebih lanjut.`;

    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const Icon = item.icon;

  return (
      <div className="h-full">
        <article className="feature-card">
          <div className="feature-card__top">
            <div className="feature-card__icon-wrap">
              <Icon className="feature-card__icon" />
            </div>

            <div className="feature-card__heading">
              <h2 className="feature-card__title">{item.title}</h2>
              <p className="feature-card__desc">{item.desc}</p>
            </div>
          </div>

          <div className="feature-card__input-group">
            <label className="feature-card__label">Estimasi Budget:</label>
            <div className="feature-card__input-wrapper">
              <span className="feature-card__currency">Rp</span>
              <input
                type="text"
                className="feature-card__input"
                placeholder="Contoh: 500.000"
                value={expectedPrice}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <a href="#" onClick={handleConsultation} className="feature-card__btn">
            <span>Konsultasi Layanan</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="feature-card__btn-icon"
            >
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </a>
        </article>
      </div>
  );
}