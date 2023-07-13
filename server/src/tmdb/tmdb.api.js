import axiosClient from "../axios/axios.client.js";
import tmdbEndpoints from "./tmdb.endpoints.js";

// Defines an object tmdbApi with different methods that make HTTP requests to The Movie Database (TMDb) API using Axios client.
const tmdbApi = {
  // Method makes an HTTP GET request to the TMDb API endpoint for a list of media items based on the specified parameters.
  mediaList: async ({ mediaType, mediaCategory, page }) =>
    await axiosClient.get(
      tmdbEndpoints.mediaList({ mediaType, mediaCategory, page })
    ),

  // Method makes an HTTP GET request to the TMDb API endpoint for details of a specific media item based on the specified parameters.
  mediaDetail: async ({ mediaType, page }) =>
    await axiosClient.get(tmdbEndpoints.mediaDetail({ mediaType, page })),

  // Method makes an HTTP GET request to the TMDb API endpoint for a list of genres based on the specified media type.
  mediaGenres: async ({ mediaType }) =>
    await axiosClient.get(tmdbEndpoints.mediaGenres({ mediaType })),

  // Method makes an HTTP GET request to the TMDb API endpoint for credits of a specific media item based on the specified parameters.
  mediaCredits: async ({ mediaType, mediaId }) =>
    await axiosClient.get(tmdbEndpoints.mediaCredits({ mediaType, mediaId })),

  // Method makes an HTTP GET request to the TMDb API endpoint for images of a specific media item based on the specified parameters.
  mediaImages: async ({ mediaType, mediaId }) =>
    await axiosClient.get(tmdbEndpoints.mediaImages({ mediaType, mediaId })),

  // Method makes an HTTP GET request to the TMDb API endpoint for a list of recommended media items based on the specified parameters.
  mediaRecommend: async ({ mediaType, mediaId }) =>
    await axiosClient.get(tmdbEndpoints.mediaRecommend({ mediaType, mediaId })),

  // Method makes an HTTP GET request to the TMDb API endpoint for a list of media items that match the specified search query and parameters.
  mediaSearch: async ({ mediaType, query, page }) =>
    await axiosClient.get(
      tmdbEndpoints.mediaSearch({ mediaType, query, page })
    ),

  // Method makes an HTTP GET request to the TMDb API endpoint for details of a specific person based on the specified parameter.
  personDetail: async ({ personId }) =>
    await axiosClient.get(tmdbEndpoints.personDetail({ personId })),

  // Method makes an HTTP GET request to the TMDb API endpoint for a list of media items related to a specific person based on the specified parameter.
  personMedias: async ({ personId }) =>
    await axiosClient.get(tmdbEndpoints.personMedias({ personId })),
};

export default tmdbApi;
