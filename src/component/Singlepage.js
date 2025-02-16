"use client";

import { useState, useRef, useEffect } from "react";
import { Eye, Check } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function SinglePage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    link: "",
    // logo: null,
  });
  const [quantity, setQuantity] = useState(1);
  const imageContainerRef = useRef(null);
  useEffect(() => {
    console.log("LLFKFFF", location?.state);
  }, []);
  // const images = [
  //   location?.state?.image,
  //   "https://quickcards.in/wp-content/uploads/2024/07/3.webp",
  //   "https://quickcards.in/wp-content/uploads/2024/07/4.webp",
  //   "https://quickcards.in/wp-content/uploads/2024/07/5.webp",
  // ];

  const images = location?.state?.image;

  const features = [
    "Premium Quality",
    "Secure Payments",
    "Satisfaction Guarantee",
    "PAN India Shipping",
    "Money Back Guarantee",
  ];

  const handleMouseMove = (e) => {
    const container = imageContainerRef.current;
    if (!container) return;

    const { left, top, width, height } = container.getBoundingClientRect();
    const x = (e.clientX - left) / width;
    const y = (e.clientY - top) / height;

    container.style.transformOrigin = `${x * 100}% ${y * 100}%`;
  };

  const handleInputChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "file" ? files[0] : value,
    }));
  };

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  const HandleAddtoCart = (e) => {
    e.preventDefault();
    let data = {
      product: location?.state,
      details: formData,
      quantity: quantity,
    };
    console.log("gfgfdsgfghfgdhgfdhfd", data);

    if (formData?.name && formData?.phone) {
      navigate("/addtocart", { state: data });
      toast?.success("Item Add to Cart Successfully!");
    } else {
      return toast?.error("All fields are required!");
    }
  };

  return (
    <div
      className="min-h-screen bg-gray-50 py-12"
      style={{ marginTop: "77px" }}
    >
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Product Images */}
          <div className="lg:w-1/2">
            <div className="relative bg-white rounded-xl shadow-md overflow-hidden">
              <div className="absolute top-4 left-4 z-10">
                <span className="bg-[#2F4858] text-white text-xs font-medium px-3 py-1 rounded">
                  SALE
                </span>
              </div>
              <div className="absolute top-4 right-4 z-10">
                <button className="bg-white rounded-full p-2 shadow-md hover:bg-gray-50 transition-colors">
                  <Eye className="w-4 h-4 text-gray-600" />
                </button>
              </div>
              <div
                ref={imageContainerRef}
                className="aspect-square overflow-hidden cursor-zoom-in"
                onMouseMove={handleMouseMove}
                onMouseEnter={() => {
                  if (imageContainerRef.current) {
                    imageContainerRef.current.style.transform = "scale(1.5)";
                  }
                }}
                onMouseLeave={() => {
                  if (imageContainerRef.current) {
                    imageContainerRef.current.style.transform = "scale(1)";
                  }
                }}
              >
                <img
                  src={images[currentImageIndex]}
                  alt="Product"
                  className="w-full h-full object-cover transition-transform duration-300"
                />
              </div>
            </div>

            <div className="grid grid-cols-4 gap-4 mt-4">
              {images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`relative bg-white rounded-lg shadow-sm overflow-hidden aspect-square
                    ${
                      currentImageIndex === index ? "ring-2 ring-[#2F4858]" : ""
                    }`}
                >
                  <img
                    src={image}
                    // src={location?.state?.image}
                    alt={`Product view ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Details */}
          <div className="lg:w-1/2">
            <div className="bg-white rounded-xl shadow-md p-6">
              {/* <nav className="text-sm text-gray-500 mb-4">
                HOME / SHOP / BUSINESS CARD (FULLY CUSTOMIZABLE ACCORDING TO
                YOUR PROFESSION)
              </nav> */}

              <h1 className="text-2xl font-bold mb-4">
                {location?.state?.title}
              </h1>

              <div className="flex items-baseline gap-2 mb-4">
                <span className="text-2xl font-bold">{`₹${location?.state?.price}`}</span>
                <span className="text-gray-500 line-through">{`₹${location?.state?.originalPrice}`}</span>
              </div>

              <div className="text-sm text-gray-600 mb-6">
                CATEGORY: {location?.state?.category}
              </div>

              <form className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Name:
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#2F4858] focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number:
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#2F4858] focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Link (Optional):
                  </label>
                  <input
                    type="url"
                    name="link"
                    value={formData.link}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#2F4858] focus:border-transparent"
                  />
                </div>

                {/* <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Logo (Optional):
                  </label>
                  <input
                    type="file"
                    name="logo"
                    onChange={handleInputChange}
                    accept="image/*"
                    className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[#2F4858] file:text-white hover:file:bg-[#1a2830]"
                  />
                </div> */}

                <div className="flex items-center gap-4">
                  <div className="flex items-center border rounded-lg shadow-sm">
                    <button
                      type="button"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-3 py-1 border-r hover:bg-gray-50"
                    >
                      -
                    </button>
                    <span className="px-4 py-1">{quantity}</span>
                    <button
                      type="button"
                      onClick={() => setQuantity(quantity + 1)}
                      className="px-3 py-1 border-l hover:bg-gray-50"
                    >
                      +
                    </button>
                  </div>
                  <button
                    type="submit"
                    onClick={HandleAddtoCart}
                    className="flex-1 bg-[#2F4858] text-white py-2 px-6 rounded-lg hover:bg-[#1a2830] transition-colors"
                  >
                    Add to cart
                  </button>
                </div>
              </form>

              <div className="mt-8">
                <h3 className="font-semibold mb-4">Extra Features:</h3>
                <ul className="space-y-2">
                  {features.map((feature, index) => (
                    <li
                      key={index}
                      className="flex items-center gap-2 text-sm text-gray-600"
                    >
                      <Check className="w-4 h-4 text-green-500" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
