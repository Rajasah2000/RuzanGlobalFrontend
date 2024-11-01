import React, { useState } from "react";
import Swal from "sweetalert2";
import Helpers from "../Helper/Helpers";
import toast from "react-hot-toast";
export const ModalComponent = ({
  isOpen,
  onClose,
  userData,
  FetchAllReview,
}) => {
  console.log("kkhhjhjhj", userData);

  if (!isOpen) return null; // If modal is not open, return null
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
        onClose();
        FetchAllReview();
      } else {
        toast?.error("Deletion failed");
      }
    }
  };

  return (
    <div
      style={{
        position: "fixed",
        top: "25px",
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden", // Prevent body scroll when modal is open
      }}
    >
      <div
        style={{
          backgroundColor: "#fff",
          borderRadius: "8px",
          padding: "20px",
          width: "90%",
          maxWidth: "500px",
          maxHeight: "80%", // Set a max-height for the modal
          boxShadow: "0 5px 15px rgba(0, 0, 0, 0.3)",
          overflowY: "auto", // Enable scrolling for content overflow
        }}
      >
        {/* Modal Header */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderBottom: "1px solid #ccc",
            paddingBottom: "10px",
            marginBottom: "20px",
          }}
        >
          <h1 style={{ fontSize: "22px", fontWeight: 600 }}>Reviews Details</h1>
          <button
            onClick={onClose}
            style={{
              fontSize: "40px",
              background: "none",
              border: "none",
              cursor: "pointer",
              color: "red",
            }}
          >
            ×
          </button>
        </div>

        {/* Modal Body */}
        <div style={{ lineHeight: "1.6" }}>
          <p style={{ marginTop: "6px" }}>
            <strong>Date : </strong>
            {new Date(userData.createdAt).toISOString().split("T")[0]}
          </p>
          <p>
            <strong>Name:</strong> {userData.name}
          </p>
          <p>
            <strong>
              {/* Star : */}
              <div style={{ display: "flex", flexDirection: "coloum" }}>
                {[...Array(Number(userData?.numberofstar))].map((_, index) => {
                  return (
                    <div class="star-ratingsdd" key={index}>
                      <span
                        class="star"
                        style={{
                          fontSize: "33px" /* Adjust star size */,
                          color: "gold" /* Gold color for the stars */,
                          padding: "0 5px",
                        }}
                        data-value={index + 1}
                      >
                        &#9733;
                      </span>
                    </div>
                  );
                })}
              </div>
            </strong>
          </p>

          <p>
            <strong>Phone Number:</strong> {userData.number}
          </p>
          <p>
            <strong>Description:</strong> {userData.description}
          </p>

          <div style={{ float: "right" }} title="Delete">
            <svg
              onClick={() => onDelete(userData?._id)}
              style={{
                color: "red",
                height: "25px",
                cursor: "pointer",
                width: "25px",
                marginLeft: "25px",
              }}
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-trash3"
              viewBox="0 0 16 16"
            >
              <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};
