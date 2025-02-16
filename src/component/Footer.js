import React from "react";
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
  FaYoutube,
  FaWhatsapp,
} from "react-icons/fa";

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
        Your ultimate solution for effortless Magic Google Reviews with just a
        Scan or Tap and comprehensive Website Development services and many
        more!
      </p>

      <p style={{ color: "red", marginBottom: "12px" }}>
        +91 8585 8484 01 ||{" "}
        <span style={{ color: "green" }}>ruzan.global@gmail.com</span>
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
        <a
          href="https://www.facebook.com/RuzanGlobal"
          style={iconStyle}
          aria-label="Facebook"
        >
          <FaFacebook />
        </a>
        <a
          href="https://www.instagram.com/RuzanGlobal"
          style={iconStyle}
          aria-label="Twitter"
        >
          <FaInstagram />
        </a>
        <a
          href="https://www.youtube.com/@RuzanGlobal"
          style={iconStyle}
          aria-label="Instagram"
        >
          <FaYoutube />
        </a>
        <a
          href="https://wa.me/message/I65SIPFGQMMAK1"
          style={iconStyle}
          aria-label="LinkedIn"
        >
          <FaWhatsapp />
        </a>
      </div>

      {/* Copyright */}
      <p style={{ fontSize: "0.8em", opacity: 0.8 }}>
        © 2024 ruzanglobal.com. All Rights Reserved.
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
