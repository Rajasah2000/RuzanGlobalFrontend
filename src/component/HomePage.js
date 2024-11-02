import React, { useState, useEffect } from "react";
import mensCollectionImage from "../images/mensCollection.jpg";
import { Link } from "react-router-dom";
import "tailwindcss/tailwind.css"; // Assuming Tailwind is already installed
import LatestTrends from "./LatestTrends";
import FeaturedCollection from "./FeaturedCollection";

const HomePage = () => {
  const [latestTrends, setLatestTrends] = useState([]);
  const [featuredCollection, setFeaturedCollection] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products/")
      .then((response) => response.json())
      .then((data) => {
        setLatestTrends(data);
        setFeaturedCollection(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching the products:", error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="pt-16 font-bebas">
      {/* Hero Section */}
      {/* <section className="relative h-[40rem] flex items-center justify-center text-white mb-8">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover z-0"
        >
          <source src="/hero.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        <div className="absolute inset-0 bg-black opacity-70 z-1"></div>

        <div className="relative z-10 text-center">
          <h1 className="text-6xl font-bold mb-4">Welcome to Ruzan Global</h1>
          <p className="text-xl mb-8">Get the best Smart Solutions</p>
          <button className="bg-white text-black py-2 px-4 rounded-full hover:bg-gray-200 transition">
            Shop Now
          </button>
        </div>
      </section> */}
      <section className="w-full">
        <img
          src="./3.jpg"
          alt="Full Width Example"
          className="w-full h-auto object-cover"
        />
      </section>
      {/* Full-Width Image */}
      <section className="w-full">
        <img
          src="./2.jpg"
          alt="Full Width Example"
          className="w-full h-auto object-cover"
        />
      </section>
      {/* <section className="w-full">
        <img
          src="./3.jpg"
          alt="Full Width Example"
          className="w-full h-auto object-cover"
        />
      </section> */}

      <section className="w-full">
        <img
          src="./5.jpg"
          alt="Full Width Example"
          className="w-full h-auto object-cover"
        />
      </section>
      <section className="w-full">
        <img
          src="./6.jpg"
          alt="Full Width Example"
          className="w-full h-auto object-cover"
        />
      </section>
      <section className="w-full">
        <img
          src="./4.jpg"
          alt="Full Width Example"
          className="w-full h-auto object-cover"
        />
      </section>
      <section className="w-full">
        <img
          src="./7.jpg"
          alt="Full Width Example"
          className="w-full h-auto object-cover"
        />
      </section>

      {/* Latest Trends */}
      {/* <LatestTrends latestTrends={latestTrends} loading={loading} /> */}
    </div>
  );
};

export default HomePage;
