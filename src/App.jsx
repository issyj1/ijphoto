import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import ThumbnailGrid from "./components/ThumbnailGrid";
import GalleryPage from "./pages/GalleryPage";
import Footer from "./components/Footer";
import FullBleedSlideshow from "./components/FullBleedSlideshow";

export default function App() {

  const location = useLocation();

  const isHome = location.pathname === "/";

  return (
    <>
      <Navbar />

      <Routes>
      <Route
    path="/"
    element={<Navigate to="/gallery/portrait" replace />}
  />
        <Route path="/gallery/:galleryId/:imageId?" element={<GalleryPage />} />
      </Routes>

      <Footer />

    </>
  );
}