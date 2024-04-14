import axios from "axios";


axios.defaults.withCredentials = true;
// handling posts requests
export const handlePostRequests = async (url, data) => {
  const urlRequest = `http://localhost:3000/${url}`;

  return await axios.post(urlRequest, data)
    .then(response => {
        return response;
    })
    .catch(error => {
        return error;
    });
};

export const handleMultiPartPostRequest = async (url, formData) => {
    const urlRequest = `https://myportfolio-y9w4.onrender.com/${url}`;

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
    const urlRequest = `http://localhost:3000/${url}`;

    return await axios.get(urlRequest)
    .then(response => response)
    .catch(error => error);
}

// deleting items
export const handleDeleteRequests = async (url) => {
    const urlRequest = `http://localhost:3000/${url}`;

    return await axios.delete(urlRequest)
    .then(response => response)
    .catch(error => error);
}

// updating data
export const handlePutRequests = async (url, data) => {
    const urlRequest = `http://localhost:3000/${url}`;

    return await axios.put(urlRequest, data)
    .then(response => response)
    .catch(error => error);
}