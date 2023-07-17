import publicClient from "../client/public.client";
import privateClient from "../client/private.client";

// Methods to interact with a media-related API.
const mediaEndpoints = {
  list: ({ mediaType, mediaCategory, page }) =>
    `${mediaType}/${mediaCategory}?page=${page}`,
  detail: ({ mediaType, mediaId }) => `${mediaType}/detail/${mediaId}`,
  search: ({ mediaType, query, page }) =>
    `${mediaType}/search?query=${query}&page=${page}`,
};

// Methods to interact with a media-related API.
const mediaApi = {
  // Method sends a GET request to the media list endpoint and returns the response or error.
  getList: async ({ mediaType, mediaCategory, page }) => {
    try {
      const response = await publicClient.get(
        mediaEndpoints.list({ mediaType, mediaCategory, page })
      );
      return { response };
    } catch (err) {
      return { err };
    }
  },

  // Method sends a GET request to the media detail endpoint and returns the response or error.
  getDetail: async ({ mediaType, mediaId }) => {
    try {
      const response = await privateClient.get(
        mediaEndpoints.detail({ mediaType, mediaId })
      );
      return { response };
    } catch (err) {
      return { err };
    }
  },

  // Method sends a GET request to the media search endpoint and returns the response or error.
  search: async ({ mediaType, query, page }) => {
    try {
      const response = await publicClient.get(
        mediaEndpoints.search({ mediaType, query, page })
      );
      return { response };
    } catch (err) {
      return { err };
    }
  },
};

export default mediaApi;
