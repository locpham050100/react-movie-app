import responseHandler from "../handlers/response.handler.js";
import tmdbApi from "../tmdb/tmdb.api.js";
import userModel from "../models/user.model.js";
import favoriteModel from "../models/favorite.model.js";
import reviewModel from "../models/review.model.js";
import tokenMiddleware from "../middlewares/token.middleware.js";

/**
 * Retrieve a list of movies or TV shows from the TMDb API.
 * @param {*} req
 * @param {*} res
 * @returns
 */
const getList = async (req, res) => {
  try {
    // Use the query property of req to get the page parameter passed from the client.
    const { page } = req.query;

    // Use the params property of req to get the mediaType and mediaCategory parameters from the URL path.
    const { mediaType, mediaCategory } = req.params;

    // Call the mediaList method of the tmdbApi object to get a list of movies or TV shows.
    const response = await tmdbApi.mediaList({
      mediaType,
      mediaCategory,
      page,
    });

    // If there are no errors during the processing, send a successful response to the client.
    return responseHandler.ok(res, response);
  } catch {
    // The method returns a response, indicating that an error occurred while processing the request.
    responseHandler.error(res);
  }
};

/**
 * Retrieve movie or TV show genres from the TMDb API.
 * @param {*} req
 * @param {*} res
 * @returns
 */
const getGenres = async (req, res) => {
  try {
    // Retrieve the mediaType parameter from the req object.
    const { mediaType } = req.params;

    // Call the mediaGenres method from the TMDb API and retrieve the appropriate genres for the mediaType parameter.
    const response = await tmdbApi.mediaGenres({ mediaType });

    // If there are no errors during the processing, send a successful response to the client.
    return responseHandler.ok(res, response);
  } catch {
    // The method returns a response, indicating that an error occurred while processing the request.
    responseHandler.error(res);
  }
};

/**
 * Search for movies or TV shows from the TMDb API.
 * @param {*} req
 * @param {*} res
 */
const search = async (req, res) => {
  try {
    // Retrieve the mediaType parameter from the req object.
    const { mediaType } = req.params;

    // Retrieve the query and page parameters from the req object.
    const { query, page } = req.query;

    // Call the mediaSearch method from the TMDb API and search for movies or TV shows that match the query, page, and mediaType parameters.
    const response = await tmdbApi.mediaSearch({
      query,
      page,
      mediaType: mediaType === "people" ? "person" : mediaType,
    });

    // If there are no errors during the processing, send a successful response to the client.
    responseHandler.ok(res, response);
  } catch {
    // The method returns a response, indicating that an error occurred while processing the request.
    responseHandler.error(res);
  }
};

/**
 * Retrieve detailed information about a movie or TV show from the TMDb API.
 * @param {*} req
 * @param {*} res
 */
const getDetail = async (req, res) => {
  try {
    // Retrieve the mediaType and mediaId parameters from the req object.
    const { mediaType, mediaId } = req.params;

    // Create an object params containing mediaType and mediaId information.
    const params = { mediaType, mediaId };

    // Call the mediaDetail method and retrieve detailed information about the movie or TV show with the mediaType and mediaId parameters.
    const media = await tmdbApi.mediaDetail(params);

    // Retrieve information about the cast and crew of the movie or TV show and assign it to the credits property of the media object.
    media.credits = await tmdbApi.mediaCredits(params);

    // Retrieve a list of videos related to the movie or TV show and assign it to the videos variable.
    const videos = await tmdbApi.mediaVideos(params);

    // Assign the list of videos to the videos property of the media object.
    media.videos = videos;

    // Retrieve a list of recommended movies or TV shows and assign it to the recommend variable.
    const recommend = await tmdbApi.mediaRecommend(params);

    // Assign the list of recommended movies or TV shows to the recommend property of the media object.
    media.recommend = recommend.results;

    // Retrieve a list of images related to the movie or TV show and assign it to the images property of the media object.
    media.images = await tmdbApi.mediaImages(params);

    // Decode the authentication token of the user from the req object.
    const tokenDecoded = tokenMiddleware.tokenDecode(req);

    // Check if the authentication token has been successfully decoded.
    if (tokenDecoded) {
      // Find user information in the database.
      const user = await userModel.findById(tokenDecoded.data);

      // Check if user information is found in the database.
      if (user) {
        // Find out if the user has added this movie or TV show to their favorites list.
        const isFavorite = await favoriteModel.findOne({
          user: user.id,
          mediaId,
        });

        // Assign true or false to the isFavorite property of the media object.
        media.isFavorite = isFavorite !== null;
      }
    }

    // Retrieve a list of reviews about the movie or TV show and assign it to the reviews property of the media object.
    media.reviews = await reviewModel
      .find({ mediaId })
      .popular("user") // Retrieve user information related to each review and combine it with the review.
      .sort("-createAt"); // Sort the reviews by creation time, from newest to oldest.

    // If there are no errors during the processing, send a successful response to the client.
    responseHandler.ok(res, media);
  } catch {
    // The method returns a response, indicating that an error occurred while processing the request.
    responseHandler.error(res);
  }
};

export default { getList, getGenres, search, getDetail };
