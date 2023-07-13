import responseHandler from "../handlers/response.handler.js";
import reviewModel from "../models/review.model.js";

/**
 *  Create a new review for a movie by a user.
 * @param {*} req
 * @param {*} res
 */
const create = async (req, res) => {
  try {
    // Retrieves the movieId from the params object of the req object.
    const { movieId } = req.params;

    // Creates a new review object using the reviewModel and sets its properties.
    const review = new reviewModel({
      userId: req.user.id,
      movieId,
      ...req.body,
    });

    // Saves the new review object to the database.
    await review.save();

    // If the review is saved successfully, returns an HTTP status code of 201 (Created) along with the created review object.
    responseHandler.created(res, {
      ...review._doc,
      id: review.id,
      user: req.user,
    });
  } catch {
    // If an error occurs during processing, returns an HTTP status code of 500 (Internal Server Error).
    responseHandler.error(res);
  }
};

/**
 * Delete a review for a movie by a user.
 * @param {*} req
 * @param {*} res
 * @returns
 */
const remove = async (req, res) => {
  try {
    // Retrieves the reviewId from the params object of the req object.
    const { reviewId } = req.params;

    // Find the review with the given reviewId and user.id that matches the current user.
    const review = await reviewModel.findOne({
      _id: reviewId,
      user: req.user.id,
    });

    // If the review is not found, returns an HTTP status code of 404 (Not Found).
    if (!review) return responseHandler.notfound(res);

    // Delete the review from the database.
    await review.remove();

    // If the review is deleted successfully, returns an HTTP status code of 200 (OK).
    responseHandler.ok(res);
  } catch {
    // If an error occurs during processing, returns an HTTP status code of 500 (Internal Server Error).
    responseHandler.error(res);
  }
};

/**
 * Retrieve a list of reviews for a user.
 * @param {*} req
 * @param {*} res
 */
const getReviewsOfUser = async (req, res) => {
  try {
    // Queries the database to retrieve the list of reviews for the current user.
    const reviews = await reviewModel
      .find({ user: req.user.id })
      .sort("-createAt"); // Sorted in descending order of creation time (createdAt).

    // If the query is successful, returns the list of reviews for the current user.
    responseHandler.ok(res, reviews);
  } catch {
    // If an error occurs during processing, returns an HTTP status code of 500 (Internal Server Error).
    responseHandler.error(res);
  }
};

export default { create, remove, getReviewsOfUser };
