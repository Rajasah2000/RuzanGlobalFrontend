import React from "react";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer
      style={{
        backgroundColor: "#000",
        color: "#fff",
        padding: "40px 20px",
        textAlign: "center",
      }}
    >
      {/* Company Name */}
      <h2 style={{ fontSize: "1.5em", marginBottom: "10px" }}>RUZAN GLOBAL</h2>

      {/* Description */}
      <p style={{ marginBottom: "20px" }}>
        Delivering excellence in service with passion and commitment. Your
        satisfaction is our priority!
      </p>

      {/* Social Media Icons */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "20px",
          marginBottom: "20px",
        }}
      >
        <a href="https://facebook.com" style={iconStyle} aria-label="Facebook">
          <FaFacebook />
        </a>
        <a href="https://twitter.com" style={iconStyle} aria-label="Twitter">
          <FaTwitter />
        </a>
        <a
          href="https://instagram.com"
          style={iconStyle}
          aria-label="Instagram"
        >
          <FaInstagram />
        </a>
        <a href="https://linkedin.com" style={iconStyle} aria-label="LinkedIn">
          <FaLinkedin />
        </a>
      </div>

      {/* Copyright */}
      <p style={{ fontSize: "0.8em", opacity: 0.8 }}>
        © 2024 Your Company. All Rights Reserved.
      </p>
    </footer>
  );
};

// Inline styles for social media icons
const iconStyle = {
  color: "#fff",
  fontSize: "1.5em",
  textDecoration: "none",
};

export default Footer;
