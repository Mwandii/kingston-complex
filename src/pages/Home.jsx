import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Hero from "../components/sections/Hero";
import About from "../components/sections/About";
import Highlights from "../components/sections/Highlights";
import Accommodation from "../components/sections/Accomodations";
import Conference from "../components/sections/Conference";

/**
 * Homepage. Sections (About, Highlights, teasers, Reviews, Location,
 * etc.) get added below Hero one at a time as we build each one.
 *
 * Also handles the case where a hash link (About / Reviews / Contact)
 * was clicked from a different page: Navbar navigates here and passes
 * the target hash via router state, and this effect scrolls to it once
 * the page has painted.
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
      <Hero />
      <About />
      <Highlights/>
      <Accommodation/>
      <Conference/>
      {/* Highlights, Accommodation teaser, Conference teaser,
          Restaurant teaser, Bar teaser, Why Us, Reviews, Location —
          added here as we build each one. */}
    </>
  );
}