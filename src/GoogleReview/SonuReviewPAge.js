import React, { useState } from "react";

const SonuReviewPAge = () => {
  const [selectedRating, setSelectedRating] = useState("");
  const [showModal, setShowModal] = useState(false);

  const handleStarClick = (value) => {
    setSelectedRating(value);
    if (value >= 4) {
      window.location.href = "https://g.page/r/CWjJvsD4nUDAEBI/review";
    }
  };

  const handleCancel = () => {
    if (window.confirm("Are you sure you want to cancel your review?")) {
      window.location.reload();
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const name = event.target.name.value;
    const contact = event.target.contact.value;
    const thoughts = event.target.thoughts.value;

    const data = {
      name,
      number: contact,
      description: thoughts,
      numberofstar: selectedRating,
      registeredBy: "6721326767bb91b12c339c63",
    };

    fetch("http://localhost:8000/api/user/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((responseData) => {
        if (
          responseData.status === false &&
          responseData.msg === "User already exists"
        ) {
          alert("You have already submitted a review.");
        } else {
          setShowModal(true);
        }
      });
  };

  const closeModal = () => {
    setShowModal(false);
    window.location.reload();
  };

  return (
    <div
      style={{
        fontFamily: "Arial, sans-serif",
        backgroundColor: "#f4f4f4",
        textAlign: "center",
        padding: "50px",
        margin: "0",
      }}
    >
      <div
        style={{
          backgroundColor: "white",
          borderRadius: "10px",
          padding: "20px",
          maxWidth: "500px",
          margin: "0 auto",
          boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
        }}
      >
        <h1 style={{ fontSize: "24px", color: "#333" }}>SONU GLOBAL</h1>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            margin: "20px 0",
            fontSize: "40px",
          }}
        >
          {[1, 2, 3, 4, 5].map((star) => (
            <span
              key={star}
              className={selectedRating >= star ? "filled" : ""}
              style={{
                margin: "0px 6px",
                cursor: "pointer",
                color: selectedRating >= star ? "#ffd700" : "#999a9c",
              }}
              onClick={() => handleStarClick(star)}
            >
              {selectedRating >= star ? "★" : "☆"}
            </span>
          ))}
        </div>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            required
            style={{
              width: "90%",
              padding: "10px",
              margin: "10px -12px",
              border: "1px solid #ccc",
              borderRadius: "5px",
              fontFamily: "Roboto, Arial, sans-serif",
              fontSize: "1rem",
            }}
          />
          <input
            type="tel"
            name="contact"
            placeholder="Your Contact Number"
            required
            maxLength="10"
            pattern="\d{10}"
            onInput={(e) =>
              (e.target.value = e.target.value
                .replace(/[^0-9]/g, "")
                .slice(0, 10))
            }
            style={{
              width: "90%",
              padding: "10px",
              margin: "10px -12px",
              border: "1px solid #ccc",
              borderRadius: "5px",
              fontFamily: "Roboto, Arial, sans-serif",
              fontSize: "1rem",
            }}
          />
          <textarea
            name="thoughts"
            placeholder="Share details of your own experience at this place"
            required
            style={{
              width: "90%",
              padding: "10px",
              margin: "10px -12px",
              border: "1px solid #ccc",
              borderRadius: "5px",
              height: "100px",
              fontFamily: "Roboto, Arial, sans-serif",
              fontSize: "1rem",
            }}
          />
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              gap: "10px",
              marginTop: "20px",
            }}
          >
            <button
              type="button"
              onClick={handleCancel}
              style={{
                padding: "10px 20px",
                borderRadius: "5px",
                backgroundColor: "white",
                color: "#1a73e8",
                border: "0.7px solid #7d7d7c",
                fontFamily: '"Google Sans", Roboto, Arial, sans-serif',
                fontSize: "0.875rem",
                fontWeight: "500",
              }}
            >
              Cancel
            </button>
            <button
              type="submit"
              style={{
                padding: "10px 20px",
                borderRadius: "5px",
                backgroundColor: "#1a73e8",
                color: "white",
                border: "1px solid #1a73e8",
                fontFamily: '"Google Sans", Roboto, Arial, sans-serif',
                fontSize: "0.875rem",
                fontWeight: "500",
              }}
            >
              Post
            </button>
          </div>
        </form>

        {showModal && (
          <div
            style={{
              display: "block",
              position: "fixed",
              zIndex: "1000",
              left: "0",
              top: "0",
              width: "100%",
              height: "100%",
              backgroundColor: "rgba(0, 0, 0, 0.5)",
            }}
          >
            <div
              style={{
                backgroundColor: "#007bff",
                color: "white",
                margin: "15% auto",
                padding: "20px",
                borderRadius: "8px",
                width: "80%",
                textAlign: "center",
              }}
            >
              <div style={{ fontSize: "60px", marginBottom: "20px" }}>✔</div>
              <h2 style={{ fontSize: "24px", marginBottom: "10px" }}>
                Review posted, thank you!
              </h2>
              <p style={{ fontSize: "16px", marginBottom: "20px" }}>
                Your contribution helps others make more informed decisions
                about the places that they visit.
              </p>
              <button
                onClick={closeModal}
                style={{
                  padding: "10px 20px",
                  backgroundColor: "white",
                  color: "#007bff",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                  fontSize: "16px",
                }}
              >
                Done
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SonuReviewPAge;
