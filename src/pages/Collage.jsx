import Gallery from "../components/Gallery";
import { collageImages } from "../data/collage";

export default function Collage() {
  return <Gallery images={collageImages} />;
}