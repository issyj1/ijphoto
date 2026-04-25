import { Link } from "react-router-dom";
import { featuredImages } from "../data/featuredimages";

export default function ThumbnailGrid() {
  return (
    <div className="container">
      {featuredImages.map((img, i) => (
        <Link key={i} to={img.link} className="thumb">
          <img src={img.src} />

          <span className="tooltip-text">
            {img.title}
          </span>
        </Link>
      ))}
    </div>
  );
}