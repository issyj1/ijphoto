import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { navTree } from "../data/navdata";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [open, setOpen] = useState(null);

  const [visibleCount, setVisibleCount] = useState(0);
  const [phase, setPhase] = useState("idle");

  // lock scroll ONLY when dropdown OR mobile menu open
  useEffect(() => {
    if (menuOpen || open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => (document.body.style.overflow = "");
  }, [menuOpen, open]);

  const closeAll = () => {
    setMenuOpen(false);
    startClose();
  };

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
    setVisibleCount(0);
  };

  const getChildren = (label) =>
    navTree.find((n) => n.label === label)?.children || [];

  // -------------------------
  // DROPDOWN OPEN ANIMATION
  // -------------------------
  const startOpen = (label) => {
    setOpen(label);
    setPhase("entering");
    setVisibleCount(0);

    const children = getChildren(label);

    children.forEach((_, i) => {
      setTimeout(() => {
        setVisibleCount((prev) => prev + 1);
      }, i * 120);
    });
  };

  // -------------------------
  // DROPDOWN CLOSE ANIMATION
  // -------------------------
  const startClose = () => {
    if (!open) return;

    const children = getChildren(open);
    setPhase("exiting");

    children.forEach((_, i) => {
      setTimeout(() => {
        setVisibleCount((prev) => Math.max(prev - 1, 0));
      }, i * 80);
    });

    setTimeout(() => {
      setOpen(null);
      setPhase("idle");
      setVisibleCount(0);
    }, children.length * 90 + 120);
  };

  const toggle = (label) => {
    if (open === label) startClose();
    else {
      startClose();
      setTimeout(() => startOpen(label), 180);
    }
  };

  // -------------------------
  // OVERLAY ONLY FOR THESE
  // -------------------------
  const overlayActive =
    open &&
    ["Portfolio", "About", "Contact", "Reviews"].includes(open);

  const renderNode = (node, i = 0) => {
    // LINKS
    if (node.to) {
      return (
        <li key={node.label} className="nav-item fade-item">
          <Link to={node.to} onClick={closeAll}>
            {node.label}
          </Link>
        </li>
      );
    }

    // FOLDERS (Portfolio etc)
    if (node.type === "folder") {
      const isOpen = open === node.label;

      return (
        <li key={node.label} className="nav-item">
          <div className="caret" onClick={() => toggle(node.label)}>
            {node.label}
          </div>

          {isOpen && (
            <ul className="nested floating">
              {node.children.map((child, i) => {
                const show = i < visibleCount;

                return (
                  show && (
                    <li
                      key={child.label}
                      className={`fade-item ${
                        phase === "exiting" ? "fade-out" : "fade-in"
                      }`}
                      style={{ animationDelay: `${i * 0.1}s` }}
                    >
                      {child.to ? (
                        <Link to={child.to} onClick={closeAll}>
                          {child.label}
                        </Link>
                      ) : (
                        <div onClick={() => toggle(child.label)}>
                          {child.label}
                        </div>
                      )}
                    </li>
                  )
                );
              })}
            </ul>
          )}
        </li>
      );
    }

    // TEXT (About / Testimonials)
    if (node.type === "text") {
      const isOpen = open === node.label;

      return (
        <li key={node.label} className="nav-item">
          <div className="caret" onClick={() => toggle(node.label)}>
            {node.label}
          </div>

          {isOpen && (
            <ul className="nested">
              {node.lines.map((line, i) => (
                <p
                  key={i}
                  className="fade-line"
                  style={{ animationDelay: `${i * 0.15}s` }}
                >
                  {line}
                </p>
              ))}
            </ul>
          )}
        </li>
      );
    }

    // CONTACT
    if (node.type === "contact") {
      const isOpen = open === node.label;

      return (
        <li key={node.label} className="nav-item">
          <div className="caret" onClick={() => toggle(node.label)}>
            {node.label}
          </div>

          {isOpen && (
            <ul className="nested">
              <p className="fade-line">{node.lines?.[0]}</p>
              <a
                className="fade-line"
                href={node.instagram}
                target="_blank"
                rel="noreferrer"
              >
                issyj1
              </a>
            </ul>
          )}
        </li>
      );
    }

    return null;
  };

  return (
    <>
      {/* LOGO */}
      <Link to="/" className="logo" onClick={closeAll}>
        <img src="/img/svg/pinklogo.svg" alt="logo" height="60" />
      </Link>

      {/* HAMBURGER (mobile only via CSS) */}
      <button
        className={`hamburger ${menuOpen ? "rotate" : ""}`}
        onClick={toggleMenu}
      >
        →
      </button>

      {/* NAV (always visible on desktop, toggled on mobile via CSS) */}
      <nav className={`nav ${menuOpen ? "open" : ""}`}>
        <ul className="menu">
          {navTree.map(renderNode)}
        </ul>
      </nav>

      {/* OVERLAY ONLY FOR DROPDOWNS */}
      {overlayActive && (
        <div className="overlay show" onClick={startClose} />
      )}
    </>
  );
}