import React, { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import Helpers from "../Helper/Helpers";
import Swal from "sweetalert2";
const Users = () => {
  const [users, setUsers] = useState([]);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    FetchAllReview();
  }, []);

  const FetchAllReview = async () => {
    try {
      const res = await Helpers("/admin/allregisteruser", "GET");
      if (res && res?.status) {
        setUsers(res?.data?.reverse());
        // console.log("fdfdfdfdfd", res?.data);
      } else {
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddUser = async (e) => {
    e.preventDefault();
    if (name && email && password) {
      let data = {
        name: name,
        email: email,
        password: password,
      };
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
      const res = await Helpers(
        `/admin/deleteadminaccount/${id}`,
        "DELETE",
        {}
      );
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

  // Calculate the indexes for slicing the users array
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  // Pagination control functions
  const handleNextPage = () => {
    if (currentPage < Math.ceil(users.length / usersPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleBlockUser = async (id) => {
    let data = {
      adminId: id,
      action: "block",
    };
    const res = await Helpers(`/admin/togglestatus/${id}`, "POST", data);
    if (res && res?.status) {
      toast.success("Blocked Successfully");
      FetchAllReview();
    } else {
      toast?.error("Failed to blocked");
    }
  };

  const handleUnblockeUser = async (id) => {
    let data = {
      adminId: id,
      action: "unblock",
    };
    const res = await Helpers(`/admin/togglestatus/${id}`, "POST", data);
    if (res && res?.status) {
      toast.success("UnBlocked Successfully");
      FetchAllReview();
    } else {
      toast?.error("Failed to blocked");
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8">User Management</h1>

      <div className="mb-8 flex flex-col items-center">
        {" "}
        {/* Centering content horizontally */}
        <h2 className="text-xl font-semibold mb-9">Add New User</h2>{" "}
        {/* Added margin for spacing */}
        <div className="flex flex-wrap gap-4 md:gap-8 lg:gap-14">
          {/* Input fields */}
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border p-2 rounded w-full md:w-64 lg:w-72"
            style={{ border: "1px solid gray" }}
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border p-2 rounded w-full md:w-64 lg:w-72"
            style={{ border: "1px solid gray" }}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border p-2 rounded w-full md:w-64 lg:w-72"
            style={{ border: "1px solid gray" }}
          />
          <button
            onClick={handleAddUser}
            className="bg-blue-500 text-white p-2 rounded w-full md:w-auto"
          >
            Add User
          </button>
        </div>
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
                <th className="p-4">Duration</th>
                <th className="p-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentUsers.map((user, index) => (
                <tr key={user.id}>
                  <td className="p-4">{indexOfFirstUser + index + 1}</td>
                  <td className="p-4">{user.name}</td>
                  <td className="p-4">{user.email}</td>
                  <td className="p-4">
                    {" "}
                    {
                      new Date(user.createdAt).toISOString().split("T")[0]
                    } {} - {}
                    {}
                    {
                      new Date(
                        new Date(user.createdAt).setFullYear(
                          new Date(user.createdAt).getFullYear() + 1
                        )
                      )
                        .toISOString()
                        .split("T")[0]
                    }
                  </td>
                  <td className="p-4 flex gap-2">
                    {user?.status === "active" ? (
                      <button
                        onClick={() => handleBlockUser(user._id)}
                        className="bg-blue-500 text-white p-2 rounded"
                      >
                        Block
                      </button>
                    ) : (
                      <button
                        onClick={() => handleUnblockeUser(user._id)}
                        className="bg-green-500 text-white p-2 rounded"
                      >
                        UnBlock
                      </button>
                    )}

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
            Page {currentPage} of {Math.ceil(users.length / usersPerPage)}
          </span>
          <button
            onClick={handleNextPage}
            disabled={currentPage >= Math.ceil(users.length / usersPerPage)}
            className="bg-blue-500 text-white p-2 rounded disabled:bg-gray-300"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Users;
