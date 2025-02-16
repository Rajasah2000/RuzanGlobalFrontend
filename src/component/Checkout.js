"use client";

import { useState } from "react";
import { Minus, Plus, X } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Helpers from "../Helper/Helpers";
import Swal from "sweetalert2";

export default function Checkout() {
  const location = useLocation();
  const navigate = useNavigate();
  const { product, quantity, price } = location?.state;
  const [status, setStatus] = useState(false);
  const QRCode = require("qrcode");
  console.log("JKJHHGGYG", product, quantity);
  const [selectedPayment, setSelectedPayment] = useState("");
  const [qr, setqr] = useState("");
  const [error, setError] = useState(""); // To display error message
  const [formData, setFormData] = useState({
    companyName: "",
    firstName: "",
    lastName: "",
    country: "India",
    streetAddress: "",
    city: "",
    state: "",
    pinCode: "",
    phone: "",
    email: "",
    orderNotes: "",
    shipToDifferent: false,
  });
  const handlePaymentChange = (e) => {
    setSelectedPayment(e.target.value);
    setError("");
  };
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      title: product?.title,
      price: price / quantity,
      quantity: quantity,
      image: product?.image,
    },
  ]);

  console.log("VVVVVVVVVVVVV", cartItems);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const updateQuantity = (id, change) => {
    setCartItems((items) =>
      items.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + change) }
          : item
      )
    );
  };

  const generateUPIQRCode = async (upiId, payeeName, amount) => {
    // Correct UPI URL format
    const upiLink = `upi://pay?pa=${upiId}&pn=${encodeURIComponent(
      payeeName
    )}&am=${amount}&cu=INR`;

    try {
      // Generate the QR code from the UPI link
      const qrCodeDataUrl = await QRCode.toDataURL(upiLink);
      return qrCodeDataUrl;
      //  setQRCodeSrc(qrCodeDataUrl);
    } catch (err) {
      console.error("Error generating QR code", err);
    }
  };

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  // const total = subtotal; // Free shipping
  const total = subtotal;
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle form submission

    const isValid = Object.entries(formData).every(([key, value]) => {
      if (key === "orderNotes" || key === "shipToDifferent") return true; // Skip optional fields
      return value.trim() !== "";
    });
    if (isValid) {
      if (!selectedPayment) {
        setError("Please select a payment method!");
      } else {
        if (selectedPayment === "online") {
          let qrlink = await generateUPIQRCode(
            "8585848401-1@okbizaxis",
            "RUZAN",
            total
          );
          setqr(qrlink);
          setStatus(true);
          return;
        }
        delete product.image;

        let data = {
          userDetails: formData,
          product: product,
          method: selectedPayment,
          total: total,
          quantity: total / product?.price,
        };
        data.product.price = total / Math.round(total / product?.price);
        const res = await Helpers("/user/order/add", "POST", data);

        if (res) {
          Swal.fire({
            title:
              "Thank you for your order! and your order is being processed.",
            icon: "success",
            draggable: true,
          });
          // toast.success(
          //   "Thank you for your order! and your order is being processed."
          // );
          setTimeout(() => {
            navigate("/ourproduct");
          }, 1000);
          //   console.log("Selected Payment Method:", data);
        } else {
          console.log("Error in order section!");
        }
      }
    } else {
      setStatus(false);
      toast.error("All fields are required!");
    }
  };

  const AfterPaymentHandle = async () => {
    delete product.image;
    let data = {
      userDetails: formData,
      product: product,
      method: selectedPayment,
      total: total,
      quantity: total / product?.price,
    };
    data.product.price = total / Math.round(total / product?.price);
    const res = await Helpers("/user/order/add", "POST", data);
    if (res) {
      setStatus(false);
      Swal.fire({
        title: "Thank you for your order! and your order is being processed.",
        icon: "success",
        draggable: true,
      });

      setTimeout(() => {
        navigate("/ourproduct");
      }, 2000);
      //   console.log("Selected Payment Method:", data);
    } else {
      console.log("Error in order section!");
    }
  };

  return (
    <div
      className="min-h-screen bg-gray-50 py-12"
      style={{ marginTop: "77px" }}
    >
      <div className="container mx-auto px-4">
        <form
          //   onSubmit={handleSubmit}
          className="flex flex-col lg:flex-row gap-8"
        >
          {/* Billing Details */}
          <div className="lg:w-2/3">
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-2xl font-semibold mb-6">Billing Details</h2>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Business / Company Name
                </label>
                <input
                  type="Text"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#2F4858] focus:border-transparent"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    First name *
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    required
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#2F4858] focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Last name *
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    required
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#2F4858] focus:border-transparent"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Country / Region *
                  </label>
                  <select
                    name="country"
                    required
                    value={formData.country}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#2F4858] focus:border-transparent"
                  >
                    <option value="India">India</option>
                  </select>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Street address *
                  </label>
                  <input
                    type="text"
                    name="streetAddress"
                    required
                    value={formData.streetAddress}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#2F4858] focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Town / City *
                  </label>
                  <input
                    type="text"
                    name="city"
                    required
                    value={formData.city}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#2F4858] focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    State *
                  </label>
                  <select
                    name="state"
                    required
                    value={formData.state}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#2F4858] focus:border-transparent"
                  >
                    <option value="">Select a state</option>
                    <option value="West Bengal">West Bengal</option>
                    {/* Add other states */}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    PIN Code *
                  </label>
                  <input
                    type="text"
                    name="pinCode"
                    required
                    value={formData.pinCode}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#2F4858] focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#2F4858] focus:border-transparent"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#2F4858] focus:border-transparent"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      name="shipToDifferent"
                      checked={formData.shipToDifferent}
                      onChange={handleInputChange}
                      className="rounded border-gray-300 text-[#2F4858] focus:ring-[#2F4858]"
                    />
                    <span className="text-sm text-gray-700">
                      Ship to a different address?
                    </span>
                  </label>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Order notes (optional)
                  </label>
                  <textarea
                    name="orderNotes"
                    value={formData.orderNotes}
                    onChange={handleInputChange}
                    rows="4"
                    placeholder="Notes about your order, e.g. special notes for delivery."
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#2F4858] focus:border-transparent"
                  ></textarea>
                </div>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:w-1/3">
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-semibold mb-6">Your order</h2>

              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex gap-4 py-4 border-b">
                    <img
                      src={item.image[0]}
                      alt={item.title}
                      className="w-20 h-20 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h3 className="text-sm font-medium">{item.title}</h3>
                      <div className="flex items-center gap-2 mt-2">
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.id, -1)}
                          className="p-1 hover:bg-gray-100 rounded"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="text-sm">{item.quantity}</span>
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.id, 1)}
                          className="p-1 hover:bg-gray-100 rounded"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="font-medium">
                        ₹{(item.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  </div>
                ))}

                <div className="flex justify-between py-4 border-b">
                  <span className="font-medium">Subtotal</span>
                  <span>₹{subtotal.toFixed(2)}</span>
                </div>

                <div className="flex justify-between py-4 border-b">
                  <span className="font-medium">Shipping</span>
                  <span className="text-green-600">Free shipping</span>
                </div>

                <div className="flex justify-between py-4 border-b">
                  <span className="font-medium">Total</span>
                  <span className="text-xl font-bold">₹{total.toFixed(2)}</span>
                </div>

                <div className="space-y-4 pt-4">
                  <div className="flex items-center gap-2">
                    <input
                      type="radio"
                      id="credit-card"
                      name="payment"
                      value="online"
                      className="text-[#2F4858] focus:ring-[#2F4858]"
                      onChange={handlePaymentChange}
                    />
                    <label htmlFor="credit-card" className="text-sm">
                      Online Payment
                    </label>
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="radio"
                      id="phonepay"
                      name="payment"
                      value="cash"
                      onChange={handlePaymentChange}
                      className="text-[#2F4858] focus:ring-[#2F4858]"
                    />
                    <label htmlFor="phonepay" className="text-sm">
                      Cash Payment
                    </label>
                  </div>
                  {error && <p className="text-sm text-red-600">{error}</p>}
                  <p className="text-sm text-gray-600 mt-4">
                    Pay securely by Credit or Debit card or Internet Banking
                    through Razorpay.
                  </p>

                  <div className="pt-4">
                    <button
                      type="submit"
                      onClick={handleSubmit}
                      className="w-full bg-[#2F4858] text-white py-3 rounded-lg hover:bg-[#1a2830] transition-colors"
                    >
                      Place order
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
      {selectedPayment === "online" && status && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            zIndex: 999,
            // marginTop: "77px",
          }}
        >
          {/* Prevent Background Scrolling */}
          <style>
            {`
              body {
                overflow: hidden;
              }
            `}
          </style>

          <div
            style={{
              position: "fixed",
              top: "57%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              textAlign: "center",
              zIndex: 1000,
              backgroundColor: "#fff",
              padding: "50px",
              borderRadius: "10px",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
              width: "300px",
            }}
          >
            <h6 style={{ fontSize: "1.4rem", color: "#333" }}>RUZAN GLOBAL</h6>
            <h1 style={{ fontSize: "1.7rem", color: "#333", padding: "none" }}>
              {total}
            </h1>
            <img
              src={qr}
              alt="UPI QR Code"
              style={{
                width: "200px",
                height: "auto",
                margin: "1px 0",
                textAlign: "center",
              }}
            />
            <p style={{ fontSize: "1rem", color: "#555" }}>
              UPI ID: ruzan.care@oksbi
            </p>
            <img src="/paymentlogo.png" />
            <button
              style={{
                backgroundColor: "#4CAF50",
                color: "white",
                padding: "10px 20px",
                fontSize: "16px",
                fontWeight: "bold",
                borderRadius: "8px",
                border: "none",
                cursor: "pointer",
                marginTop: "10px",
              }}
              onClick={AfterPaymentHandle}
            >
              Proceed to Order
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
