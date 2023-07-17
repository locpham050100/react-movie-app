// Object containing two properties, movie and tv.
const mediaType = {
  movie: "movie",
  tv: "tv",
};

// Object containing two properties, popular and top_rated.
const mediaCategory = {
  popular: "popular",
  top_rated: "top_rated",
};

/**
 * Takes a path to an image from the TMDb API and returns the full path to the media backdrop.
 * @param {*} imgEndpoint
 * @returns
 */

const backdropPath = (imgEndpoint) =>
  `https://image.tmdb.org/t/p/original${imgEndpoint}`;

/**
 * Returns the full path to the media poster image.
 * @param {*} imgEndpoint
 * @returns
 */
const posterPath = (imgEndpoint) =>
  `https://image.tmdb.org/t/p/w500${imgEndpoint}`;

/**
 * Takes a YouTube video ID and returns the full path to that video on YouTube.
 * @param {*} videoId
 * @returns
 */
const youtubePath = (videoId) => `https://www.youtube.com/embed/${videoId}`;

const tmdbConfigs = {
  mediaType,
  mediaCategory,
  backdropPath,
  posterPath,
  youtubePath,
};

export default tmdbConfigs;
