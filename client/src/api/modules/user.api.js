import privateClient from "../client/private.client";
import publicClient from "../client/public.client";

// Defines an object containing string identifiers for user-related API endpoints.
const userEndpoints = {
  signin: "user/signin",
  signup: "user/signup",
  getInfo: "user/info",
  passwordUpdate: "user/update-password",
};

// Methods to interact with a user-related API.
const userApi = {
  // Method sends a POST request to the user/signin endpoint and returns the response or error.
  signin: async ({ username, password }) => {
    try {
      const response = await publicClient.post(userEndpoints.signin, {
        username,
        password,
      });
      return { response };
    } catch (err) {
      return { err };
    }
  },

  // Method sends a POST request to the user/signup endpoint and returns the response or error.
  signup: async ({ username, password, confirmPassword, displayName }) => {
    try {
      const response = await publicClient.post(userEndpoints.signup, {
        username,
        password,
        confirmPassword,
        displayName,
      });
      return { response };
    } catch (err) {
      return { err };
    }
  },

  // Method sends a GET request to the user/info endpoint which requires authentication, and returns the response or error.
  getInfo: async () => {
    try {
      const response = await privateClient.get(userEndpoints.getInfo);
      return { response };
    } catch (err) {
      return { err };
    }
  },

  // Method sends a PUT request to the user/update-password endpoint which requires authentication, and returns the response or error.
  passwordUpdate: async ({ password, newPassword, confirmPassword }) => {
    try {
      const response = await privateClient.put(userEndpoints.signup, {
        password,
        newPassword,
        confirmPassword,
      });
      return { response };
    } catch (err) {
      return { err };
    }
  },
};

export default userApi;
