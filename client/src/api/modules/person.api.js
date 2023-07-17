import publicClient from "../client/public.client";

// Defines an object containing string identifiers for person-related API endpoints.
const personEndpoints = {
  detail: ({ personId }) => `person/${personId}`,
  medias: ({ personId }) => `person/${personId}/medias`,
};

// Methods to interact with a person-related API.
const personApi = {
  // Method sends a GET request to the person detail endpoint and returns the response or error.
  detail: async ({ personId }) => {
    try {
      const response = await publicClient.get(
        personEndpoints.detail({ personId })
      );
      return { response };
    } catch (err) {
      return { err };
    }
  },

  // Method sends a GET request to the person medias endpoint and returns the response or error.
  medias: async ({ personId }) => {
    try {
      const response = await publicClient.get(
        personEndpoints.medias({ personId })
      );
      return { response };
    } catch (err) {
      return { err };
    }
  },
};

export default personApi;
