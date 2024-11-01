import React, { useEffect, useState } from "react";
import Helpers from "../Helper/Helpers";

const Dashboard = () => {
  // Dummy data for now, you can replace this with data fetched from your backend
  const [totalProducts, setTotalProducts] = useState(0);

  const [totalUsers, setTotalUsers] = useState(0);

  useEffect(() => {
    // You would replace these with actual API calls to your backend
    setTotalProducts(120); // Fetch total products

    setTotalUsers(250); // Fetch total users
  }, []);

  // Helper function to format numbers as rupees

  const [allData, setAllReviewData] = useState([]);

  useEffect(() => {
    FetchAllReview();
  }, []);

  const FetchAllReview = async () => {
    try {
      const res = await Helpers("/admin/getalluser", "GET");
      if (res && res?.status) {
        setAllReviewData(res?.data);
      } else {
      }
    } catch (error) {
      console.log(error);
    }
  };

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentData = allData.slice(indexOfFirstItem, indexOfLastItem);

  const nextPage = () => {
    if (currentPage < Math.ceil(allData.length / itemsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>

      {/* Dashboard Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
        {/* Total Products */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-2">
            Total Number of Reviews
          </h2>
          <p className="text-3xl">{totalProducts}</p>
        </div>

        {/* Total Users */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-2">Total Number of Users </h2>
          <p className="text-3xl">{totalUsers}</p>
        </div>
      </div>

      {/* Recent Orders */}
      <div className="mt-10">
        <h2 className="text-2xl font-semibold mb-4">Recent Reviews</h2>
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
                  </tr>
                </thead>
                <tbody>
                  {currentData.slice(0, 10).map((item, index) => (
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
                                      fontSize: "24px" /* Adjust star size */,
                                      color:
                                        "gold" /* Gold color for the stars */,
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
                    </tr>
                  ))}
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
      </div>
    </div>
  );
};

export default Dashboard;
