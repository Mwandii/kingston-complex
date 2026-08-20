import { useLocation, useNavigate } from "react-router-dom";
import { scrollToSection } from "../utils/scrollToSection";

/**
 * Shared logic for hash nav links (About / Reviews / Contact) used by
 * both Navbar and Footer. On the homepage, scrolls directly. On any
 * other page, navigates home first and passes the target hash via
 * router state — Home.jsx reads it on mount and scrolls once painted.
 */
export function useHashNav() {
  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === "/";

  const handleHashClick = (event, href) => {
    if (isHome) {
      scrollToSection(event, href);
    } else {
      event.preventDefault();
      navigate("/", { state: { scrollTo: href } });
    }
  };

  return { handleHashClick, isHome };
}