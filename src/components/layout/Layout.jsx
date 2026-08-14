import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./Navbar";

/**
 * Persistent shell around every route: Navbar stays mounted, page
 * content renders via Outlet. Also resets scroll to top on a normal
 * route change — skipped when the navigation is carrying a hash
 * target (state.scrollTo), since Home's own effect handles that scroll.
 */
export default function Layout() {
  const location = useLocation();

  useEffect(() => {
    if (location.state?.scrollTo) return;
    window.scrollTo({ top: 0 });
  }, [location.pathname, location.state]);

  return (
    <>
      <Navbar />
      <main>
        <Outlet />
      </main>
      {/* Footer mounts here once built */}
    </>
  );
}