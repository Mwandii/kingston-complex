import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { brand, navLinks } from "../../data/siteData";
import { useScrollPosition } from "../../hooks/useScrollPosition";
import { useHashNav } from "../../hooks/useHashNav";

/**
 * Site navigation. On the homepage it starts transparent over the hero
 * and blurs in once scrolled; on every other page (no hero image behind
 * it) it's always solid. Nav links are a mix of same-page anchors
 * (About, Reviews, Contact — hash) and real routes (Rooms, Conference,
 * Restaurant, Bar). Clicking a hash link from another page navigates
 * home first, then scrolls once Home has mounted (see Home.jsx).
 */
export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isScrolled = useScrollPosition(24);
  const { handleHashClick, isHome } = useHashNav();

  const showSolidSurface = isScrolled || !isHome;

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setIsMenuOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") setIsMenuOpen(false);
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  /**
   * Wraps the shared hash-nav handler with closing the mobile menu.
   */
  const onHashLinkClick = (event, href) => {
    handleHashClick(event, href);
    setIsMenuOpen(false);
  };

  const surfaceClasses = showSolidSurface
    ? "bg-white/90 backdrop-blur-md shadow-sm text-[color:var(--color-neutral-900)]"
    : "bg-transparent text-white";

  return (
    <header className={`fixed top-0 inset-x-0 z-50 transition-colors duration-300 ${surfaceClasses}`}>
      <div className="section-container flex items-center justify-between py-4">
        <Link to="/" className="font-display text-xl font-semibold tracking-wide">
          {brand.name}
        </Link>

        <nav aria-label="Primary" className="hidden md:flex items-center gap-8 text-sm font-medium">
          {navLinks.map((link) =>
            link.type === "route" ? (
              <Link key={link.href} to={link.href} className="opacity-90 hover:opacity-100 transition-opacity">
                {link.label}
              </Link>
            ) : (
              <a
                key={link.href}
                href={link.href}
                onClick={(event) => onHashLinkClick(event, link.href)}
                className="opacity-90 hover:opacity-100 transition-opacity"
              >
                {link.label}
              </a>
            )
          )}
        </nav>

        <a
          href={`https://wa.me/${brand.whatsappNumber}`}
          target="_blank"
          rel="noreferrer"
          className="btn-primary hidden md:inline-flex text-sm px-5 py-2.5"
        >
          Book now
        </a>

        <button
          type="button"
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={isMenuOpen}
          aria-controls="mobile-menu"
          onClick={() => setIsMenuOpen((open) => !open)}
          className="md:hidden relative w-8 h-8 flex flex-col justify-center items-center gap-1.5"
        >
          <span
            className={`block h-0.5 w-6 rounded-full bg-current transition-transform duration-300 ${
              isMenuOpen ? "translate-y-2 rotate-45" : ""
            }`}
          />
          <span
            className={`block h-0.5 w-6 rounded-full bg-current transition-opacity duration-200 ${
              isMenuOpen ? "opacity-0" : "opacity-100"
            }`}
          />
          <span
            className={`block h-0.5 w-6 rounded-full bg-current transition-transform duration-300 ${
              isMenuOpen ? "-translate-y-2 -rotate-45" : ""
            }`}
          />
        </button>
      </div>

      <nav
        id="mobile-menu"
        aria-label="Mobile"
        className={`md:hidden bg-white text-[color:var(--color-neutral-900)] overflow-hidden transition-[max-height] duration-300 ease-in-out ${
          isMenuOpen ? "max-h-96" : "max-h-0"
        }`}
      >
        <div className="section-container flex flex-col gap-1 py-4">
          {navLinks.map((link) =>
            link.type === "route" ? (
              <Link
                key={link.href}
                to={link.href}
                onClick={() => setIsMenuOpen(false)}
                className="py-3 text-base font-medium border-b border-[color:var(--color-neutral-100)] last:border-0"
              >
                {link.label}
              </Link>
            ) : (
              <a
                key={link.href}
                href={link.href}
                onClick={(event) => onHashLinkClick(event, link.href)}
                className="py-3 text-base font-medium border-b border-[color:var(--color-neutral-100)] last:border-0"
              >
                {link.label}
              </a>
            )
          )}
          <a
            href={`https://wa.me/${brand.whatsappNumber}`}
            target="_blank"
            rel="noreferrer"
            className="btn-primary text-sm mt-4 text-center"
          >
            Book now
          </a>
        </div>
      </nav>
    </header>
  );
}