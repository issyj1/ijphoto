import { useState } from "react";

export default function Gallery({ images, galleryId = "default" }) {
  const [view, setView] = useState("thumbs");
  const [index, setIndex] = useState(0);

  const next = (e) => {
    e.stopPropagation();
    setIndex((prev) => (prev + 1) % images.length);
  };

  const prev = (e) => {
    e.stopPropagation();
    setIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const openSlide = (i) => {
    setIndex(i);
    setView("slideshow");

    const imageName = images[i]
      .split("/")
      .pop()
      .replace(/\.[^/.]+$/, "");

    window.history.pushState({}, "", `/gallery/${galleryId}/${imageName}`);
  };

  return (
    <div>

      {/* THUMBNAILS */}
      {view === "thumbs" && (
        <div className="container2">
          {images.map((img, i) => (
            <img
              key={i}
              src={img}
              onClick={() => openSlide(i)}
              style={{ cursor: "pointer", width: "100%" }}
            />
          ))}
        </div>
      )}

      {/* SLIDESHOW */}
      {view === "slideshow" && (
        <div className="slideshow-overlay" onClick={() => setView("thumbs")}>

          {/* IMAGE */}
          <div className="image-wrapper" onClick={(e) => e.stopPropagation()}>
            <img src={images[index]} />

         
          </div>

          {/* BUTTONS */}
          <button className="prev-btn" onClick={prev}>Prev</button>
          <button className="next-btn" onClick={next}>Next</button>

        </div>
      )}

    </div>
  );
}