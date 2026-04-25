import { useEffect, useState } from "react";

const images = [
  "/img/things/pinkflower.jpg",
 "/img/portrait/cigfab.jpg",
"/img/collage/shoestattoo.jpg",
    "/img/things/pinkfloweronblue.jpg",
    "/img/collage/mesepia.jpg",


];

export default function FullBleedSlideshow() {
  const [current, setCurrent] = useState(0);
  const [next, setNext] = useState(1);
  const [fade, setFade] = useState(false);

  useEffect(() => {
    images.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(true); // start fade transition

      setTimeout(() => {
        setCurrent(next);
        setNext((next + 1) % images.length);
        setFade(false);
      }, 800); // match CSS transition time
    }, 2500);

    return () => clearInterval(interval);
  }, [next]);

  return (
    <div className="hero">
      {/* current image */}
      <img
        src={images[current]}
        className={`hero-img ${fade ? "fade-out" : "fade-in"}`}
        alt=""
      />

      {/* next image (preloaded layer) */}
      <img
        src={images[next]}
        className={`hero-img ${fade ? "fade-in" : "fade-out"}`}
        alt=""
      />
    </div>
  );
}

