import { useParams } from "react-router-dom";
import { galleries } from "../data/galleries";
import Gallery from "../components/Gallery";

export default function GalleryPage() {
  const { galleryId } = useParams();

  const gallery = galleries.find(g => g.id === galleryId);

  if (!gallery) {
    return <div>Gallery not found</div>; // 👈 should show instead of blank
  }

  return <Gallery images={gallery.images} />;

}