import Button from "./Button";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="sticky w-full bg-slate-900 text-white shadow-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">

        {/* Logo */}
        <div>
          <Link to="/" className="text-2xl font-bold text-blue-500">
            AI Interview Coach
          </Link>
        </div>

        {/* Navigation Links */}
        <div className="hidden md:flex gap-8">
          
        <Link to="/">Features</Link>

          <a href="#" className="hover:text-blue-400 transition">
            About
          </a>

          <a href="#" className="hover:text-blue-400 transition">
            Contact
          </a>
        </div>

        {/* Buttons */}
        <div className="flex gap-3">
          <Button className="border border-blue-500 text-blue-400 hover:bg-blue-500 hover:text-white">
            Login
          </Button>

          <Button className="bg-blue-600 text-white hover:bg-blue-700">
            Get Started
          </Button>
        </div>

      </div>
    </nav>
  );
}

export default Navbar;