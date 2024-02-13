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