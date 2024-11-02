// src/component/AdminNavbar.js
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContextAdmin";
import { FaBars, FaTimes, FaChevronDown } from "react-icons/fa";

const AdminNavbar = () => {
  const { logout } = useAuth();
  const { isAuthenticated } = useAuth();
  let email = localStorage.getItem("email");
  let date = localStorage.getItem("date");
  const navigate = useNavigate();
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isProductsDropdownOpen, setProductsDropdownOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/admin/login");
  };

  return (
    <nav className="bg-black text-white py-4 fixed w-full top-0 z-50 px-2">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <div className="text-2xl font-bold">
          <Link to="/admin/dashboard">Ruzan Global Admin</Link>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-8 items-center">
          <Link to="/admin/dashboard" className="hover:text-gray-400">
            Dashboard
          </Link>

          <Link to="/admin/reviews" className="hover:text-gray-400">
            All_Bad_Reviews
          </Link>

          {email === "admin@gmail.com" && (
            <Link to="/admin/users" className="hover:text-gray-400">
              Users
            </Link>
          )}

          {email !== "admin@gmail.com" && date && (
            <Link to="/admin/users" className="hover:text-gray-400">
              <span>Expiry Date : {} </span>{" "}
              <span
                style={{
                  backgroundColor: "red",
                  color: "white",
                  padding: "5px",
                  borderRadius: "4px",
                }}
              >
                {
                  new Date(
                    new Date(date).setFullYear(new Date(date).getFullYear() + 1)
                  )
                    .toISOString()
                    .split("T")[0]
                }
              </span>
            </Link>
          )}

          {isAuthenticated && (
            <button
              onClick={handleLogout}
              className="bg-white text-black p-2 rounded hover:bg-blue-700"
            >
              Logout
            </button>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
            className="text-2xl focus:outline-none"
          >
            {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-black text-white p-4">
          <Link
            to="/admin/dashboard"
            className="block px-4 py-2 hover:bg-white hover:text-black transition duration-300"
            onClick={() => setMobileMenuOpen(false)}
          >
            Dashboard
          </Link>

          <Link
            to="/admin/reviews"
            className="block px-4 py-2 hover:bg-white hover:text-black transition duration-300"
            onClick={() => setMobileMenuOpen(false)}
          >
            All_Bad_Reviews
          </Link>

          {email === "admin@gmail.com" && (
            <Link
              className="block px-4 py-2 hover:bg-white hover:text-black transition duration-300"
              to="/admin/users"
              onClick={() => setMobileMenuOpen(false)}
              // className="hover:text-gray-400"
            >
              Users
            </Link>
          )}

          {email !== "admin@gmail.com" && date && (
            <Link
              to="/admin/users"
              className="block px-4 py-2 hover:bg-white hover:text-black transition duration-300"
            >
              <span>Expiry Date : {} </span>{" "}
              <span
                style={{
                  backgroundColor: "red",
                  color: "white",
                  padding: "5px",
                  borderRadius: "4px",
                }}
              >
                {
                  new Date(
                    new Date(date).setFullYear(new Date(date).getFullYear() + 1)
                  )
                    .toISOString()
                    .split("T")[0]
                }
              </span>
            </Link>
          )}
          {isAuthenticated && (
            <button
              onClick={() => {
                handleLogout();
                setMobileMenuOpen(false); // Close the menu after logout
              }}
              className="bg-white text-black p-2 rounded hover:bg-blue-700 w-full mt-2"
            >
              Logout
            </button>
          )}
        </div>
      )}
    </nav>
  );
};

export default AdminNavbar;
