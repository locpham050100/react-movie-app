import responseHandler from "../handlers/response.handler";
import favoriteModel from "../models/favorite.model";

/**
 * Add an item to a user's favorites list.
 * @param {*} req
 * @param {*} res
 * @returns
 */
const addFavorite = async (req, res) => {
  try {
    // Checks whether the item has already been added to the favorites list.
    const isFavorite = await favoriteModel.findOne({
      user: req.user.id,
      mediaId: req.body.mediaId,
    });

    // If the item already exists in the favorites list, returns item with an HTTP status code of 200 (OK).
    if (isFavorite) return responseHandler.ok(res, isFavorite);

    // If the item does not yet exist in the favorites list, creates a new item.
    const favorite = new favoriteModel({ ...req.body, user: req.user.id });

    // Saves new item to the database.
    await favorite.save();

    // Return an HTTP status code of 201 (Created) along with the information of the newly added item.
    responseHandler.created(res, favorite);
  } catch {
    // If an error occurs during processing, returns an HTTP status code of 500 (Internal Server Error).
    responseHandler.error(res);
  }
};

/**
 * Remove an item from a user's favorites list.
 * @param {*} req
 * @param {*} res
 * @returns
 */
const removeFavorite = async (req, res) => {
  try {
    // Retrieves the favoriteId from the params object of the req object.
    const { favoriteId } = req.params;

    // Searches for the item in the user's favorites list.
    const favorite = await favoriteModel.findOne({
      user: req.user.id,
      _id: favoriteId,
    });

    // If the item does not exist in the user's favorites list, returns an HTTP status code of 404 (Not Found).
    if (!favorite) return responseHandler.notfound(res);

    // If the item exists in the user's favorites list, removes that item from the favorites list and saves the changes to the database.
    await favorite.remove();

    // After removing the item from the favorites list, returns an HTTP status code of 200 (OK).
    responseHandler.ok(res);
  } catch {
    // If an error occurs during processing, returns an HTTP status code of 500 (Internal Server Error).
    responseHandler.error(res);
  }
};

/**
 * Retrieve a list of a user's favorite items.
 * @param {*} req
 * @param {*} res
 */
const getFavoritesOfUser = async (req, res) => {
  try {
    // Searches for all favorite items of the user.
    const favorite = await favoriteModel
      .find({ user: req.user.id })
      .sort("-createAt"); // Sorts the list of items in descending order.

    // After successfully retrieving the list of user's favorite items, returns the list with an HTTP status code of 200 (OK).
    responseHandler.ok(res, favorite);
  } catch {
    // If an error occurs during processing, the function returns an HTTP status code of 500 (Internal Server Error).
    responseHandler.error(res);
  }
};

export default { addFavorite, removeFavorite, getFavoritesOfUser };
