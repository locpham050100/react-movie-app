import axios from "axios";

/**
 * Create a module that uses the axios library to send an HTTP GET request to a specific URL and return the received data from the response.
 * @param {*} url
 * @returns data
 */
const get = async (url) => {
  const response = await axios.get(url);
  return response.data;
};

export default { get };
