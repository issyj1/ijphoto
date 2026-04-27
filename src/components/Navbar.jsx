import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { navTree } from "../data/navdata";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [open, setOpen] = useState(null);
  const [phase, setPhase] = useState("idle"); 
  const [activeItems, setActiveItems] = useState([]);

  useEffect(() => {
    document.body.style.overflow = menuOpen || open ? "hidden" : "";
    return () => (document.body.style.overflow = "");
  }, [menuOpen, open]);

  const closeAll = () => {
    setMenuOpen(false);
    startClose();
  };

  const toggleMenu = () => setMenuOpen((p) => !p);

  const getChildren = (label) =>
    navTree.find((n) => n.label === label)?.children || [];

  // ---------------- OPEN ----------------
  const startOpen = (label) => {
    const children = getChildren(label);

    setOpen(label);
    setPhase("entering");
    setActiveItems([]); // reset

    children.forEach((item, i) => {
      setTimeout(() => {
        setActiveItems((prev) => [...prev, item.label]);
      }, i * 120);
    });
  };

  // ---------------- CLOSE (FIXED) ----------------
  const startClose = () => {
    if (!open) return;

    const children = getChildren(open);

    setPhase("exiting");

    // REMOVE ONE BY ONE (reverse order for nicer feel)
    children
      .slice()
      .reverse()
      .forEach((item, i) => {
        setTimeout(() => {
          setActiveItems((prev) =>
            prev.filter((x) => x !== item.label)
          );
        }, i * 80);
      });

    setTimeout(() => {
      setOpen(null);
      setPhase("idle");
      setActiveItems([]);
    }, children.length * 90 + 150);
  };

  const toggle = (label) => {
    if (open === label) startClose();
    else {
      startClose();
      setTimeout(() => startOpen(label), 180);
    }
  };

  const renderNode = (node) => {
    if (node.to) {
      return (
        <li key={node.label} className="nav-item">
          <Link to={node.to} onClick={closeAll}>
            {node.label}
          </Link>
        </li>
      );
    }

    if (node.type === "folder") {
      const isOpen = open === node.label;

      return (
        <li key={node.label} className="nav-item">
         <div className="caret"
  onClick={(e) => {
    e.stopPropagation(); // 👈 THIS fixes it
    toggle(node.label);
  }}
>
  {node.label}
</div>

          {isOpen && (
            <ul className="nested">
              {node.children.map((child, i) => {
                const visible = activeItems.includes(child.label);

                return (
                  <li
                    key={child.label}
                    className={`fade-item ${
                      visible ? "fade-in" : "fade-out"
                    }`}
                    style={{ animationDelay: `${i * 0.08}s` }}
                  >
                    {child.to ? (
                      <Link to={child.to} onClick={closeAll}>
                        {child.label}
                      </Link>
                    ) : (
<div
  onClick={(e) => {
    e.stopPropagation();
    toggle(child.label);
  }}
>                        {child.label}
                      </div>
                    )}
                  </li>
                );
              })}
            </ul>
          )}
        </li>
      );
    }

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
                  className={`fade-line ${phase}`}
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
      <Link to="/" className="logo" onClick={closeAll}>
        <img src={`${import.meta.env.BASE_URL}img/svg/pinklogo.png`} />
      </Link>

      <button
        className={`hamburger ${menuOpen ? "rotate" : ""}`}
        onClick={toggleMenu}
      >
        →
      </button>

      <nav className={`nav ${menuOpen ? "open" : ""}`}>
        <ul className="menu">{navTree.map(renderNode)}</ul>
      </nav>
    </>
  );
}