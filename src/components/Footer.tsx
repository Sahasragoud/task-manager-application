import React from "react";
import { Link } from "react-router-dom";
import { FaInstagram, FaWhatsapp, FaFacebook } from "react-icons/fa";

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-10 mt-16 w-screen">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8">

        {/* Logo & About */}
        <div>
          <h2 className="text-xl font-bold text-white mb-4">Task Manager</h2>
          <p className="text-gray-400 text-sm leading-relaxed">
            Stay organized, meet deadlines, and make productivity effortless.
            Built for individuals and teams who value clarity and efficiency.
          </p>
        </div>

        {/* Links */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><Link to="/" className="hover:text-pink-400">Home</Link></li>
            <li><Link to="/about-us" className="hover:text-pink-400">About</Link></li>
            <li><Link to="/features" className="hover:text-pink-400">Features</Link></li>
            <li><Link to="/contact-us" className="hover:text-pink-400">Contact</Link></li>
          </ul>
        </div>

        {/* Resources */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Resources</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-pink-400">Blog</a></li>
            <li><a href="#" className="hover:text-pink-400">Help Center</a></li>
            <li><a href="#" className="hover:text-pink-400">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-pink-400">Terms of Service</a></li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Follow Us</h3>
          <div className="flex gap-4">
            <a href="#" className="hover:text-pink-500 text-2xl">
              <FaInstagram />
            </a>
            <a href="#" className="hover:text-green-500 text-2xl">
              <FaWhatsapp />
            </a>
            <a href="#" className="hover:text-blue-500 text-2xl">
              <FaFacebook />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-700 mt-10 pt-4 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} Task Manager. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
