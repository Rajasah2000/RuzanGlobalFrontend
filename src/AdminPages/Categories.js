import React, { useState, useEffect } from "react";
import Helpers from "../Helper/Helpers";
import { ModalComponent } from "./ModalComponent";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
const Categories = () => {
  const [allData, setAllReviewData] = useState([]);
  const [newCategory, setNewCategory] = useState("");

  const [Wholedata, setWholeDdata] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  // Dummy data to simulate initial categories
  useEffect(() => {
    FetchAllReview();
  }, []);

  const FetchAllReview = async () => {
    try {
      const res = await Helpers("/admin/getalluser", "GET");
      if (res && res?.status) {
        setAllReviewData(res?.data?.reverse());
        console.log("fdfdfdfdfd", res?.data);
      } else {
      }
    } catch (error) {
      console.log(error);
    }
  };

  // const allData = [
  //   {
  //     id: 1,
  //     customer: "John Doe",
  //     star: 5,
  //     mobile: "1234567890",
  //     comment: "Excellent",
  //   },
  //   {
  //     id: 2,
  //     customer: "Jane Smith",
  //     star: 4,
  //     mobile: "9876543210",
  //     comment: "Good service",
  //   },
  //   {
  //     id: 3,
  //     customer: "Tom Brown",
  //     star: 3,
  //     mobile: "1112223333",
  //     comment: "Average",
  //   },
  //   {
  //     id: 4,
  //     customer: "Jerry White",
  //     star: 2,
  //     mobile: "4445556666",
  //     comment: "Not great",
  //   },
  //   {
  //     id: 5,
  //     customer: "Nancy Blue",
  //     star: 5,
  //     mobile: "9998887777",
  //     comment: "Amazing experience",
  //   },
  //   {
  //     id: 6,
  //     customer: "Harry Green",
  //     star: 4,
  //     mobile: "6667778888",
  //     comment: "Very good",
  //   },
  //   {
  //     id: 7,
  //     customer: "Lisa Purple",
  //     star: 3,
  //     mobile: "5554443333",
  //     comment: "It was okay",
  //   },
  //   {
  //     id: 8,
  //     customer: "Paul Black",
  //     star: 5,
  //     mobile: "2221110000",
  //     comment: "Outstanding",
  //   },
  //   {
  //     id: 9,
  //     customer: "Olivia Red",
  //     star: 2,
  //     mobile: "9990001111",
  //     comment: "Could be better",
  //   },
  //   {
  //     id: 10,
  //     customer: "Jake Yellow",
  //     star: 4,
  //     mobile: "8887776666",
  //     comment: "Satisfied",
  //   },
  // ];

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const [currentData, setCurrentData] = useState(
    allData.slice(indexOfFirstItem, indexOfLastItem)
  );

  const [filterValue, setFilterValue] = useState("all");
  // const currentData = allData.slice(indexOfFirstItem, indexOfLastItem);

  // Filter data based on the selected date filter
  useEffect(() => {
    const filteredData = allData.filter((item) => {
      const itemDate = new Date(item.createdAt);
      const today = new Date();

      switch (filterValue) {
        case "today":
          return itemDate.toDateString() === today.toDateString();
        case "yesterday":
          const yesterday = new Date(today);
          yesterday.setDate(today.getDate() - 1);
          return itemDate.toDateString() === yesterday.toDateString();
        case "week":
          const oneWeekAgo = new Date(today);
          oneWeekAgo.setDate(today.getDate() - 7);
          return itemDate >= oneWeekAgo && itemDate <= today;
        case "month":
          const oneMonthAgo = new Date(today);
          oneMonthAgo.setMonth(today.getMonth() - 1);
          return itemDate >= oneMonthAgo && itemDate <= today;
        case "three month":
          const threeMonthsAgo = new Date(today);
          threeMonthsAgo.setMonth(today.getMonth() - 3); // Adjusting to three months ago
          return itemDate >= threeMonthsAgo && itemDate <= today;
        default:
          return true;
      }
    });

    // Set paginated data based on filter
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    setCurrentData(filteredData.slice(start, end));
  }, [filterValue, currentPage, allData, itemsPerPage]);

  const prevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const nextPage = () => {
    setCurrentPage((prev) =>
      Math.min(prev + 1, Math.ceil(allData.length / itemsPerPage))
    );
  };

  const handleFilterChange = (e) => {
    setFilterValue(e.target.value);
    setCurrentPage(1); // Reset to page 1 on filter change
  };

  const onDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      const res = await Helpers(`/admin/deleteadmin/${id}`, "DELETE");
      if (res && res?.status) {
        toast?.success("Deleted Successfully");
        FetchAllReview();
      } else {
        toast?.error("Deletion failed");
      }
    }
  };

  const onEdit = (item) => {
    setWholeDdata(item);
    setIsModalOpen(true);

    //  navigate('/edit-blog', { state: item });
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8">All Bad Reviews Management</h1>
      {/* Filter Dropdown */}
      <div className="mb-1" style={{ width: "100%", paddingLeft: "50px" }}>
        <label style={{ fontSize: "20px" }} className="font-semibold mr-2">
          Filter by Date :
        </label>
        <select
          className="p-2 border border-gray-300 rounded-md"
          value={filterValue}
          onChange={handleFilterChange}
          style={{ width: "100%", maxWidth: "200px" }}
        >
          <option value="all">All</option>
          <option value="today">Today</option>
          <option value="yesterday">Yesterday</option>
          <option value="week">This Week</option>
          <option value="month">This Month</option>
          <option value="three month">Three Month</option>
        </select>
      </div>
      {/* Categories List */}
      <div className="bg-white shadow-md rounded-lg p-6">
        <div style={{ width: "100%", padding: "20px" }}>
          <div style={{ overflowX: "auto" }}>
            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
                minWidth: "600px",
              }}
            >
              <thead>
                <tr style={{ backgroundColor: "#f0f0f0", textAlign: "left" }}>
                  <th style={{ padding: "10px", border: "1px solid #ddd" }}>
                    ID
                  </th>
                  <th style={{ padding: "10px", border: "1px solid #ddd" }}>
                    Customer
                  </th>
                  <th style={{ padding: "10px", border: "1px solid #ddd" }}>
                    Date
                  </th>
                  <th style={{ padding: "10px", border: "1px solid #ddd" }}>
                    Number_of_star
                  </th>
                  <th style={{ padding: "10px", border: "1px solid #ddd" }}>
                    Mobile Number
                  </th>
                  <th style={{ padding: "10px", border: "1px solid #ddd" }}>
                    Comment
                  </th>
                  <th style={{ padding: "10px", border: "1px solid #ddd" }}>
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {currentData.length > 0 ? (
                  currentData.map((item, index) => (
                    <tr key={index + 1}>
                      <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                        {index + 1}
                      </td>
                      <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                        {item.name}
                      </td>
                      <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                        {new Date(item.createdAt).toISOString().split("T")[0]}
                      </td>
                      <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                        <div
                          style={{ display: "flex", flexDirection: "coloum" }}
                        >
                          {[...Array(Number(item?.numberofstar))].map(
                            (_, index) => {
                              return (
                                <div class="star-ratingsdd" key={index}>
                                  <span
                                    class="star"
                                    style={{
                                      fontSize: "24px",
                                      color: "gold",
                                      padding: "0 5px",
                                    }}
                                    data-value={index + 1}
                                  >
                                    &#9733;
                                  </span>
                                </div>
                              );
                            }
                          )}
                        </div>
                      </td>
                      <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                        {item.number}
                      </td>
                      <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                        {item?.description.length > 20
                          ? item?.description.slice(0, 20) + "..."
                          : item?.description}
                      </td>
                      <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                        <div
                          style={{ display: "flex", flexDirection: "coloum" }}
                        >
                          <svg
                            onClick={() => onEdit(item)}
                            style={{
                              height: "24px",
                              width: "24px",
                              cursor: "pointer",
                              color: "green",
                              marginLeft: "5px",
                            }}
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            className="bi bi-eye"
                            viewBox="0 0 16 16"
                          >
                            <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zm-8 4a4 4 0 1 1 0-8 4 4 0 0 1 0 8z" />
                            <path d="M8 5a3 3 0 1 0 0 6 3 3 0 0 0 0-6z" />
                          </svg>
                          <svg
                            onClick={() => onDelete(item?._id)}
                            style={{
                              color: "red",
                              height: "20px",
                              cursor: "pointer",
                              width: "20px",
                              marginLeft: "25px",
                            }}
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            class="bi bi-trash3"
                            viewBox="0 0 16 16"
                          >
                            <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2.5 2.5 0 0 0 5.38 16h5.24a2.5 2.5 0 0 0 2.488-2.84L14.96 3.5h.54a.5.5 0 0 0 0-1h-.996a.59.59 0 0 0-.01 0H11Zm3.07 1H1.93l.84 10.47a1.5 1.5 0 0 0 1.493 1.367h5.34a1.5 1.5 0 0 0 1.493-1.367L14.07 3.5ZM3.5 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5Zm8 .5a.5.5 0 0 0-1 0v7a.5.5 0 0 0 1 0v-7ZM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5Z" />
                          </svg>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="7"
                      style={{ textAlign: "center", padding: "20px" }}
                    >
                      No data found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination Controls */}
          <div
            style={{
              marginTop: "20px",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <button
              onClick={prevPage}
              disabled={currentPage === 1}
              style={{
                padding: "10px 20px",
                backgroundColor: currentPage === 1 ? "#ccc" : "#007bff",
                color: "#fff",
                border: "none",
                cursor: currentPage === 1 ? "not-allowed" : "pointer",
                borderRadius: "5px",
              }}
            >
              Previous
            </button>
            <button
              onClick={nextPage}
              disabled={
                currentPage === Math.ceil(allData.length / itemsPerPage)
              }
              style={{
                padding: "10px 20px",
                backgroundColor:
                  currentPage === Math.ceil(allData.length / itemsPerPage)
                    ? "#ccc"
                    : "#007bff",
                color: "#fff",
                border: "none",
                cursor:
                  currentPage === Math.ceil(allData.length / itemsPerPage)
                    ? "not-allowed"
                    : "pointer",
                borderRadius: "5px",
              }}
            >
              Next
            </button>
          </div>
        </div>
      </div>
      <ModalComponent
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        userData={Wholedata}
        FetchAllReview={FetchAllReview}
      />
    </div>
  );
};

export default Categories;
