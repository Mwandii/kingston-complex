import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Home from "./pages/Home";
import Rooms from "./pages/Rooms";
import Conference from "./pages/Conference";
import Restaurant from "./pages/Restaurant";
import Bar from "./pages/Bar";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import AdminConference from "./pages/AdminConference";
import AdminRooms from "./pages/AdminRooms";
import AdminBar from "./pages/AdminBar";
import AdminBookings from "./pages/AdminBookings";
import AdminFinance from "./pages/AdminFinance";
import RequireAuth from "./components/admin/RequireAuth";
import AdminLayout from "./components/admin/AdminLayout";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/rooms" element={<Rooms />} />
          <Route path="/conference" element={<Conference />} />
          <Route path="/restaurant" element={<Restaurant />} />
          <Route path="/bar" element={<Bar />} />
        </Route>

        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin" element={<RequireAuth />}>
          <Route element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="conference" element={<AdminConference />} />
            <Route path="rooms" element={<AdminRooms />} />
            <Route path="bar" element={<AdminBar />} />
            <Route path="bookings" element={<AdminBookings />} />
            <Route path="finance" element={<AdminFinance />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}