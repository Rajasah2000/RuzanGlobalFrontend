import React, { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import Helpers from "../Helper/Helpers";
import Swal from "sweetalert2";
import moment from "moment";

const ContactLists = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [filter, setFilter] = useState("all");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    FetchAllReview();
  }, []);

  useEffect(() => {
    applyFilter();
  }, [filter, users]);

  const FetchAllReview = async () => {
    try {
      const res = await Helpers("/user/contact/get", "GET");
      if (res && res?.status) {
        setUsers(res?.data?.reverse());
      }
    } catch (error) {
      console.log(error);
    }
  };

  const applyFilter = () => {
    const today = moment().startOf("day");
    const filtered = users.filter((user) => {
      const userDate = moment(user.createdAt);
      switch (filter) {
        case "today":
          return userDate.isSame(today, "day");
        case "yesterday":
          return userDate.isSame(today.subtract(1, "day"), "day");
        case "oneWeek":
          return userDate.isAfter(today.subtract(6, "days"));
        case "twoWeeks":
          return userDate.isAfter(today.subtract(13, "days"));
        case "oneMonth":
          return userDate.isAfter(today.subtract(1, "month"));
        default:
          return true;
      }
    });
    setFilteredUsers(filtered);
  };

  const handleAddUser = async (e) => {
    e.preventDefault();
    if (name && email && password) {
      let data = { name, email, password };
      try {
        const res = await Helpers("/admin/register", "POST", data);
        if (res && res?.status) {
          toast.success("Register Successfully.");
          setName("");
          setEmail("");
          setPassword("");
          FetchAllReview();
        } else {
          toast.error("Failed to add admin user.");
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      toast?.error("All fields are required");
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
      const res = await Helpers(`/user/contact/delete/${id}`, "DELETE", {});
      if (res && res?.status) {
        toast.success("Deleted Successfully");
        FetchAllReview();
      } else {
        toast?.error("Deletion failed");
      }
    }
  };

  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 5;

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  const handleNextPage = () => {
    if (currentPage < Math.ceil(filteredUsers.length / usersPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="p-8" style={{ marginTop: "66px" }}>
      <h1 style={{ textAlign: "center" }} className="text-3xl font-bold mb-0">
        Inquiry Lists
      </h1>

      {/* Filter Dropdown */}
      <div className="mb-4">
        <select
          className="p-2 border rounded"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="all">All</option>
          <option value="today">Today</option>
          <option value="yesterday">Yesterday</option>
          <option value="oneWeek">Last 1 Week</option>
          <option value="twoWeeks">Last 2 Weeks</option>
          <option value="oneMonth">Last 1 Month</option>
        </select>
      </div>

      {/* Users Table */}
      <div className="bg-white shadow-md rounded-lg p-6">
        <div className="overflow-x-auto">
          <table className="w-full table-auto min-w-[600px]">
            <thead>
              <tr className="bg-gray-200 text-left">
                <th className="p-4">ID</th>
                <th className="p-4">Name</th>
                <th className="p-4">Email</th>
                <th className="p-4">Phone</th>
                <th className="p-4">Message</th>
                <th className="p-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentUsers.map((user, index) => (
                <tr key={user.id}>
                  <td className="p-4">{indexOfFirstUser + index + 1}</td>
                  <td className="p-4">{user.name}</td>
                  <td className="p-4">{user.email}</td>
                  <td className="p-4">{user.phone}</td>
                  <td className="p-4">{user.message}</td>

                  <td className="p-4 flex gap-2">
                    <button
                      onClick={() => handleDeleteUser(user._id)}
                      className="bg-red-500 text-white p-2 rounded"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination controls */}
        <div className="flex justify-between items-center mt-4">
          <button
            onClick={handlePrevPage}
            disabled={currentPage === 1}
            className="bg-blue-500 text-white p-2 rounded disabled:bg-gray-300"
          >
            Previous
          </button>
          <span>
            Page {currentPage} of{" "}
            {Math.ceil(filteredUsers.length / usersPerPage)}
          </span>
          <button
            onClick={handleNextPage}
            disabled={
              currentPage >= Math.ceil(filteredUsers.length / usersPerPage)
            }
            className="bg-blue-500 text-white p-2 rounded disabled:bg-gray-300"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default ContactLists;
