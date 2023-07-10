import tmdbConfig from "./tmdb.config";

// Create an object tmdbEndpoints containing properties as functions to build URLs for TMDb API requests.
const tmdbEndpoints = {
  // Build URL for request to get a list of movies or TV shows based on mediaType and mediaCategory, with optional page.
  mediaList: ({ mediaType, mediaCategory, page }) =>
    tmdbConfig.getUrl(`${mediaType}/${mediaCategory}`, page),

  // Build URL for request to get details of a movie or TV show based on mediaType and mediaId.
  mediaDetail: ({ mediaType, mediaId }) =>
    tmdbConfig.getUrl(`${mediaType}/${mediaId}`),

  // Build URL for request to get a list of genres for movies or TV shows based on mediaType.
  mediaGenres: ({ mediaType }) => tmdbConfig.getUrl(`genre/${mediaType}/List`),

  // Build URL for request to get a list of genres for movies or TV shows based on mediaType.
  mediaCredits: ({ mediaType, mediaId }) =>
    tmdbConfig.getUrl(`${mediaType}/${mediaId}/credits`),

  // Build URL for request to get a list of videos for a movie or TV show based on mediaType and mediaId.
  mediaVideos: ({ mediaType, mediaId }) =>
    tmdbConfig.getUrl(`${mediaType}/${mediaId}/videos`),

  // Build URL for request to get a list of recommended similar movies or TV shows based on mediaType and mediaId.
  mediaRecommend: ({ mediaType, mediaId }) =>
    tmdbConfig.getUrl(`${mediaType}/${mediaId}/recommendations`),

  // Build URL for request to get a list of images and posters for a movie or TV show based on mediaType and mediaId.
  mediaImages: ({ mediaType, mediaId }) =>
    tmdbConfig.getUrl(`${mediaType}/${mediaId}/images`),

  // Build URL for request to search for movies or TV shows based on mediaType and search query, with optional page.
  mediaSearch: ({ mediaType, query, page }) =>
    tmdbConfig.getUrl(`search/${mediaType}`, { query, page }),

  // Build URL for request to get details of a person or celebrity based on personId.
  personDetail: ({ personId }) => tmdbConfig.getUrl(`person/${personId}`),

  // Build URL for request to get a list of movies or TV shows that a person or celebrity has participated in based on personId.
  personMedias: ({ personId }) =>
    tmdbConfig.getUrl(`person/${personId}/combined_credits`),
};

export default tmdbEndpoints;
