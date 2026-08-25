import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigate = useNavigate();

  // Smooth scroll to a section
  const scrollToSection = (sectionId) => {
    setIsMenuOpen(false);

    const section = document.getElementById(sectionId);

    if (section) {
      section.scrollIntoView({
        behavior: "smooth",
      });
    }
  };

  // Navigate to Home and then scroll to a section
  const navigateToSection = (sectionId) => {
    setIsMenuOpen(false);

    // If already on Home page
    if (window.location.pathname === "/") {
      scrollToSection(sectionId);
      return;
    }

    // If on another page, first go Home
    navigate("/");

    // Wait for Home to render
    setTimeout(() => {
      document
        .getElementById(sectionId)
        ?.scrollIntoView({
          behavior: "smooth",
        });
    }, 100);
  };

  return (
    <nav className="w-full bg-slate-950 border-b border-slate-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4">

        <div className="flex items-center justify-between">

          {/* Logo */}
          <Link
            to="/"
            onClick={() => setIsMenuOpen(false)}
            className="text-2xl font-bold text-blue-500"
          >
            AI Interview Coach
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">

            {/* Home */}
            <Link
              to="/"
              className="text-gray-300 hover:text-blue-400 transition"
            >
              Home
            </Link>

            {/* Features */}
            <button
              onClick={() => navigateToSection("features")}
              className="text-gray-300 hover:text-blue-400 transition"
            >
              Features
            </button>

            {/* How It Works */}
            <button
              onClick={() =>
                navigateToSection("how-it-works")
              }
              className="text-gray-300 hover:text-blue-400 transition"
            >
              How It Works
            </button>

          </div>

          {/* Authentication Buttons */}
          <div className="hidden md:flex items-center gap-4">

            {/* Login */}
            <button
              onClick={() => navigate("/login")}
              className="text-gray-300 hover:text-white transition"
            >
              Login
            </button>

            {/* Get Started */}
            <button
              onClick={() => navigate("/register")}
              className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg font-semibold transition"
            >
              Get Started
            </button>

          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-white text-2xl"
            aria-label="Toggle navigation menu"
          >
            {isMenuOpen ? "✕" : "☰"}
          </button>

        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-slate-800 pt-4">

            <div className="flex flex-col gap-4">

              {/* Home */}
              <Link
                to="/"
                onClick={() => setIsMenuOpen(false)}
                className="text-gray-300 hover:text-blue-400 transition"
              >
                Home
              </Link>

              {/* Features */}
              <button
                onClick={() =>
                  navigateToSection("features")
                }
                className="text-left text-gray-300 hover:text-blue-400 transition"
              >
                Features
              </button>

              {/* How It Works */}
              <button
                onClick={() =>
                  navigateToSection("how-it-works")
                }
                className="text-left text-gray-300 hover:text-blue-400 transition"
              >
                How It Works
              </button>

              {/* Login */}
              <button
                onClick={() => {
                  setIsMenuOpen(false);
                  navigate("/login");
                }}
                className="text-left text-gray-300 hover:text-white transition"
              >
                Login
              </button>

              {/* Get Started */}
              <button
                onClick={() => {
                  setIsMenuOpen(false);
                  navigate("/register");
                }}
                className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg font-semibold transition text-left"
              >
                Get Started
              </button>

            </div>

          </div>
        )}

      </div>
    </nav>
  );
}

export default Navbar;