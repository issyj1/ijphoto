import Gallery from "../components/Gallery";
import { thingsImages } from "../data/things";

export default function Things() {
  return <Gallery images={thingsImages} />;
}