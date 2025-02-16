import React from "react";
import "./About.css";

function About() {
  const benefits = [
    {
      title: "Magic Google Review Standee",
      description:
        "🚀Say NO to Negative Reviews. 🌟Introducing Magic QR Code. ✅Positive reviews go directly to Google. ❌Negative Review is sent Privately to your Personal Dashboard for Action 🚀",
    },
    {
      title: "NFC Digital Business Card",
      description:
        "Engage your audience like never before. Our digital cards are designed to captivate attention and drive action, whether it's leaving a review or following your Instagram account.",
    },
    {
      title: "Website Design And Development",
      description:
        "We provide all types of website development. Business Website, Personal Website, Booking Website, Event Website, E-Commerce Website, Landing page website and many more.",
    },
    {
      title: "NFC Based Services",
      description:
        "We provide all types of NFC based Digital Business Card, Visiting Card, Google Review Card, Contact Number Sharing Card, Profile Sharing Card and many more.",
    },
  ];

  const customerBenefits = [
    "Fully customizable digital card designs to match your brand",
    "Seamless integration with top platforms like Google, Instagram, and more",
    "Real-time analytics to track engagement and conversions",
    "Dedicated support from our friendly and knowledgeable team",
  ];

  return (
    <div className="home-container" style={{ marginTop: "90px" }}>
      <img style={{ marginBottom: "12px" }} src={"/3.jpg"} alt="" />
      <img style={{ marginBottom: "12px" }} src={"/2.jpg"} alt="" />
      {/* About Section */}
      <section className="about-section">
        <h1>About RUZAN GLOBAL</h1>
        <p className="intro-text">
          At RUZAN GLOBAL, we're revolutionizing the way businesses and
          individuals connect and engage with their customers and followers
          through innovative Magic Google Review QR Code, NFC-based digital
          business cards and Perfect Website For Your Business.
        </p>

        <div className="what-we-offer">
          <h2>What We Offer</h2>
          <p className="offer-intro">
            Our range of NFC-based digital cards caters to various needs,
            whether you're looking to boost your Google Reviews, increase your
            Instagram followers, or amplify your online presence across other
            platforms. With RUZAN GLOBAL, you can expect:
          </p>

          <div className="benefits-grid">
            {benefits.map((benefit, index) => (
              <div key={index} className="benefit-item">
                <h3>{benefit.title}:</h3>
                <p>{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Vision Section */}
      <section className="vision-section">
        <div className="get-started">
          <h2>Get Started Today</h2>
          <p>
            Ready to take your online presence to the next level? Explore our
            range of NFC-based digital cards and discover how RUZAN GLOBAL can
            transform the way you engage with your audience. Join countless
            satisfied customers who have already experienced the RUZAN GLOBAL
            difference.
          </p>
        </div>

        <div className="our-vision">
          <h2>Our Vision</h2>
          <p>
            Our mission is to provide a simple, yet powerful solution that
            enables you to create and share dynamic digital cards for all your
            marketing and branding needs. Whether you're looking to drive more
            Google reviews, boost your Instagram following, or showcase your
            products and services, our suite of digital card solutions has you
            covered.
          </p>
        </div>

        <div className="customer-benefits">
          <h2>As a RUZAN GLOBAL customer, you'll enjoy</h2>
          <ul>
            {customerBenefits.map((benefit, index) => (
              <li key={index}>{benefit}</li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}

export default About;
