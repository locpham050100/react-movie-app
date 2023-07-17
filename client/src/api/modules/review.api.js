import privateClient from "../client/private.client";

// Defines an object containing string identifiers for review-related API endpoints.
const reviewEndpoints = {
  list: "reviews",
  add: "review",
  remove: ({ reviewId }) => `reviews/${reviewId}`,
};

// Methods to interact with a review-related API.
const reviewApi = {
  // Method sends a POST request to the review endpoint and returns the response or error.
  add: async ({ mediaId, mediaType, mediaTitle, mediaPoster, content }) => {
    try {
      const response = await privateClient.post(reviewEndpoints.add, {
        mediaId,
        mediaType,
        mediaTitle,
        mediaPoster,
        content,
      });
      return { response };
    } catch (err) {
      return { err };
    }
  },

  // Method sends a DELETE request to the reviews/{reviewId} endpoint and returns the response or error.
  remove: async ({ reviewId }) => {
    try {
      const response = await privateClient.delete(
        reviewEndpoints.remove({ reviewId })
      );
      return { response };
    } catch (err) {
      return { err };
    }
  },

  // Method sends a GET request to the reviews endpoint and returns the response or error.
  getList: async () => {
    try {
      const response = await privateClient.get(reviewEndpoints.list);
      return { response };
    } catch (err) {
      return { err };
    }
  },
};

export default reviewApi;
