import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Home from "./pages/Home";
import Rooms from "./pages/Rooms";
import Conference from "./pages/Conference";
import Restaurant from "./pages/Restaurant";
import Bar from "./pages/Bar";

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
      </Routes>
    </BrowserRouter>
  );
}