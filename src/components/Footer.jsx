import { useLocation } from "react-router-dom";

function cleanSegment(segment) {
  return segment.replace(/\.[^/.]+$/, "");
}

export default function Footer() {
  const location = useLocation();

  const parts = location.pathname
    .split("/")
    .filter(Boolean)
    .map(cleanSegment);

  // 👉 handle home route
  if (parts.length === 0) {
    return <div className="footer">Site © Isabelle Johnson newworldcreative.studio &#9733;</div>;
  }

  return (
    <div className="footer">
      {parts.join("/")} &#9733;
    </div>
  );
}