// const BASE_URL = "http://localhost:8000/api";

// async function Helpers(url, method = "GET", data = null, headers = {}) {
//   const token = localStorage.getItem("token");
//   const authHeader = token ? `Bearer ${token}` : null;

//   try {
//     const options = {
//       method: method,
//       headers: {
//         "Content-Type": "application/json",
//         ...(authHeader && { Authorization: authHeader }), // Ensure Bearer format
//         ...headers,
//       },
//       body: data ? JSON.stringify(data) : null,
//     };

//     const response = await fetch(BASE_URL + url, options);
//     const responseData = await response.json();
//     return responseData;
//     // console.log(responseData);
//   } catch (error) {
//     console.error("Request failed:", error);
//     throw error;
//   }
// }

// export default Helpers;

const BASE_URL = "http://localhost:8000/api";

async function Helpers(url, method = "GET", data = null, headers = {}) {
  const token = localStorage.getItem("token");
  const authHeader = token ? `Bearer ${token}` : null;

  try {
    const options = {
      method: method,
      headers: {
        "Content-Type": "application/json",
        ...(authHeader && { Authorization: authHeader }), // Include auth header if token exists
        ...headers,
      },
      body: data ? JSON.stringify(data) : null,
      credentials: "include", // Ensures cookies are sent with requests
    };

    const response = await fetch(BASE_URL + url, options);

    // Check if the response status is OK (200-299)
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `Request failed with status ${response.status}: ${errorText}`
      );
    }

    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.error("Request failed:", error.message);
    throw error; // Throw error so it can be handled by the calling function
  }
}

export default Helpers;
