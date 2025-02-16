import React, { useEffect, useState } from "react";
import { Trash2 } from "lucide-react";
import toast from "react-hot-toast";
import Helpers from "../Helper/Helpers";
import Swal from "sweetalert2";

const OrderList = () => {
  const [orders, setOrders] = useState([]);
  const [filter, setFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState("all");

  useEffect(() => {
    FetchAllOrder();
  }, []); // Add an empty dependency array to prevent infinite fetching

  const FetchAllOrder = async () => {
    const res = await Helpers(`/user/order/get`, "GET");
    if (res && res?.status) {
      setOrders(res?.data);
    } else {
      toast?.error("Error to fetch data");
    }
  };

  const handleDeleteUser = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      const res = await Helpers(`/user/order/delete/${id}`, "DELETE", {});
      if (res && res?.status) {
        toast.success("Deleted Successfully");
        FetchAllOrder();
      } else {
        toast?.error("Deletion failed");
      }
    }
  };

  // Filter orders by payment method and date
  const filteredOrders = orders
    .filter((order) => (filter === "all" ? true : order.method === filter))
    .filter((order) => {
      if (dateFilter === "all") return true;
      const createdAt = new Date(order.createdAt);
      const today = new Date();
      const oneWeekAgo = new Date();
      oneWeekAgo.setDate(today.getDate() - 7);
      const twoWeeksAgo = new Date();
      twoWeeksAgo.setDate(today.getDate() - 14);
      const oneMonthAgo = new Date();
      oneMonthAgo.setMonth(today.getMonth() - 1);

      switch (dateFilter) {
        case "today":
          return (
            createdAt.toISOString().split("T")[0] ===
            today.toISOString().split("T")[0]
          );
        case "yesterday":
          const yesterday = new Date(today);
          yesterday.setDate(today.getDate() - 1);
          return (
            createdAt.toISOString().split("T")[0] ===
            yesterday.toISOString().split("T")[0]
          );
        case "one-week":
          return createdAt >= oneWeekAgo && createdAt < today;
        case "two-weeks":
          return createdAt >= twoWeeksAgo && createdAt < oneWeekAgo;
        case "one-month":
          return createdAt >= oneMonthAgo;
        default:
          return true;
      }
    });

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Order List</h1>

      {/* Filters Section */}
      <div className="flex flex-wrap justify-between items-center mb-6">
        <div className="w-full md:w-1/2 lg:w-1/3 mb-4 md:mb-0">
          <label
            htmlFor="filter"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Filter by payment method:
          </label>
          <select
            id="filter"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="all">All Orders</option>
            <option value="cash">Cash</option>
            <option value="online">Online</option>
          </select>
        </div>
        <div className="w-full md:w-1/2 lg:w-1/3">
          <label
            htmlFor="date-filter"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Filter by date:
          </label>
          <select
            id="date-filter"
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
            className="block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="all">All Dates</option>
            <option value="today">Today</option>
            <option value="yesterday">Yesterday</option>
            <option value="one-week">Last 1 Week</option>
            <option value="two-weeks">Last 2 Weeks</option>
            <option value="one-month">Last 1 Month</option>
          </select>
        </div>
      </div>

      {/* Order List */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredOrders?.length > 0 ? (
          filteredOrders.map((order) => (
            <div
              key={order._id}
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              {/* <div className="relative pb-2/3">
                <img
                  src={order?.product?.image}
                  alt={order.product.title}
                  className="h-40 w-40 object-cover"
                />
              </div> */}
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <h2 className="text-xl font-semibold">
                    {order.product.title}
                  </h2>
                  <button
                    onClick={() => handleDeleteUser(order._id)}
                    className="text-red-500 hover:text-red-700"
                    aria-label="Delete order"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
                <p className="text-gray-600 mb-2">{order.product.category}</p>
                <p className="text-gray-800 mb-4">
                  {order.product.description}
                </p>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-lg font-bold">
                    ₹{order?.product?.price}
                  </span>
                  <span className="text-sm text-gray-500 line-through">
                    ₹{order.product.originalPrice}
                  </span>
                </div>
                <p className="text-sm text-gray-600">
                  <span className="font-semibold">Quantity:</span>{" "}
                  {Math.round(order?.quantity)}
                </p>
                <p className="text-sm text-gray-600">
                  <span className="font-semibold">Total:</span> {order?.total}
                </p>
                <div className="border-t pt-4">
                  <p className="text-sm text-gray-600">
                    <span className="font-semibold">Customer:</span>{" "}
                    {order.userDetails.firstName} {order.userDetails.lastName}
                  </p>
                  <p className="text-sm text-gray-600">
                    <span className="font-semibold">Company:</span>{" "}
                    {order.userDetails.companyName}
                  </p>
                  <p className="text-sm text-gray-600">
                    <span className="font-semibold">Phone No:</span>{" "}
                    {order.userDetails.phone}
                  </p>
                  <p className="text-sm text-gray-600">
                    <span className="font-semibold">Email:</span>{" "}
                    {order.userDetails.email}
                  </p>
                  <br />
                  <p className="text-sm text-gray-600">
                    <span className="font-semibold">Payment Method:</span>{" "}
                    {order.method === "cash" ? "Cash" : "Online"}
                  </p>

                  <p
                    style={{
                      padding: "5px",
                      backgroundColor: "green",
                      color: "white",
                    }}
                  >
                    {new Date(order?.createdAt).toISOString().split("T")[0]}
                  </p>
                </div>
              </div>
              <div className="bg-gray-100 px-6 py-4">
                <p className="text-sm text-gray-600">
                  <span className="font-semibold">Address:</span>{" "}
                  {order.userDetails.streetAddress}, {order.userDetails.city},{" "}
                  {order.userDetails.state}, {order.userDetails.pinCode}
                </p>
              </div>
            </div>
          ))
        ) : (
          <p style={{ color: "black", margin: "22px" }}> No data available.</p>
        )}
      </div>
    </div>
  );
};

export default OrderList;
