import Gallery from "../components/Gallery";
import { portraitImages } from "../data/portrait";

export default function Portrait() {
  return <Gallery images={portraitImages} />;
}