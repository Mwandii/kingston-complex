import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

/**
 * Wraps the protected /admin routes. Shows nothing while the initial
 * session check runs (avoids a login-page flash for someone who's
 * already logged in), then either renders the nested admin pages via
 * Outlet, or bounces to /admin/login.
 */
export default function RequireAuth() {
  const { session, isLoading } = useAuth();

  if (isLoading) return null;
  if (!session) return <Navigate to="/admin/login" replace />;

  return <Outlet />;
}