// const BASE_URL = "http://13.201.122.206:8001/api";
// const BASE_URL = "http://localhost:8001/api";
const BASE_URL = "https://api.ruzanglobal.com/api";

async function Helpers(url, method = "GET", data = null, headers = {}) {
  const token = localStorage.getItem("token");
  const authHeader = token ? `Bearer ${token}` : null;

  try {
    const options = {
      method: method,
      headers: {
        "Content-Type": "application/json",
        ...(authHeader && { Authorization: authHeader }), // Ensure Bearer format
        ...headers,
      },
      body: data ? JSON.stringify(data) : null,
    };

    const response = await fetch(BASE_URL + url, options);
    const responseData = await response.json();
    return responseData;
    // console.log(responseData);
  } catch (error) {
    console.error("Request failed:", error);
    throw error;
  }
}

export default Helpers;

// const BASE_URL = "http://localhost:8000/api";

// async function Helpers(url, method = "GET", data = null, headers = {}) {
//   const token = localStorage.getItem("token");
//   const authHeader = token ? `Bearer ${token}` : null;

//   try {
//     const options = {
//       method: method,
//       headers: {
//         "Content-Type": "application/json",
//         ...(authHeader && { Authorization: authHeader }),
//         ...headers,
//       },
//       body: data ? JSON.stringify(data) : null,
//       credentials: "include", // Ensures cookies and credentials are sent with requests
//     };

//     const response = await fetch(BASE_URL + url, options);

//     if (!response.ok) {
//       const errorText = await response.text();
//       throw new Error(
//         `Request failed with status ${response.status}: ${errorText}`
//       );
//     }

//     const responseData = await response.json();
//     return responseData;
//   } catch (error) {
//     console.error("Request failed:", error.message);
//     throw error;
//   }
// }

// export default Helpers;
