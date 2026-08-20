import { Link } from "react-router-dom";
import { brand, navLinks } from "../../data/siteData";
import { useHashNav } from "../../hooks/useHashNav";
import { IconPin, IconPhone } from "../ui/icons";

/**
 * Footer. Reuses `navLinks` and `useHashNav` rather than redefining its
 * own link list/logic — same source of truth as the Navbar, so adding
 * a section later only means updating siteData.js once.
 */
export default function Footer() {
  const { handleHashClick } = useHashNav();

  return (
    <footer className="bg-[color:var(--color-brand-950)] text-white/70">
      <div className="section-container py-14 grid md:grid-cols-3 gap-10 text-sm">
        <div>
          <p className="font-display text-lg font-semibold text-white mb-2">{brand.name}</p>
          <p className="text-white/60 max-w-xs">{brand.tagline}</p>
        </div>

        <div>
          <p className="text-white font-medium mb-3">Quick links</p>
          <div className="flex flex-col gap-2">
            {navLinks.map((link) =>
              link.type === "route" ? (
                <Link key={link.href} to={link.href} className="hover:text-white transition-colors">
                  {link.label}
                </Link>
              ) : (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(event) => handleHashClick(event, link.href)}
                  className="hover:text-white transition-colors"
                >
                  {link.label}
                </a>
              )
            )}
          </div>
        </div>

        <div>
          <p className="text-white font-medium mb-3">Contact</p>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <IconPin className="w-4 h-4 shrink-0" />
              {brand.address}
            </div>
            <div className="flex items-center gap-2">
              <IconPhone className="w-4 h-4 shrink-0" />
              {brand.phone}
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 text-center text-xs text-white/40 py-5">
        © {new Date().getFullYear()} {brand.name}. All rights reserved.
      </div>
    </footer>
  );
}