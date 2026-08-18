import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import HeroSingle from "../components/sections/HeroSingle";
import HeroCollage from "../components/sections/HeroCollage";

/**
 * Homepage. TEMP: both hero candidates are stacked below for side-by-side
 * comparison — pick one, then delete this comment, the losing component
 * file, and the unused import + label.
 *
 * Sections (About, Highlights, teasers, Reviews, Location, etc.) get
 * added below the hero as we build each one.
 */
export default function Home() {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const targetHash = location.state?.scrollTo;
    if (!targetHash) return;

    const timeoutId = setTimeout(() => {
      document.querySelector(targetHash)?.scrollIntoView({ behavior: "smooth" });
      navigate(location.pathname, { replace: true, state: {} });
    }, 100);

    return () => clearTimeout(timeoutId);
  }, [location.state, location.pathname, navigate]);

  return (
    <>
      <div className="relative">
        <span className="absolute top-24 right-4 z-50 bg-black text-white text-xs font-mono px-2 py-1 rounded">
          OPTION A — full photo
        </span>
        <HeroSingle />
      </div>

      <div className="relative">
        <span className="absolute top-24 right-4 z-50 bg-black text-white text-xs font-mono px-2 py-1 rounded">
          OPTION B — collage
        </span>
        <HeroCollage />
      </div>

      {/* About, Highlights, Accommodation teaser, Conference teaser,
          Restaurant teaser, Bar teaser, Why Us, Reviews, Location —
          added here as we build each one. */}
    </>
  );
}