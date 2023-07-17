import privateClient from "../client/private.client";

// Defines an object favoriteEndpoints containing string identifiers for favorite-related API endpoints.
const favoriteEndpoints = {
  list: "user/favotites",
  add: "user/favorites",
  remove: ({ favoriteId }) => `user/favorites/${favoriteId}`,
};

// Methods to interact with a favorite-related API.
const favoriteApi = {
  // Method sends a GET request to the favorite list endpoint and returns the response or error.
  getList: async () => {
    try {
      const response = await privateClient.get(favoriteEndpoints.list);
      return { response };
    } catch (err) {
      return { err };
    }
  },

  // Method sends a POST request to the favorite add endpoint and returns the response or error.
  add: async ({ mediaId, mediaType, mediaTitle, mediaPoster, mediaRate }) => {
    try {
      const response = await privateClient.post(favoriteEndpoints.add, {
        mediaId,
        mediaType,
        mediaTitle,
        mediaPoster,
        mediaRate,
      });
      return { response };
    } catch (err) {
      return { err };
    }
  },

  // Method sends a DELETE request to the favorite remove endpoint and returns the response or error.
  remove: async ({ favoriteId }) => {
    try {
      const response = await privateClient.delete(
        favoriteEndpoints.remove({ favoriteId })
      );
      return { response };
    } catch (err) {
      return { err };
    }
  },
};

export default favoriteApi;
