"use client";

import { useEffect, useState } from "react";
import { Trash2 } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function AddToCart() {
  const navigate = useNavigate();
  const location = useLocation();
  const { product, details, quantity } = location?.state;

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      title: product?.title,
      price: product?.price,
      quantity: quantity,
      image: product?.image,
    },
  ]);

  const [couponCode, setCouponCode] = useState("");
  const [discount, setDiscount] = useState(0);

  const updateQuantity = (id, change) => {
    setCartItems((items) =>
      items.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + change) }
          : item
      )
    );
  };

  const removeItem = (id) => {
    setCartItems((items) => items.filter((item) => item.id !== id));
  };

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const shipping = 0; // Free shipping
  let total = subtotal + shipping - discount;
  const HanadleProceedToCheckout = (e) => {
    e.preventDefault();
    let data = {
      product: product,
      quantity: cartItems[0]?.quantity,
      price: total,
    };
    navigate("/checkout", { state: data });
  };
  const applyCoupon = () => {
    if (!couponCode) {
      toast.error("Field is required");
    } else if (couponCode === "HAPPY100") {
      setDiscount(100);
      toast.success("₹100 off applied!");
    } else if (couponCode === "MAGIC200") {
      setDiscount(200);
      toast.success("₹200 off applied!");
    } else if (couponCode === "RUZAN400") {
      setDiscount(400);
      toast.success("₹400 off applied!");
    } else if (couponCode === "GLOBAL500") {
      setDiscount(500);
      toast.success("₹500 off applied!");
    } else {
      setDiscount(0);
      toast.error("Invalid coupon code");
    }
  };

  return (
    <div className="container mx-auto px-4 py-8" style={{ marginTop: "77px" }}>
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Cart Items */}
        <div className="lg:w-2/3">
          <table className="w-full">
            <thead className="border-b">
              <tr className="text-left">
                <th className="pb-4">Product</th>
                <th className="pb-4">Quantity</th>
                <th className="pb-4">Subtotal</th>
                <th className="pb-4 sr-only">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {cartItems.map((item) => (
                <tr key={item.id} className="py-4">
                  <td className="py-4">
                    <div className="flex items-center gap-4">
                      <img
                        src={item?.image[0]}
                        alt={item.title}
                        className="w-20 h-20 object-cover rounded"
                      />
                      <div>
                        <h3 className="font-medium">{item.title}</h3>
                        <p className="text-gray-600">
                          ₹{item.price.toFixed(2)}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4">
                    <div className="flex items-center border rounded-md w-fit">
                      <button
                        onClick={() => updateQuantity(item.id, -1)}
                        className="px-3 py-1 border-r hover:bg-gray-50"
                      >
                        -
                      </button>
                      <span className="px-4 py-1">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, 1)}
                        className="px-3 py-1 border-l hover:bg-gray-50"
                      >
                        +
                      </button>
                    </div>
                  </td>
                  <td className="py-4">
                    ₹{(item.price * item.quantity).toFixed(2)}
                  </td>
                  <td className="py-4">
                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-gray-500 hover:text-red-500"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Coupon Section */}
          <div className="mt-8 flex gap-4">
            <input
              type="text"
              placeholder="Coupon code"
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value)}
              className="px-4 py-2 border rounded-md flex-grow"
            />
            <button
              onClick={applyCoupon}
              className="bg-[#2F4858] text-white px-6 py-2 rounded-md hover:bg-[#1a2830] transition-colors"
            >
              Apply coupon
            </button>
          </div>
        </div>

        {/* Cart Totals */}
        <div
          className="lg:w-1/3"
          style={{ backgroundColor: "#e3e4e6", borderRadius: "12px" }}
        >
          <div className="border rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Cart totals</h2>

            <div className="space-y-4">
              <div className="flex justify-between pb-4 border-b">
                <span>Subtotal</span>
                <span>₹{subtotal.toFixed(2)}</span>
              </div>

              <div className="pb-4 border-b">
                <div className="flex justify-between mb-2">
                  <span>Shipping</span>
                  <span>Free shipping</span>
                </div>
                {/* <div className="text-sm text-gray-600">
                  Shipping to Madhya Pradesh.
                </div> */}
              </div>

              <div className="flex justify-between font-semibold">
                <span>Total</span>
                <span>₹{total.toFixed(2)}</span>
              </div>

              <button
                onClick={HanadleProceedToCheckout}
                className="w-full bg-[#2F4858] text-white py-3 rounded-md hover:bg-[#1a2830] transition-colors mt-4"
              >
                Proceed to checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
