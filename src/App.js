import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
  useNavigate,
} from "react-router-dom";
import "./component/HomePage.css";
import Navbar from "./component/Navbar";
import AdminNavbar from "./component/AdminNavbar";
import HomePage from "./component/HomePage";
import Footer from "./component/Footer";

// Admin Page Imports
import LoginPage from "./AdminPages/LoginPage";
import Dashboard from "./AdminPages/Dashboard";
import Products from "./AdminPages/Products";
import Categories from "./AdminPages/Categories";
import Orders from "./AdminPages/Orders";
import Users from "./AdminPages/Users";

// Import Auth Context and Protected Route
import { AuthProvider, useAuth } from "./context/AuthContextAdmin";
import ProtectedRoute from "./component/ProtectedRoute";
import ProductDetails from "./component/ProductDetails";
import GoogleReviewPage from "./GoogleReview/GoogleReviewPage";
import SonuReviewPAge from "./GoogleReview/SonuReviewPAge";
import ArcticRefrigeration from "./GoogleReview/ArcticRefrigeration";
import Bata from "./GoogleReview/Bata";
import QuickCardsHomePage from "./component/QuickCardsHomePage";
import {
  FaBars,
  FaFacebook,
  FaInstagram,
  FaTimes,
  FaWhatsapp,
  FaYoutube,
} from "react-icons/fa";
import { Link } from "lucide-react";
import About from "./component/About";
import ContactUs from "./component/ContactUs";
import AddToCart from "./component/AddToCart";
import Checkout from "./component/Checkout";
import SinglePage from "./component/Singlepage";
import ContactLists from "./AdminPages/ContactLists";
import OrderList from "./AdminPages/OrderList";

const Tracksuit = () => (
  <h2 className="text-center mt-16">Tracksuit Category</h2>
);
const TShirt = () => <h2 className="text-center mt-16">T-shirt Category</h2>;

function App() {
  // const location = useLocation();
  return (
    <AuthProvider>
      <Router>
        <AppWithFooter />
      </Router>
    </AuthProvider>
  );
}

const AppWithFooter = () => {
  const location = useLocation();
  const navigate = useNavigate();
  return (
    <>
      <div>
        <AppContent />
      </div>
      {location?.pathname === "/review/demo" ||
      location?.pathname === "/review/sonu" ||
      location?.pathname === "/review/arctic" ||
      location?.pathname === "/review/bata" ? null : (
        <footer className="bg-gray-900 text-white py-12">
          <div className="max-w-6xl mx-auto px-4">
            <div className="grid md:grid-cols-4 gap-8">
              <div>
                <h4 className="text-2xl font-bold mb-4">RUZAN GLOBAL</h4>
                <p className="mb-4">
                  RUZAN GLOBAL is formed with an idea of adding value to the
                  lives of numerous types of businesses who live, work & grow
                  together.
                </p>
                <div className="flex space-x-4">
                  <a href="https://www.facebook.com/RuzanGlobal">
                    {" "}
                    <FaFacebook className="text-2xl hover:text-blue-500 cursor-pointer" />
                  </a>
                  <a href="https://wa.me/message/I65SIPFGQMMAK1">
                    {" "}
                    <FaWhatsapp className="text-2xl hover:text-green-500 cursor-pointer" />
                  </a>
                  <a href="https://www.youtube.com/@RuzanGlobal">
                    {" "}
                    <FaYoutube className="text-2xl hover:text-red-400 cursor-pointer" />
                  </a>
                  <a href="https://www.instagram.com/RuzanGlobal">
                    {" "}
                    <FaInstagram className="text-2xl hover:text-pink-500 cursor-pointer" />
                  </a>
                </div>
              </div>
              <div>
                <h5 className="font-bold mb-4">Our Products</h5>
                <ul className="space-y-2">
                  <li>All NFC based Products</li>
                  <li>Digital Review Cards</li>
                  <li>Magic Google Review Standee</li>
                  <li>Digital Business Card</li>
                  <li>NFC based Services</li>
                </ul>
              </div>
              <div>
                <h5 className="font-bold mb-4">Our Services</h5>
                <ul className="space-y-2">
                  <li>Website Design</li>
                  <li>Web Development</li>
                  <li>NFC based Services</li>
                  <li>Open Source Development</li>
                  <li>Graphics Design</li>
                </ul>
              </div>
              <div>
                <h5 className="font-bold mb-4">Get in Touch</h5>
                <ul className="space-y-2">
                  <li>Support:</li>
                  <li>
                    <a href="tel:8585848401" id="nav-call-button">
                      +91 85 85 84 84 01
                    </a>
                  </li>
                  <li>
                    <a
                      href="mailto:ruzan.global@gmail.com"
                      id="nav-email-button"
                    >
                      ruzan.global@gmail.com
                    </a>
                  </li>
                  <li>Kasba, Near Accropolis Mall,</li>
                  <li>Kolkata, West Bengal.</li>
                </ul>
              </div>
            </div>
            <div className="mt-8 pt-8 border-t border-gray-700 text-center">
              <p>&copy; Copyright 2020-2025 RUZAN GLOBAL</p>
            </div>
          </div>
        </footer>
      )}
    </>
  );
};

const AppContent = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isAdminPath = location.pathname.startsWith("/admin");
  const { isAuthenticated } = useAuth(); // Check if user is authenticated
  console.log("isAdminPath", isAdminPath);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  // const [currentSlide, setCurrentSlide] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const isActive = (path) => {
    return location.pathname === path;
  };

  const activeStyle = {
    color: "#ff6b6b",
    fontWeight: "bold",
  };

  return (
    <>
      {/* {isAdminPath ? <AdminNavbar /> : <Navbar />} */}
      {location.pathname === "/review/demo" ||
      location.pathname === "/review/sonu" ||
      location?.pathname === "/review/arctic" ||
      location?.pathname === "/review/bata" ? null : isAdminPath ? (
        <AdminNavbar />
      ) : (
        // <Navbar />
        <>
          <div
            style={{ backgroundColor: "#555755" }}
            className={`mobile-menu ${isMenuOpen ? "open" : ""}`}
          >
            <nav style={{ marginTop: "92px" }}>
              <a
                href="/"
                onClick={() => setIsMenuOpen(false)}
                style={isActive("/") ? activeStyle : {}}
              >
                HOME
              </a>

              <a
                href="/ourproduct"
                onClick={() => setIsMenuOpen(false)}
                style={isActive("/ourproduct") ? activeStyle : {}}
              >
                OUR PRODUCTS
              </a>
              <a
                href="/about"
                onClick={() => setIsMenuOpen(false)}
                style={isActive("/about") ? activeStyle : {}}
              >
                ABOUT
              </a>

              <a
                href="/contactus"
                onClick={() => setIsMenuOpen(false)}
                style={isActive("/contactus") ? activeStyle : {}}
              >
                Contact Us
              </a>

              {/* <a href="#career" onClick={() => setIsMenuOpen(false)}>
                CAREER
              </a> */}
              {/* <a
                href="/contactus"
                onClick={() => setIsMenuOpen(false)}
                style={isActive("/contactus") ? activeStyle : {}}
              >
                CONTACT US
              </a> */}
            </nav>
            {/* <div className="social-links">
              <a href="#facebook" aria-label="Facebook">
                f
              </a>
              <a href="#linkedin" aria-label="LinkedIn">
                in
              </a>
              <a href="#whatsapp" aria-label="WhatsApp">
                wa
              </a>
              <a href="#instagram" aria-label="Instagram">
                ig
              </a>
            </div> */}
          </div>
          <header
            style={{ display: "flex", flexDirection: "row" }}
            className={`header ${isScrolled ? "scrolled" : ""}`}
          >
            <div
              className="logo"
              onClick={() => {
                navigate("/");
              }}
              style={{ marginLeft: "12px" }}
            >
              RUZAN GLOBAL
            </div>
            <nav className="desktop-nav">
              <a href="/" style={isActive("/") ? activeStyle : {}}>
                Home
              </a>
              <a
                href="/ourproduct"
                style={isActive("/ourproduct") ? activeStyle : {}}
              >
                Our Products
              </a>
              <a href="/about" style={isActive("/about") ? activeStyle : {}}>
                About
              </a>
              <a
                style={{
                  marginRight: "22px",
                  ...(isActive("/contactus") ? activeStyle : {}),
                }}
                href="/contactus"
              >
                Contact Us
              </a>
            </nav>
            <button
              className="menu-toggle"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <FaTimes /> : <FaBars />}
            </button>
          </header>
        </>
      )}
      <Routes>
        {/* Main Routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/category/tracksuit" element={<Tracksuit />} />
        <Route path="/category/tshirt" element={<TShirt />} />
        <Route path="/review/demo" element={<GoogleReviewPage />} />
        <Route path="/review/sonu" element={<SonuReviewPAge />} />
        <Route path="/review/arctic" element={<ArcticRefrigeration />} />
        <Route path="/review/bata" element={<Bata />} />
        <Route path="/ourproduct" element={<QuickCardsHomePage />} />
        <Route path="/about" element={<About />} />
        <Route path="/contactus" element={<ContactUs />} />
        <Route path="/addtocart" element={<AddToCart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/singlepage" element={<SinglePage />} />
        {/* Dynamic route for product details */}
        <Route path="/products/:id" element={<ProductDetails />} />
        {/* Admin Routes */}
        <Route
          path="/admin"
          element={
            isAuthenticated ? (
              <Navigate to="/admin/dashboard" />
            ) : (
              <Navigate to="/admin/login" />
            )
          }
        />{" "}
        {/* Redirect to dashboard or login */}
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/products"
          element={
            <ProtectedRoute>
              <Products />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/reviews"
          element={
            <ProtectedRoute>
              <Categories />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/orders"
          element={
            <ProtectedRoute>
              <Orders />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/users"
          element={
            <ProtectedRoute>
              <Users />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/contact"
          element={
            <ProtectedRoute>
              <ContactLists />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/order"
          element={
            <ProtectedRoute>
              <OrderList />
            </ProtectedRoute>
          }
        />
        {/* Login Route */}
        <Route
          path="/admin/login"
          element={
            isAuthenticated ? <Navigate to="/admin/dashboard" /> : <LoginPage />
          }
        />
      </Routes>
    </>
  );
};

export default App;
