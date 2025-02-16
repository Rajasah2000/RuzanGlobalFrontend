import React, { useState } from "react";
import "./QuickCardsHomepage.css";
// import Image from "next/image";
import { Eye, Image } from "lucide-react";
import { useNavigate } from "react-router-dom";

const QuickCardsHomePage = () => {
  const navigate = useNavigate();
  const [cartCount, setCartCount] = useState(0);

  const addToCart = () => {
    setCartCount((prevCount) => prevCount + 1);
  };

  const categories = [
    {
      name: "Review Cards",
      image:
        "https://quickcards.in/wp-content/uploads/2024/08/26523250_4_tarjeta_credito-Small.webp",
    },
    {
      name: "Business Cards",
      image: "https://quickcards.in/wp-content/uploads/2024/08/3-1.webp",
    },
    {
      name: "Social Media Cards",
      image:
        "	https://quickcards.in/wp-content/uploads/2024/07/Untitled-design-1.webp",
    },
    {
      name: "Standee",
      image: "https://quickcards.in/wp-content/uploads/2024/09/4.webp",
    },
    {
      name: "Combo",
      image:
        "https://quickcards.in/wp-content/uploads/2024/08/21392386_Credit_Card_1-Medium.webp",
    },
    {
      name: "Offers",
      image:
        "https://quickcards.in/wp-content/uploads/2024/08/credit_card_mockup_06-Small.webp",
    },
  ];

  const testimonials = [
    {
      rating: 5,
      text: "I have 2 restaurants and ordered 10 cards for each location. I am very impressed with how well these work.",
      name: "Rahul Sharma",
      designation: "restaurant owner",
      image: "/cus2.jpeg",
    },
    {
      rating: 5,
      text: "RUZAN GLOBAL Support Team did a great job helping us change the links on our cards. It's a fantastic products and haven't ran into any issues yet so thank you!",
      name: "Dr. Singh",
      designation: "Doctor",
      image: "/cus1.jpeg",
    },
    {
      rating: 5,
      text: "RUZAN GLOBAL has revolutionized the way I collect customer reviews! The Google Review cards have made it so easy for my customers to leave feedback.",
      name: "Sarah M",
      designation: "Boutique Owner",
      image: "/cus4.jpeg",
    },
  ];

  const products = [
    {
      title: "MAGIC QR CODE",
      category: "REVIEWS CARDS",
      description:
        "The Magic Google Review QR Code helps collect positive reviews, filters out negative feedback.",
      price: 999,
      originalPrice: 4999,
      image: ["/10A.jpg", "/10B.jpg", "/10C.jpg", "/10D.jpg"],
    },
    {
      title: "GOOGLE REVIEW CARD - NFC",
      category: "REVIEWS CARDS",
      description:
        "Professional business cards with customizable designs to match your brand identity",
      price: 499,
      originalPrice: 1999,
      image: ["/11A.jpg", "/11B.jpg", "/11C.webp", "/11D.jpg"],
    },
    {
      title: "INSTAGRAM FOLLOWERS CARD",
      category: "REVIEWS CARDS",
      description:
        "Professional business cards with customizable designs to match your brand identity",
      price: 499,
      originalPrice: 1999,
      image: ["/12A.jpg", "/12B.jpg", "/12C.jpg", "/12D.jpg"],
    },
    //  demo

    {
      title: "Facebook Followers Cards",
      category: "Facebook Followers Cards",
      description:
        "Facebook followers NFC cards allow customers to instantly follow your business page with a tap, boosting engagement.",
      price: 499,
      originalPrice: 1999,
      image: ["/14A.jpg", "/14B.jpg", "/14C.jpg"],
    },
    {
      title: "Youtube Subscribers Cards",
      category: "Youtube Subscribers Cards",
      description:
        "YouTube Subscribers NFC cards allow customers to instantly subscribe to your channel with a tap, increasing your subscriber base.",
      price: 499,
      originalPrice: 1999,
      image: ["/15A.jpg", "/15B.jpg", "/15C.webp"],
    },
    {
      title: "Whatsapp Business Cards",
      category: "Whatsapp Business Cards",
      description:
        "WhatsApp Business NFC cards allow customers to instantly start a chat with your business, streamlining communication.",
      price: 499,
      originalPrice: 1999,
      image: ["/16A.jpg", "/16B.jpg", "/16C.webp", "/16D.jpg"],
    },

    // demo
    {
      title: "Zomato Review Cards",
      category: "REVIEWS CARDS",
      description:
        "Zomato Review NFC business cards allow instant sharing of reviews and ratings, enhancing your restaurant's online presence.",
      price: 499,
      originalPrice: 1999,
      image: ["/13A.jpg", "/13B.jpg", "/13C.jpg"],
    },
    {
      title: "Advocate Vertical - PVC NFC Business Visiting Card",
      category: "REVIEWS CARDS",
      description:
        "Professional business cards with customizable designs to match your brand identity",
      price: 499,
      originalPrice: 1999,
      image: ["/4A.png", "/4B.png", "/4C.png"],
    },
    {
      title: "CA - PVC NFC Business Visiting Card",
      category: "REVIEWS CARDS",
      description:
        "Professional business cards with customizable designs to match your brand identity",
      price: 499,
      originalPrice: 1999,
      image: ["/5A.png", "/5B.png", "/5C.png", "/5D.png"],
    },
    {
      title: "Doctor Professional - PVC NFC Business Visiting Card",
      category: "REVIEWS CARDS",
      description:
        "Professional business cards with customizable designs to match your brand identity",
      price: 499,
      originalPrice: 1999,
      image: ["/6A.png", "/6B.png", "/6C.png"],
    },
    {
      title: "Doctor Wing - PVC NFC Business Visiting Card",
      category: "REVIEWS CARDS",
      description:
        "Professional business cards with customizable designs to match your brand identity",
      price: 499,
      originalPrice: 1999,
      image: ["/7A.png", "/7B.png", "/7C.png", "/7D.png"],
    },
    {
      title: "G Review Circle - PVC NFC Business Review Card",
      category: "REVIEWS CARDS",
      description:
        "Professional business cards with customizable designs to match your brand identity",
      price: 499,
      originalPrice: 1999,
      image: ["/8B.png", "/8C.png", "/8D.png"],
    },
  ];

  return (
    <div className="quick-cards-homepage">
      {/* Hero Section */}
      <section className="hero" style={{ marginTop: "33px" }}>
        <div className="hero-content">
          <h1 style={{ marginTop: "22px" }}>
            Are You Ready To Upgrade Your Experience With RUZAN GLOBAL?
          </h1>

          <p style={{ marginTop: "1px" }}>
            From Google Review Cards to Custom Business Cards – RUZAN GLOBAL
            Have It All.
          </p>

          <div className="cta-buttons" style={{ marginTop: "2px" }}>
            <button
              className="cta-button primary"
              style={{ backgroundColor: "#dc0000" }}
            >
              Shop Now
            </button>
            <button
              className="cta-button secondary"
              style={{
                border: "1px solid  #dc0000",
                color: "#dc0000",
              }}
            >
              Learn More
            </button>
          </div>
          <div className="trust-container">
            <div className="avatar-group">
              <img
                src="https://quickcards.in/wp-content/uploads/2024/05/home-avatar-1.webp"
                alt="User avatar"
                className="avatar"
                style={{ border: "1px solid  #dc0000" }}
              />
              <img
                src="https://quickcards.in/wp-content/uploads/2024/05/home-avatar-2.webp"
                alt="User avatar"
                className="avatar"
                style={{ border: "1px solid  #dc0000" }}
              />
              <img
                src="https://quickcards.in/wp-content/uploads/2024/05/home-avatar-3.webp"
                alt="User avatar"
                className="avatar"
                style={{ border: "1px solid  #dc0000" }}
              />
            </div>
            <p className="trust-text">Trusted by thousands</p>
          </div>
        </div>
        <div className="hero-image" style={{ marginBottom: "85px" }}>
          <img
            // src="https://quickcards.in/wp-content/uploads/2024/08/credit_card_mockup_06-Small.webp"
            src="/product1.png"
            alt="RUZAN GLOBAL Preview"
          />
        </div>
      </section>

      {/* Categories Section */}

      <section className="categories-section">
        {/* <h1 style={{ fontSize: "xx-large", textAlign: "center" }}>
          Popular Categories
        </h1> */}
        <h2 className="testimonials-heading">
          <span className="pink">Popu</span>
          <span className="dark-red">lar Cate</span>
          <span className="orange">gories</span>
        </h2>
        <div className="category-grid">
          {categories.map((category, index) => (
            <div key={index} className="category-item">
              <div className="image-container">
                <img
                  src={category?.image}
                  className="category-image"
                  alt={category}
                />
              </div>
              <h3 className="category-title">{category?.name}</h3>
            </div>
          ))}
        </div>
      </section>

      {/* Special Offers Section */}
      <section className="special-offers">
        <h2 className="testimonials-heading">
          <span className="pink">Speci</span>
          <span className="dark-red">al off</span>
          <span className="orange">ers</span>
        </h2>
        <p>
          Our best-selling products are loved for their quality and ease of use.
          Don't miss out on these customer-favourite offers!
        </p>
        <div className="offers-grid">
          {[
            {
              title: "Buy 5 Cards & + Get 2 Card FREE",
              desc: "(Any cards)",
              bgColor: "#a5b5a6",
              bgImage:
                "https://quickcards.in/wp-content/uploads/2024/08/Credit_card_mockup_6-Small.webp",
            },
            {
              title: "Buy 10 Cards & + Get 3 Card FREE",
              desc: "(Save ₹2290)",
              bgColor: "#deb396",
              bgImage:
                "	https://quickcards.in/wp-content/uploads/2024/08/21392386_Credit_Card_1-Medium.webp",
            },
            {
              title: "Buy 3 Cards & Get 1 Card Free",
              desc: "(Any cards)",
              bgColor: "#b4b4b4",
              bgImage:
                "	https://quickcards.in/wp-content/uploads/2024/08/Credit_card_mockup_6-Small.webp",
            },
          ].map((offer, index) => (
            <div
              key={index}
              className="offer-item"
              style={{
                backgroundColor: offer?.bgColor,
                // backgroundImage: `url(${offer.bgImage})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                position: "relative",
              }}
            >
              <h3>{offer.title}</h3>
              <h4>{offer.desc}</h4>
              <button
                className="buy-now-button"
                style={{ backgroundColor: "#dc0000" }}
              >
                Buy Now
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Bestsellers Section */}
      <section className="bestsellers">
        {/* <h2> of the week</h2> */}
        <h2 className="testimonials-heading">
          <span className="red" style={{ color: "red" }}>
            Bestsellers{" "}
          </span>
          <span className="dark-red">of the </span>
          <span className="orange">week</span>
        </h2>
        <p>
          Check out our most popular products this week! Our customers love
          these items for their quality and price. Hurry, they're selling fast!
        </p>
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product, index) => (
              <div
                key={index}
                className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <div className="relative">
                  <div className="absolute top-3 left-3 z-10">
                    <span className="bg-[#2F4858] text-white text-xs font-semibold px-2 py-1 rounded">
                      SALE
                    </span>
                  </div>
                  <div
                    className="absolute top-3 right-3 z-10"
                    onClick={() => navigate("/singlepage", { state: product })}
                  >
                    <button className="bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition-colors">
                      <Eye
                        style={{ color: "#dc0000" }}
                        className="w-4 h-4 text-gray-600"
                      />
                    </button>
                  </div>
                  <div
                    className="relative h-[300px]"
                    onClick={() => navigate("/singlepage", { state: product })}
                  >
                    <img
                      src={product.image?.[0]}
                      alt={product.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                <div className="p-5">
                  <div className="mb-4">
                    <span className="text-sm text-gray-500 mb-2 block">
                      {product.category}
                    </span>
                    <h3 className="text-xl font-semibold mb-2">
                      {product.title}
                    </h3>
                    <p className="text-gray-600 text-sm">
                      {product.description}
                    </p>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-xl font-bold">
                        ₹{product.price.toFixed(2)}
                      </span>
                      <span className="text-gray-500 line-through text-sm">
                        ₹{product.originalPrice.toFixed(2)}
                      </span>
                    </div>
                    <button
                      onClick={() => {
                        let data = {
                          product: product,
                          details: {},
                          quantity: 1,
                        };
                        navigate("/addtocart", { state: data });
                      }}
                      style={{ backgroundColor: "#dc0000" }}
                      className="bg-[#2F4858] text-white px-4 py-2 rounded hover:bg-[#1a2830] transition-colors text-sm"
                    >
                      Add to cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="testimonials-section">
        <h2 className="testimonials-heading">
          <span className="pink">Our ha</span>
          <span className="dark-red">ppy clients say abou</span>
          <span className="orange">t us</span>
        </h2>

        <div className="testimonials-grid">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="testimonial-card">
              <div className="stars">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <span key={i} className="star">
                    ⭐
                  </span>
                ))}
              </div>
              <p className="testimonial-text">{testimonial.text}</p>
              <div className="user-info">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="user-image"
                />
                <div className="user-details">
                  <h3 className="user-name">{testimonial.name}</h3>
                  <p className="user-designation">{testimonial.designation}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default QuickCardsHomePage;
