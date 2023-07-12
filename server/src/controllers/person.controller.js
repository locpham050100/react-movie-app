import responseHandler from "../handlers/response.handler";
import tmdbApi from "../tmdb/tmdb.api";

/**
 * Retrieve detailed information about a person from the TMDb API.
 * @param {*} req
 * @param {*} res
 */
const personDetail = async (req, res) => {
  try {
    // Retrieves the personId from the params object of the req object. personId is the id of the person.
    const { personId } = req.params;

    // Retrieves detailed information about the person from the TMDb API.
    const person = await tmdbApi.personDetail({ personId });

    // After successfully retrieving the detailed information about the person, returns the information with an HTTP status code of 200 (OK).
    responseHandler.ok(res, person);
  } catch {
    // If an error occurs during processing, the function returns an HTTP status code of 500 (Internal Server Error).
    responseHandler.error(res);
  }
};

/**
 * Retrieve a list of media items that a person has been involved in from the TMDb API.
 * @param {*} req
 * @param {*} res
 */
const personMedias = async (req, res) => {
  try {
    // Retrieves the personId from the params object of the req object. personId is the id of the person.
    const { personId } = req.params;

    // Retrieves a list of media items that the person has been involved in from the TMDb API.
    const medias = await tmdbApi.personMedias({ personId });

    // After successfully retrieving the list of media items, returns the list with an HTTP status code of 200 (OK).
    responseHandler.ok(res, medias);
  } catch {
    // If an error occurs during processing, the function returns an HTTP status code of 500 (Internal Server Error).
    responseHandler.error(res);
  }
};

export default { personDetail, personMedias };
