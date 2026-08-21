import { useAuth } from "../hooks/useAuth";

export default function AdminDashboard() {
  const { session } = useAuth();
  const firstName = session?.user?.email?.split("@")[0];

  return (
    <div>
      <h1 className="text-xl font-semibold text-[color:var(--color-neutral-900)]">
        Welcome{firstName ? `, ${firstName}` : ""}
      </h1>
      <p className="text-sm text-[color:var(--color-neutral-500)] mt-1">
        Today's overview will show up here once the Conference and Rooms pages are wired in.
      </p>
    </div>
  );
}