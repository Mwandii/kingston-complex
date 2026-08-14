import { useEffect, useState } from "react";

/**
 * Tracks whether the page has scrolled past a given threshold.
 * Uses requestAnimationFrame to throttle scroll updates so we
 * never trigger more than one state update per frame.
 *
 * @param {number} threshold - pixels scrolled before flipping to true
 * @returns {boolean} isScrolled
 */
export function useScrollPosition(threshold = 24) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (ticking) return;
      ticking = true;

      window.requestAnimationFrame(() => {
        setIsScrolled(window.scrollY > threshold);
        ticking = false;
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // set initial state on mount

    return () => window.removeEventListener("scroll", handleScroll);
  }, [threshold]);

  return isScrolled;
}