import axios from "axios";

// Define the backend URL using environment variables
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || 'https://myportfolio-y9w4.onrender.com';

axios.defaults.withCredentials = true;
// handling posts requests
export const handlePostRequests = async (url, data) => {
  const urlRequest = `${BACKEND_URL}/${url}`;

  return await axios.post(urlRequest, data)
    .then(response => {
        return response;
    })
    .catch(error => {
        return error;
    });
};

export const handleMultiPartPostRequest = async (url, formData) => {
    const urlRequest = `${BACKEND_URL}/${url}`;

    try {
      const response = await axios.post(urlRequest, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      return response.data; // Return response data if successful
    } catch (error) {
      throw error; // Throw error if request fails
    }
  };

// handleget requests
export const handleGetRequests = async (url) => {
    const urlRequest = `${BACKEND_URL}/${url}`;

    return await axios.get(urlRequest)
    .then(response => response)
    .catch(error => error);
}

// deleting items
export const handleDeleteRequests = async (url) => {
    const urlRequest = `${BACKEND_URL}/${url}`;

    return await axios.delete(urlRequest)
    .then(response => response)
    .catch(error => error);
}

// updating data
export const handlePutRequests = async (url, data) => {
    const urlRequest = `${BACKEND_URL}/${url}`;

    return await axios.put(urlRequest, data)
    .then(response => response)
    .catch(error => error);
}