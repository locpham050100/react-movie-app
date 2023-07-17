import publicClient from "../client/public.client";

// Defines an object containing string identifiers for genre-related API endpoints.
const genreEndpoints = {
  list: ({ mediaType }) => `${mediaType}/genres`,
};

// Methods to interact with a genre-related API.
const genreApi = {
  // Method sends a GET request to the genre list endpoint and returns the response or error.
  getList: async ({ mediaType }) => {
    try {
      const response = await publicClient.get(
        genreEndpoints.list({ mediaType })
      );
      return { response };
    } catch (err) {
      return { err };
    }
  },
};

export default genreApi;
