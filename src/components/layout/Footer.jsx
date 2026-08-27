import { Link } from "react-router-dom";
import { brand, navLinks } from "../../data/siteData";
import { useHashNav } from "../../hooks/useHashNav";
import { IconPin, IconPhone, IconFacebook, IconInstagram, IconTiktok } from "../ui/icons";

const SOCIAL_LINKS = [
  { key: "facebook", Icon: IconFacebook, label: "Facebook" },
  { key: "instagram", Icon: IconInstagram, label: "Instagram" },
  { key: "tiktok", Icon: IconTiktok, label: "TikTok" },
];

/**
 * Footer. Reuses `navLinks` and `useHashNav` rather than redefining its
 * own link list/logic — same source of truth as the Navbar, so adding
 * a section later only means updating siteData.js once.
 */
export default function Footer() {
  const { handleHashClick } = useHashNav();

  return (
    <footer className="bg-[color:var(--color-brand-950)] text-white/70">
      <div className="section-container py-10 sm:py-14 grid gap-8 sm:gap-10 grid-cols-1 md:grid-cols-3 text-sm">
        <div>
          <p className="font-display text-lg font-semibold text-white mb-2">{brand.name}</p>
          <p className="text-white/60 max-w-xs mb-5">{brand.tagline}</p>

          <div className="flex items-center gap-3">
            {SOCIAL_LINKS.map(({ key, Icon, label }) => (
              <a
                key={key}
                href={brand.social[key]}
                target="_blank"
                rel="noreferrer"
                aria-label={label}
                className="w-9 h-9 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
              >
                <Icon className="w-4 h-4" />
              </a>
            ))}
          </div>
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
            <div className="flex items-start gap-2">
              <IconPin className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{brand.address}</span>
            </div>
            <div className="flex items-center gap-2">
              <IconPhone className="w-4 h-4 shrink-0" />
              {brand.phone}
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 text-center text-xs text-white/40 py-5 px-6">
        © {new Date().getFullYear()} {brand.name}. All rights reserved.
      </div>
    </footer>
  );
}