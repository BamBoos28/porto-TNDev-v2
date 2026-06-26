import { Globe, PhoneCall, ArrowRight } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const services = [
    "Fix bug & logika program",
    "Slicing design",
    "Frontend development",
    "Tugas web",
    "Optimasi responsive",
    "Solusi coding custom",
  ];

  return (
    <footer className="footer-shell">
      <div className="container-custom">
        <div className="footer-grid">
          {/* Brand */}
          <div className="footer-brand">
            <div className="footer-brand__top">
              <div className="footer-brand__icon">
                <Globe size={22} />
              </div>
              <span className="footer-brand__name">
                TECHNODEV<span className="footer-brand__dot">.</span>
              </span>
            </div>

            <p className="footer-brand__desc">
              Dapatkan source code aplikasi berkualitas dan produk digital siap
              pakai untuk mempercepat pengembangan proyek Anda.
            </p>
          </div>

          {/* Services */}
          <div className="footer-services">
            <h4 className="footer-title">Layanan</h4>

            <ul className="footer-services__list">
              {services.map((item, index) => (
                <li key={index} className="footer-services__item">
                  <ArrowRight size={14} className="footer-services__icon" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="footer-contact">
            <div className="footer-contact__card">
              <h4 className="footer-title">Hubungi Kami</h4>

              <a
                href="https://wa.me/6287835394899"
                target="_blank"
                rel="noreferrer"
                className="footer-contact__link"
              >
                <div className="footer-contact__icon">
                  <PhoneCall size={18} />
                </div>

                <div className="footer-contact__text">
                  <span className="footer-contact__label">
                    Telepon / WhatsApp
                  </span>
                  <span className="footer-contact__value">
                    +62 878-3539-4899
                  </span>
                </div>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="footer-bottom">
          <div className="footer-bottom__text">
            &copy; {currentYear}{" "}
            <span className="footer-bottom__brand">TECHNODEV</span>. All rights
            reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;