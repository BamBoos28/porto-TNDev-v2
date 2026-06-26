import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router";
import { Menu, X, Home, Info } from "lucide-react";
import type { ReactNode } from "react";

import ThemeToggle from "../components/ThemeToggle";

type NavItem = {
  to: string;
  label: string;
  tooltip: string;
  icon: ReactNode;
};

const navLinks: NavItem[] = [
  {
    to: "/",
    label: "Home",
    tooltip: "Kembali ke halaman utama",
    icon: <Home size={18} />,
  },
  {
    to: "/catalog",
    label: "Catalog",
    tooltip: "Lihat katalog",
    icon: <Info size={18} />,
  },
  {
    to: "/testimoni",
    label: "Testimoni",
    tooltip: "Lihat testimoni pelanggan",
    icon: <Info size={18} />,
  },
  {
    to: "/profile",
    label: "Contact Us",
    tooltip: "Hubungi kami",
    icon: <Info size={18} />,
  },
];

function NavItemLink({
  item,
  mobile = false,
  onClick,
}: {
  item: NavItem;
  mobile?: boolean;
  onClick?: () => void;
}) {
  return (
    <NavLink
      to={item.to}
      onClick={onClick}
      className={({ isActive }) =>
        [
          "nav-link",
          mobile ? "nav-link--mobile" : "nav-link--desktop",
          isActive ? "nav-link--active" : "",
        ].join(" ")
      }
    >
      <span className={mobile ? "nav-link__icon" : "nav-link__icon nav-link__icon--desktop"}>
        {item.icon}
      </span>

      <span className="nav-link__label">{item.label}</span>

      {!mobile && <span className="nav-link__tooltip">{item.tooltip}</span>}
    </NavLink>
  );
}

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (!isOpen) return;

    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };

    document.addEventListener("keydown", handleEsc);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <header className={`navbar-shell ${isScrolled ? "navbar-shell--scrolled" : ""}`}>
      <div className="container-custom">
        <div className="navbar-inner">
          <Link to="/" aria-label="Go to home" className="site-logo">
            <img src="/llogo.png" alt="Logo terang" className="site-logo__img site-logo__img--light" />
            <img src="/dlogo.png" alt="Logo gelap" className="site-logo__img site-logo__img--dark" />
          </Link>

          <nav className="navbar-menu navbar-menu--desktop" aria-label="Main navigation">
            <ul className="navbar-menu__list">
              {navLinks.map((item) => (
                <li key={item.to} className="navbar-menu__item">
                  <NavItemLink item={item} />
                </li>
              ))}
            </ul>
          </nav>

          <div className="navbar-actions">
              <ThemeToggle />

            <button
              type="button"
              aria-expanded={isOpen}
              aria-label={isOpen ? "Close menu" : "Open menu"}
              aria-controls="mobile-menu"
              onClick={() => setIsOpen((prev) => !prev)}
              className="mobile-toggle"
            >
              {isOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      <div
        className={`mobile-overlay ${isOpen ? "mobile-overlay--open h-screen" : ""}`}
        aria-hidden={!isOpen}
      >
        <div
          className="mobile-overlay__backdrop h-screen"
          onClick={() => setIsOpen(false)}
        />

        <aside
          id="mobile-menu"
          className={`mobile-menu ${isOpen ? "mobile-menu--open" : ""}`}
        >
          <div className="mobile-menu__header">
            <h2 className="mobile-menu__title">Menu</h2>

            <button
              type="button"
              aria-label="Close menu"
              onClick={() => setIsOpen(false)}
              className="mobile-menu__close"
            >
              <X size={20} />
            </button>
          </div>

          <div className="mobile-menu__content">
            <ul className="mobile-menu__list">
              {navLinks.map((item) => (
                <li key={item.to} className="mobile-menu__item">
                  <NavItemLink
                    item={item}
                    mobile
                    onClick={() => setIsOpen(false)}
                  />
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </div>
    </header>
  );
}