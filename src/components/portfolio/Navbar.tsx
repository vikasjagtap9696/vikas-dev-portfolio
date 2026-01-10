import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Link } from "react-router-dom";
import { ThemeToggle } from "@/components/ThemeToggle";

const navItems = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Certificates", href: "#certificates" },
  { label: "Contact", href: "#contact" },
];

export function Navbar() {
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setIsOpen(false);
    const element = document.querySelector(href);
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav className={`navbar ${scrolled ? "glass scrolled" : ""}`}>
      <div className="container navbar-content">
        <a
          href="#home"
          onClick={(e) => {
            e.preventDefault();
            handleNavClick("#home");
          }}
          className="navbar-logo gradient-text"
        >
          VJ
        </a>

        {/* Desktop Navigation */}
        <div className="navbar-links">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={(e) => {
                e.preventDefault();
                handleNavClick(item.href);
              }}
              className="navbar-link"
            >
              {item.label}
            </a>
          ))}
          <ThemeToggle />
          <button
            onClick={() => handleNavClick("#contact")}
            className="btn btn-primary"
          >
            Hire Me
          </button>
          {!user && (
            <Link to="/auth" className="navbar-link" style={{ marginLeft: "0.5rem" }}>
              Admin
            </Link>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="mobile-nav-actions">
          <ThemeToggle />
          <button
            className="mobile-menu-btn"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            ) : (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="3" y1="12" x2="21" y2="12"></line>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <line x1="3" y1="18" x2="21" y2="18"></line>
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="mobile-menu glass animate-fade-in">
          <div className="flex flex-col gap-4">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(item.href);
                }}
                className="navbar-link"
                style={{ padding: "0.5rem 0" }}
              >
                {item.label}
              </a>
            ))}
            <button
              onClick={() => handleNavClick("#contact")}
              className="btn btn-primary w-full"
              style={{ marginTop: "0.5rem" }}
            >
              Hire Me
            </button>
            {!user && (
              <Link 
                to="/auth" 
                className="navbar-link"
                style={{ padding: "0.5rem 0", textAlign: "center" }}
                onClick={() => setIsOpen(false)}
              >
                Admin Login
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
