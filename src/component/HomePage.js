import React, { useState, useEffect } from "react";
import {
  FaUsers,
  FaBuilding,
  FaHome,
  FaBars,
  FaTimes,
  FaYoutube,
} from "react-icons/fa";
import "./HomePage.css";
// import "./QuickCardsHomePage.css";
import { ChevronDown, ChevronUp } from "lucide-react";

import {
  FaHandshake,
  FaLaptopCode,
  FaMobileAlt,
  FaFacebook,
  FaWhatsapp,
  FaLinkedin,
  FaInstagram,
} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
// import Image from "next/image";
const faqData = [
  {
    question: "What is the aim of RUZAN GLOBAL?",
    answer:
      "The aim of RUZAN GLOBAL appears to be to revolutionize customer engagement and connectivity for businesses and individuals by leveraging innovative technologies.",
  },
  {
    question: "Why Magic QR Codes?",
    answer:
      "More Effective than Paid ads, Get new customers Every Day. Get repeat purchases from existing customers. Build great & long-term Customer Experience. 100% Automate your Marketing Effort.",
  },
  {
    question: "Magic QR Code Is Perfect For",
    answer:
      "The Magic QR Code is ideal for small business owners, professionals like doctors, dentists, and lawyers, hotel and restaurant owners, coaches and consultants, e-commerce owners, solopreneurs, self-employed individuals, makeup artists, bakers, real estate owners, agents, and anyone looking to grow their business.",
  },
  {
    question: "What you Have to Do?",
    answer:
      "Just show these Magic QR code to your Customers, that’s it! We will take care of everything! So that your business grow rapidly!",
  },
];

const successStories = [
  {
    id: 1,
    image: "./cus1.jpeg",
  },
  {
    id: 2,
    image: "./cus2.jpeg",
  },
  {
    id: 3,
    image: "./cus3.jpeg",
  },
  {
    id: 4,
    image: "./cus4.jpeg",
  },
  {
    id: 5,
    image: "./cus5.jpeg",
  },
];

const HomePage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();
  const [openIndex, setOpenIndex] = useState(null);

  const toggleAnswer = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const [windowSize, setWindowSize] = useState({
    width: typeof window !== "undefined" ? window.innerWidth : 0,
    height: typeof window !== "undefined" ? window.innerHeight : 0,
  });

  const [expandedService, setExpandedService] = useState(null);

  const servicess = [
    {
      id: 1,
      title: "Web Design",
      icon: <FaHandshake className="text-4xl text-white" />,
      shortDesc:
        "Web design is the creation and arrangement of visual elements on websites for optimal user experience, functionality, and aesthetics, integrating graphics, layout, and interactive features.",
      fullDesc:
        "Web design encompasses various aspects of website creation, including user interface (UI) design, user experience (UX) design, and graphic design. It involves planning and iterating a sites structure and layout, creating content and making sure its both accessible and user-friendly. Good web design helps guide your users eyes and tell them where you want them to look.",
      bgImage:
        "https://www.chplgroup.org/assets/images/resources/service-1-4.jpg",
    },
    {
      id: 2,
      title: "Web Development",
      icon: <FaLaptopCode className="text-4xl text-white" />,
      shortDesc:
        "Web development involves creating and maintaining websites or web applications, combining coding languages, frameworks, and design elements for an optimal user experience and functionality.",
      fullDesc:
        "Web development is the work involved in developing a website for the Internet or an intranet. It can range from developing a simple single static page of plain text to complex web applications, electronic businesses, and social network services. A more comprehensive list of tasks to which Web development commonly refers, may include Web engineering, Web design, Web content development, client liaison, client-side/server-side scripting, Web server and network security configuration, and e-commerce development.",
      bgImage:
        "	https://www.chplgroup.org/assets/images/resources/service-1-6.jpg",
    },
    {
      id: 3,
      title: "Mobile Apps",
      icon: <FaMobileAlt className="text-4xl text-white" />,
      shortDesc:
        "Innovative mobile apps offering seamless experiences, enhancing productivity, and fostering connectivity through user-friendly interfaces, advanced features, and intuitive design.",
      fullDesc:
        "Mobile application development is the process of creating software applications that run on a mobile device, and a typical mobile application utilizes a network connection to work with remote computing resources. Hence, the mobile development process involves creating installable software bundles (code, binaries, assets, etc.) , implementing backend services such as data access with an API, and testing the application on target devices.",
      bgImage:
        "https://www.chplgroup.org/assets/images/resources/service-1-5.jpg",
    },
  ];

  const iconss = {
    Hotel: "🏨",
    Hospital: "🏥",
    Salon: "💇",
    Spa: "💆",
    Tattoo: "🎨",
    Laundry: "🧺",
    Gym: "🏋️",
    CarService: "🚗",
    GroceryStore: "🛒",
    PhotoStudio: "📸",
  };
  const categories = [
    {
      title: "Hotel",
      stats: "50,000+ Room Booked",
      description: "Throw digital marketing and SEO service",
      image: "	https://mbgcard.in/wp-content/uploads/2021/02/hotel.jpg",
      icon: "🏨",
    },
    {
      title: "Hospital + Clinic",
      stats: "1 Lakh + Service Booked",
      description: "Throw digital marketing and SEO service",
      image:
        "https://mbgcard.in/wp-content/uploads/2021/02/talli-turmeric-fb.jpg",
      icon: "🏥",
    },
    {
      title: "Salon",
      stats: "50000+ Service Booked",
      description: "Throw digital marketing and SEO service",
      image:
        "https://mbgcard.in/wp-content/uploads/2021/02/2198760-2198759_hair-coloring-1-v-salon-1.jpg",
      icon: "💇",
    },
    {
      title: "Spa",
      stats: "10000+ Spa Taken",
      description: "Throw digital marketing and SEO service",
      image:
        "https://cdn.pixabay.com/photo/2022/07/06/12/04/candles-7304948_1280.jpg",
      icon: "💆",
    },
    {
      title: "Tattoo",
      stats: "30000+ Tattoo Created",
      description: "Throw digital marketing and SEO service",
      image: "	https://mbgcard.in/wp-content/uploads/2021/02/TATTTTT.jpg",
      icon: "🎨",
    },
    {
      title: "Laundry",
      stats: "15000+ Order Done",
      description: "Throw digital marketing and SEO service",
      image: "	https://mbgcard.in/wp-content/uploads/2021/02/laundary.jpg",
      icon: "🧺",
    },
    {
      title: "Gym",
      stats: "5000+ Membership Booked",
      description: "Throw digital marketing and SEO service",
      image:
        "	https://mbgcard.in/wp-content/uploads/2021/02/tuv-rheinland-gym-equipment.jpg",
      icon: "🏋️",
    },
    {
      title: "Car Service",
      stats: "1 Lakh+ Car Service Booked",
      description: "Throw digital marketing and SEO service",
      image:
        "https://mbgcard.in/wp-content/uploads/2021/02/AdobeStock_66932447-1.jpeg",
      icon: "🚗",
    },
    {
      title: "Grocery Store",
      stats: "60000+ Daily Visit",
      description: "Throw digital marketing and SEO service",
      image:
        "	https://mbgcard.in/wp-content/uploads/2021/02/grocery-items-335936637-6kpng.jpg",
      icon: "🛒",
    },
    {
      title: "Photo Studio",
      stats: "10000+ Photoshoot Booked",
      description: "Throw digital marketing and SEO service",
      image: "https://mbgcard.in/wp-content/uploads/2021/02/photography.jpg",
      icon: "📸",
    },
  ];

  const CategoryCard = ({ title, stats, description, image, icon }) => (
    <div className="category-card" style={{ backgroundImage: `url(${image})` }}>
      <div className="category-content">
        <div className="category-icon">{icon}</div>
        <h3
          className="category-title"
          style={{
            color: "red",
            fontWeight: "bold",
          }}
        >
          {title}
        </h3>
        <p className="category-stats">{stats}</p>
        <p className="category-description">{description}</p>
      </div>
    </div>
  );
  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const calculatePosition = (angle) => {
    const radius = Math.min(windowSize.width, windowSize.height) * 0.25;
    const x = Math.cos(angle) * radius;
    const y = Math.sin(angle) * radius;
    return { x, y };
  };

  const icons = [
    {
      src: "https://quickcards.in/wp-content/uploads/2024/07/1-500x593.webp",
      // text: "Magic QR Code",
      color: "#800000",
    },
    {
      src: "https://www.chplgroup.org/assets/images/MyCologo.png",
      // text: "Web Development",
      color: "#003333",
    },
    {
      src: "websitedevelopment.png",
      // text: "Web Design",
      color: "#800000",
    },
  ];

  const bannerContent = [
    {
      company: "RUZAN GLOBAL Smart Solutions",
      title: "Transforming Ideas Into Digital Realities",
      description:
        "We Focus on Creating Solutions That are not only Optmize operations but also enhance engagement among stakeholders.",
      image:
        "https://cdn.pixabay.com/photo/2016/04/20/08/21/entrepreneur-1340649_1280.jpg",
    },
    {
      company: "RUZAN GLOBAL Smart Solutions",
      title: "Boost Your Business Growth WIth 5 Star Magic Google Reviews",
      description: "Say Goodbye To Negative Reviews Forever!",
      image:
        "https://cdn.pixabay.com/photo/2020/01/29/20/24/building-4803602_1280.jpg",
    },
    {
      company: "RUZAN GLOBAL Smart Solutions",
      title: "Web Design & Web Development - Done Here!",
      description: "We Will Make a Perfect Website for Your Business.",
      image:
        "https://cdn.pixabay.com/photo/2017/05/19/12/40/beard-2326422_1280.jpg",
    },
    {
      company: "RUZAN GLOBAL Smart Solutions",
      title: "From NFC Cards to Custom Business Cards – Have It All.",
      description:
        "We continuously explore emerging technologies to provide cutting-edge solutions that meet the evolving needs of our clients.",
      image:
        "https://cdn.pixabay.com/photo/2016/04/20/08/21/entrepreneur-1340649_1280.jpg",
    },
  ];
  const categoriess = [
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

  useEffect(() => {
    const iframes = document.querySelectorAll("iframe");

    iframes.forEach((iframe) => {
      iframe.addEventListener("load", () => {
        const iframeWindow = iframe.contentWindow;

        iframe.addEventListener("click", () => {
          iframes.forEach((otherIframe) => {
            if (otherIframe !== iframe) {
              otherIframe.contentWindow.postMessage(
                '{"event":"command","func":"pauseVideo","args":""}',
                "*"
              );
            }
          });
        });
      });
    });
  }, []);

  const services = [
    {
      icon: <FaUsers />,
      title: "Are you struggling with:",
      description1: " Low Google Rankings?",
      description2: "Negative Reviews?",
      description3: "Poor Online Reputation?",
      image: "/design.png",
    },
    {
      icon: <FaBuilding />,
      title: "Boost Your Online Presence with Magic QR Code!",
      description1: "More 5-Star Reviews.",
      description2: "Better Google Ranking.",
      description3: "Easy Review Management.",

      image: "/design1.png",
    },
    {
      icon: <FaHome />,
      title: "Why you need Magic QR Codes for your business?",
      description1: " ✅1000X the frequency of Positive Reviews.",
      description2: "✅ Reduce 98% of Negative Reviews on your Google.",
      description3: "✅ Get repeat purchases from existing customers.",

      image: "/design2.png",
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % bannerContent.length);
    }, 5000);

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      clearInterval(timer);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="homepage">
      {/* <section className="banner">
        <div
          className="banner-content"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {bannerContent.map((content, index) => (
            <div
              key={index}
              className="banner-slide"
              style={{ backgroundImage: `url(${content.image})` }}
            >
              <div className="banner-overlay"></div>
              <div className="banner-text">
                <span className="company-name animate-slide-down">
                  {content.company}
                </span>
                <h1 className="animate-slide-up">{content.title}</h1>
                <p className="animate-fade-in">{content.description}</p>
                <button
                  className="contact-btn animate-slide-up"
                  onClick={() => navigate("/contactus")}
                >
                  Contact Us
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="banner-dots">
          {bannerContent.map((_, index) => (
            <span
              key={index}
              className={`dot ${currentSlide === index ? "active" : ""}`}
              onClick={() => setCurrentSlide(index)}
            ></span>
          ))}
        </div>
      </section> */}

      <section className="banner">
        <video autoPlay loop muted playsInline className="banner-video">
          <source src="/NEW VIDEO (2).mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </section>

      <section className="specializationss">
        <h3
          className="text-center text-4xl font-bold mb-2"
          style={{ marginTop: "12px" }}
        >
          This👇🏾Video👇🏾 Will Double Your Business Growth – Must Watch!
        </h3>
        <div
          className="services-grid"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "30px",
            background: "linear-gradient(135deg, #f8f9fa, #e9ecef)", // Light gradient background
            padding: "20px 20px",
            // margin: "0px 30px",
            borderRadius: "20px",
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)", // Soft shadow effect
          }}
        >
          <div className="video-container">
            <video id="customVideo" className="responsive-video" controls>
              <source src="/intro.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>

            {/* CSS Styles */}
            <style>
              {`
    

      .responsive-video {
        width: 50%;
        height: 50%;
      }

      @media (max-width: 768px) {
        .responsive-video {
          width: 100%;
          height: 100%;
        }
      }
    `}
            </style>
          </div>

          {/* Text Points Section */}
          <div
            style={{
              textAlign: "center",
              fontSize: "18px",
              fontWeight: "bold",
              color: "#333",
              marginTop: "10px",
              lineHeight: "1.6",
            }}
          >
            <p
              style={{
                background: "#4caf50",
                color: "white",
                padding: "10px 15px",
                borderRadius: "10px",
                marginBottom: "10px",
              }}
            >
              🌟 Introducing Magic Google Review QR Stand
            </p>
            <p
              style={{
                background: "#ffdd57",
                padding: "10px 15px",
                borderRadius: "10px",
              }}
            >
              ✅ Positive Reviews go directly to Google
            </p>
            <p
              style={{
                background: "#2196f3",
                color: "white",
                padding: "10px 15px",
                borderRadius: "10px",
                marginTop: "10px",
              }}
            >
              ❌ Negative Reviews is sent Privately to your Personal Dashboard🚀
            </p>

            <button
              style={{
                marginTop: "20px",
                padding: "15px 40px",
                fontSize: "18px",
                fontWeight: "bold",
                color: "white",
                background: "#4caf50",
                border: "none",
                borderRadius: "30px",
                cursor: "pointer",
                animation: "pulse 1.5s infinite",
                transition: "0.3s",
                boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
              }}
              onClick={() =>
                window.open(
                  "https://wa.me/p/8646893708772555/918585848401",
                  "_blank"
                )
              }
            >
              Order Now
            </button>
          </div>

          {/* Order Now Button with Animation */}

          {/* Keyframes for Button Animation */}
          <style>
            {`
      @keyframes pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.1); }
        100% { transform: scale(1); }
      }
    `}
          </style>
        </div>

        {/* CSS for Desktop Layout */}
        <style>
          {`
          @media (min-width: 768px) {
            .services-grid {
              flex-direction: row !important; /* Side by side on larger screens */
              justify-content: center;
              gap: 50px;
            }
          }
        `}
        </style>
      </section>
      <section className="specializations">
        <h3 className="text-center text-4xl font-bold mb-12">
          Our Specializations
        </h3>

        <div className="services-grid">
          {services.map((service, index) => (
            <div key={index} className="service-card">
              <div className="service-back" style={{ textAlign: "center" }}>
                <div className="service-icon">{service.icon}</div>

                <h3 style={{ color: "Black" }}>{service.title}</h3>
                <p
                  style={{
                    color: "white",
                    fontSize: index === 2 ? "16px" : "18px",
                  }}
                >
                  {service.description1}
                </p>
                <p
                  style={{
                    color: "white",
                    fontSize: index === 2 ? "15px" : "18px",
                  }}
                >
                  {service.description2}
                </p>
                <p
                  style={{
                    color: "white",
                    fontSize: index === 2 ? "16px" : "18px",
                  }}
                >
                  {service.description3}
                </p>
              </div>
              <div className="service-front">
                <img src={service.image} alt={service.title} />
                <div className="service-back-content">
                  <h3>{service.title}</h3>
                  {/* <p>{service.description}</p> */}
                </div>
              </div>
            </div>
          ))}
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
          {categoriess?.map((category, index) => (
            <div
              key={index}
              className="category-item"
              onClick={() => navigate("/ourproduct")}
            >
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

      <section className="product-section">
        {/* <h2>OUR PRODUCT</h2> */}
        <div className="product-content">
          <div className="product-info">
            <h3>RUZAN - Grow Your Business With Us.</h3>
            <p>
              At RUZAN GLOBAL, we're revolutionizing the way businesses and
              individuals connect and engage with their customers and followers
              through innovative Magic Google Review QR Code, NFC-based digital
              business cards and Perfect Website For Your Business.
            </p>
            <ul
              className="feature-list"
              style={{ cursor: "pointer", listStyle: "none", padding: 0 }}
            >
              {[
                "Magic Google Review Cards",
                "Business Cards",
                "Social Media Cards",
                "Mobile App",
                "Personal Website",
                "Business Website",
                "Booking Website",
                "Events Website",
                "E-commerce Website",
                "Educational Website",
                "Landing Pages",
                "Forum/Community website",
              ].map((item, index) => (
                <li
                  key={index}
                  style={{
                    margin: "10px 0",
                    padding: "10px",
                    transition: "transform 0.3s ease",
                    paddingLeft: "35px",
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.transform = "scale(1.1)";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.transform = "scale(1)";
                  }}
                >
                  {item}
                </li>
              ))}
            </ul>

            <div className="product-buttons">
              {/* <button className="about-btn">About RUZAN GLOBLA</button> */}
            </div>
          </div>
          <div className="product-image">
            <img src="/socialmedia.jpg" alt="MyCo App Preview" />
          </div>
        </div>
      </section>

      <div className="flex flex-col md:flex-row w-full max-w-7xl mx-auto p-4 gap-8">
        {/* Left side - Images */}
        <div className="md:w-1/2 relative h-[400px] ">
          {/* Center image */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-190 h-190">
            <img
              style={{ borderRadius: "5PX", marginBottom: "0px" }}
              src="banner.png"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Surrounding icons */}
          {/* {icons.map((icon, index) => {
            const angle = (index * 2 * Math.PI) / 3 - Math.PI / 2; // Start from top
            const { x, y } = calculatePosition(angle);
            return (
              <div
                key={index}
                className="absolute transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full flex flex-col items-center justify-center text-white text-center p-4"
                style={{
                  top: `calc(50% + ${y}px)`,
                  left: `calc(50% + ${x}px)`,
                  backgroundColor: icon.color,
                  padding: "32px",
                }}
              >
                <img
                  src={icon.src}
                  alt={icon.text}
                  className="w-19 h-19 mb-2"
                />
                <span className="text-sm whitespace-nowrap">{icon.text}</span>
              </div>
            );
          })} */}
        </div>

        {/* Right side - FAQ */}
        <div className="md:w-1/2">
          <h2 className="text-2xl font-bold mb-4">
            Frequently Asked Questions
          </h2>
          {faqData.map((faq, index) => (
            <div key={index} className="mb-4 border rounded-lg overflow-hidden">
              <button
                className="w-full text-left p-4 flex justify-between items-center bg-red hover:bg-gray-50 transition-colors"
                onClick={() => toggleAnswer(index)}
                style={{
                  backgroundColor:
                    openIndex === index || index === 0 ? "#a00004" : null,
                }}
              >
                <span className="font-semibold">{faq.question}</span>
                {openIndex === index ? (
                  <ChevronUp className="w-5 h-5" />
                ) : (
                  <ChevronDown className="w-5 h-5" />
                )}
              </button>
              {openIndex === index && (
                <div className="p-4 bg-gray-50">
                  <p>{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      <div className="min-h-screen bg-gray-100">
        {/* Expertise Section */}
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-center text-red-600 text-sm font-bold mb-2">
              OUR EXPERTISE
            </h2>
            <h3 className="text-center text-4xl font-bold mb-12">
              Explore our range of services
            </h3>
            <div className="grid md:grid-cols-3 gap-8">
              {servicess.map((service) => (
                <div
                  key={service.id}
                  className="bg-white rounded-lg shadow-lg overflow-hidden transition-all duration-400 transform hover:-translate-y-2"
                  style={{
                    backgroundImage: `linear-gradient(rgba(9, 17, 6, 0.7), rgba(0, 0, 0, 1.7)), url(${service.bgImage})`,
                    //    backgroundImage: hoveredService === service.id
                    // ? `url(${service.bgImage})`
                    // : 'none'
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                  onMouseEnter={() => setExpandedService(service.id)}
                  onMouseLeave={() => setExpandedService(null)}
                >
                  <div className="p-6 h-full flex flex-col">
                    <div className="bg-red-600 rounded-full w-16 h-16 flex items-center justify-center mb-4">
                      {service.icon}
                    </div>
                    <h4 className="text-xl font-bold mb-2 text-white">
                      {service.title}
                    </h4>
                    <p className="text-gray-200 mb-4 flex-grow">
                      {expandedService === service.id
                        ? service.fullDesc
                        : service.shortDesc}
                    </p>
                    <div className="mt-auto">
                      <span className="text-sm text-red-400">
                        {
                          expandedService === service.id ? "0" : null
                          // service.id.toString().padStart(2, "0")
                        }
                      </span>
                      <button
                        onClick={() =>
                          setExpandedService(
                            expandedService === service.id ? null : service.id
                          )
                        }
                        className="text-red-400 hover:text-red-300 transition-colors duration-300 ml-2"
                      >
                        {expandedService === service.id
                          ? "Read Less »"
                          : "Read More »"}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* < New Section     */}

        <div className="home-container">
          <h3 className="text-center text-4xl font-bold mb-12">
            Popular Business Category We Work With
          </h3>

          <div className="category-grid">
            {categories.slice(0, 6).map((category, index) => (
              <CategoryCard key={index} {...category} />
            ))}
          </div>
          <div className="category-grid">
            {categories.slice(6).map((category, index) => (
              <CategoryCard key={index + 6} {...category} />
            ))}
          </div>
        </div>
        {/* Success Story Section */}
        <section className="py-16 px-4 bg-white">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-center text-red-600 text-sm font-bold mb-2">
              SUCCESS STORY
            </h2>
            <h3 className="text-center text-4xl font-bold mb-12">
              Meet Our Satisfied Customers
            </h3>
            <div className="grid md:grid-cols-5 gap-4">
              {successStories.map((story) => (
                <div
                  key={story.id}
                  className="rounded-lg overflow-hidden shadow-lg"
                >
                  <img
                    src={story.image}
                    alt={`Success Story ${story.id}`}
                    className="w-full h-65 object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Footer */}
      </div>
    </div>
  );
};

export default HomePage;
