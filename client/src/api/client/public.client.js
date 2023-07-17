import axios from "axios";
import queryString from "query-string";

// Define a baseURL variable to store the address of the API server.
const baseURL = "http://127.0.0.1:5000/api/v1";

// Create an instance of the HTTP client.
const publicClient = axios.create({
  baseURL,
  paramsSerializer: {
    // Takes an object of parameters and returns a serialized version of those parameters as a string.
    encode: (params) => queryString.stringify(params),
  },
});

// Add an interceptor to the process of handling requests before they are sent.
publicClient.interceptors.request.use(async (config) => {
  return {
    ...config,
    headers: {
      "Content-Type": "application/json", // Specifies the data type of the HTTP request.
    },
  };
});

// Add an interceptor to the process of handling responses after they are received.
publicClient.interceptors.response.use(
  // Called if the response is successful.
  (response) => {
    if (response && response.data) return response.data;
    return response;
  },

  // Called if there is an error.
  (err) => {
    throw err.response.data;
  }
);

export default publicClient;
