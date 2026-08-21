import { NavLink, Outlet } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { IconGrid, IconCalendar, IconBed, IconList, IconLogout } from "../ui/icons";

const navItems = [
  { to: "/admin", label: "Dashboard", icon: IconGrid, end: true },
  { to: "/admin/conference", label: "Conference hall", icon: IconCalendar },
  { to: "/admin/rooms", label: "Rooms", icon: IconBed },
  { to: "/admin/bookings", label: "Bookings", icon: IconList },
];

/**
 * Admin shell — same visual language as the original mockup (dark teal
 * sidebar, amber accents), now wired to a real signed-in staff session
 * instead of static placeholder content.
 */
export default function AdminLayout() {
  const { session, signOut } = useAuth();

  return (
    <div className="min-h-screen bg-[color:var(--color-neutral-100)] flex">
      <aside className="w-64 bg-[color:var(--color-brand-950)] text-[color:var(--color-neutral-200)] flex flex-col shrink-0">
        <div className="px-6 py-6 border-b border-white/10">
          <p className="text-lg font-semibold text-white font-display">Kingston Complex</p>
          <p className="text-xs text-[color:var(--color-accent-400)] mt-0.5">Admin panel</p>
        </div>

        <nav className="flex-1 px-3 py-6 space-y-1">
          {navItems.map(({ to, label, icon: Icon, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-white/10 text-white"
                    : "text-[color:var(--color-neutral-300)] hover:bg-white/5"
                }`
              }
            >
              <Icon className="w-4 h-4" />
              {label}
            </NavLink>
          ))}
        </nav>

        <div className="px-4 py-4 border-t border-white/10">
          <p className="text-xs text-[color:var(--color-neutral-400)] truncate mb-3">{session?.user?.email}</p>
          <button
            onClick={signOut}
            className="flex items-center gap-2 text-sm text-[color:var(--color-neutral-300)] hover:text-white transition-colors"
          >
            <IconLogout className="w-4 h-4" />
            Sign out
          </button>
        </div>
      </aside>

      <main className="flex-1 min-w-0 p-8">
        <Outlet />
      </main>
    </div>
  );
}