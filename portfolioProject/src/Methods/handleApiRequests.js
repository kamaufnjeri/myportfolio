import axios from "axios";

// Define the backend URL using environment variables
const BACKEND_URL =
  import.meta.env.VITE_REACT_APP_BACKEND_URL ||
  "https://myportfolio-y9w4.onrender.com";

// Optional default headers (including Authorization with JWT token if available)
axios.defaults.headers.common = {
  Authorization: localStorage.getItem("jwtToken") ? `Bearer ${localStorage.getItem("jwtToken")}` : "",
};

// handling posts requests
export const handlePostRequests = async (url, data, token = null) => {
  const urlRequest = `${BACKEND_URL}/${url}`;

  const headers = token
    ? { ...axios.defaults.headers.common, Authorization: `Bearer ${token}` }
    : axios.defaults.headers.common;

  return await axios
    .post(urlRequest, data, { headers })
    .then((response) => response)
    .catch((error) => error);
};

export const handleMultiPartPostRequest = async (url, formData, token = null) => {
  const urlRequest = `${BACKEND_URL}/${url}`;

  const headers = token
    ? { ...axios.defaults.headers.common, Authorization: `Bearer ${token}` }
    : axios.defaults.headers.common;

  try {
    const response = await axios.post(urlRequest, formData, { headers });
    return response.data; // Return response data if successful
  } catch (error) {
    throw error; // Throw error if request fails
  }
};

// handleget requests
export const handleGetRequests = async (url, token = null) => {
  const urlRequest = `${BACKEND_URL}/${url}`;

  const headers = token
    ? { ...axios.defaults.headers.common, Authorization: `Bearer ${token}` }
    : axios.defaults.headers.common;

  return await axios
    .get(urlRequest, { headers })
    .then((response) => response)
    .catch((error) => error);
};

// deleting items
export const handleDeleteRequests = async (url, token = null) => {
  const urlRequest = `${BACKEND_URL}/${url}`;

  const headers = token
    ? { ...axios.defaults.headers.common, Authorization: `Bearer ${token}` }
    : axios.defaults.headers.common;

  return await axios
    .delete(urlRequest, { headers })
    .then((response) => response)
    .catch((error) => error);
};

// updating data
export const handlePutRequests = async (url, data, token = null) => {
  const urlRequest = `${BACKEND_URL}/${url}`;

  const headers = token
    ? { ...axios.defaults.headers.common, Authorization: `Bearer ${token}` }
    : axios.defaults.headers.common;

  return await axios
    .put(urlRequest, data, { headers })
    .then((response) => response)
    .catch((error) => error);
};
