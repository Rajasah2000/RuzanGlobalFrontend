import React, { useState } from "react";
import "./ContactUs.css";
import toast from "react-hot-toast";
import Helpers from "../Helper/Helpers";
import Swal from "sweetalert2";
let InitialData = {
  name: "",
  email: "",
  phone: "",
  message: "",
};
function ContactUs() {
  const [formData, setFormData] = useState(InitialData);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      formData?.name &&
      formData?.email &&
      formData?.phone &&
      formData?.message
    ) {
      const res = await Helpers("/user/contact/add", "POST", formData);
      if (res && res?.status) {
        Swal.fire({
          title: "Thank you! We'll get back to you soon.",
          icon: "success",
          draggable: true,
        });
        // toast.success("Thank you! We'll get back to you soon.");
        setFormData(InitialData);
      } else {
        toast.success("Error to add contact details");
      }

      console.log("Form submitted:", formData);
    } else {
      toast.error("All Fields are required!");
    }

    // Add your form submission logic here
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="contact-container" style={{ marginTop: "83px" }}>
      {/* Left Section - Contact Form */}
      <div className="contact-form-section">
        <h2 className="section-title">Get in touch</h2>
        <p className="section-subtitle">
          Fill out the form below and we will contact you as soon as possible!
        </p>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <input
              type="email"
              name="email"
              placeholder="Mail"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group phone-input">
            <div className="country-code"> +91</div>
            <input
              type="tel"
              name="phone"
              placeholder="Phone"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <textarea
              name="message"
              placeholder="Message"
              value={formData.message}
              onChange={handleChange}
              required
              rows="4"
            />
          </div>

          <button
            style={{ backgroundColor: "#dc0000" }}
            type="submit"
            className="submit-button"
          >
            Send
          </button>
        </form>
      </div>

      {/* Right Section - Map and Contact Info */}
      <div className="contact-info-section">
        <h2 className="section-title">Contact Us</h2>
        <p className="support-text">
          Our support team is available from 10 AM to 7 PM IST, Monday to
          Saturday.
        </p>

        <div className="map-container">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3686.0697631837!2d88.40033807596505!3d22.51646623759855!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a0271236952b3bb%3A0xb8f8c1a1a8b4d0d4!2sRuby%20General%20Hospital!5e0!3m2!1sen!2sin!4v1685439276304!5m2!1sen!2sin"
            width="100%"
            height="400"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="RUZAN"
          ></iframe>
        </div>

        <div className="contact-details">
          <div className="detail-column">
            <h3>Address</h3>
            <p>Kasba, Near Acropolis Mall</p>
            <p>Kolkata (W.B)</p>
          </div>

          <div className="detail-column">
            <h3>Phone</h3>
            <p>+91 8585848401</p>
          </div>

          <div className="detail-column">
            <h3>Email</h3>
            <p>ruzan.global@gmail.com</p>
            {/* <p>sales@quickcards.in</p> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactUs;
