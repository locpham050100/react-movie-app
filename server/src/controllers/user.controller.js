import userModel from "../models/user.model";
import jsonwebtoken from "jsonwebtoken";
import responseHandler from "../handlers/response.handler";

/**
 * Handles user registration.
 * @param {*} req
 * @param {*} res
 * @returns
 */
const signup = async (req, res) => {
  try {
    // Extracts the username, password, and displayName from the request body.
    const { username, password, displayName } = req.body;

    // Checks if there is already a user with the same username in the database.
    const checkUser = await userModel.findOne({ username });

    // If there is, sends a bad request response to the client.
    if (checkUser)
      return responseHandler.badrequest(res, "username already in used");

    // If not, creates a new user document using the userModel.
    const user = new userModel();
    user.displayName = displayName;
    user.username = username;
    user.setPassword(password);

    // Saves the document to the database.
    await user.save();

    // Generates a JWT token.
    const token = jsonwebtoken.sign(
      { data: user.id },
      process.env.TOKEN_SECRET,
      { expiresIn: "24h" }
    );

    // Sends a created response to the client with the token and user information, excluding the password and salt.
    responseHandler.created(res, {
      token,
      ...user._doc,
      id: user.id,
    });
  } catch {
    // The method returns a response, indicating that an error occurred while processing the request.
    responseHandler.error(res);
  }
};

/**
 * Handle user login.
 * @param {*} req
 * @param {*} res
 * @returns
 */
const signin = async (req, res) => {
  try {
    // Extracts the necessary information from the request body.
    const { username, password } = req.body;

    // Searches for the user in the database using the findOne method and selects the properties.
    const user = await userModel
      .findOne({ username })
      .select("username password salt id displayName");

    // If the user is not found, sends an error response to the client.
    if (!user) return responseHandler.badrequest(res, "User not exist");

    // If the user is found, If the password is incorrect, sends an error response to the client.
    if (!user.validPassword(password))
      return responseHandler.badrequest(res, "Wrong password");

    // If the password is correct, creates a JWT token.
    const token = jsonwebtoken.sign(
      { data: user.id },
      process.env.TOKEN_SECRET,
      { expiresIn: "24h" }
    );

    // Remove the password and salt properties from the user object.
    user.password = undefined;
    user.salt = undefined;

    // Sends a successful response to the client with the user information and token, excluding the password and salt.
    responseHandler.created(res, {
      token,
      ...user._doc,
      id: user.id,
    });
  } catch {
    // The method returns a response, indicating that an error occurred while processing the request.
    responseHandler.error(res);
  }
};

/**
 * Handles updating the password of the authenticated user.
 * @param {*} req
 * @param {*} res
 * @returns
 */
const updatePassword = async (req, res) => {
  try {
    // Extracts the necessary information from the request body.
    const { password, newPassword } = req.body;

    // Finds the user document using the findById method and selects properties.
    const user = await userModel
      .findById(req.user.id)
      .select("password id salt");

    // If the user is not found, the function sends an "unauthorized" response to the client.
    if (!user) return responseHandler.unauthorize(res);

    // If the old password is incorrect, the function sends a "bad request" response to the client.
    if (!user.validPassword(password))
      return responseHandler.badrequest(res, "Wrong password");

    // If the old password is correct, the function updates the user's password.
    user.setPassword(newPassword);

    // Saves the user document to the database.
    await user.save();

    // Sends an "ok" response to the client.
    responseHandler.ok(res);
  } catch {
    // The method returns a response, indicating that an error occurred while processing the request.
    responseHandler.error(res);
  }
};

/**
 * Handle retrieve information of an authenticated user.
 * @param {*} req
 * @param {*} res
 * @returns
 */
const getInfo = async (req, res) => {
  try {
    // uses the findById method to search for a user document in the database.
    const user = await userModel.findById(req.user.id);

    // If no user document is found, calls the notFound method of responseHandler to send a response to the client.
    if (!user) return responseHandler.notFound(res);

    // If a user document is found, uses the ok method of responseHandler to send a response to the client.
    responseHandler.ok(res, user);
  } catch {
    // The method returns a response, indicating that an error occurred while processing the request.
    responseHandler.error(res);
  }
};

export default {
  signup,
  signin,
  getInfo,
  updatePassword,
};
