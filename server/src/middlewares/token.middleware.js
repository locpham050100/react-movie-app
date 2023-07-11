import jsonwebtoken from "jsonwebtoken";
import responseHandler from "../handlers/response.handler";
import userModel from "../models/user.model";

/**
 * Takes the request object req as a parameter and returns a decoded JWT object.
 * @param {*} req
 * @returns
 */
const tokenDecode = (req) => {
  try {
    const bearerHeader = req.headers["authorization"];

    // Checks if the Authorization header exists
    if (bearerHeader) {
      const token = bearerHeader.split(" ")[1];

      // Decode the second element of the array
      return jsonwebtoken.verify(token, process.env.TOKEN_SECRET);
    }
    return false;
  } catch {
    return false;
  }
};

/**
 * Middleware functions used for user authentication.
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns
 */
const auth = async (req, res, next) => {
  // Uses the tokenDecode function to decode the JWT from the Authorization header of the request.
  const tokenDecoded = tokenDecode(req);

  // If the value returned from tokenDecode is false, meaning there is no JWT or the JWT is invalid, send an unauthorized response to the client.
  if (!tokenDecoded) return responseHandler.unauthorize(res);

  // If the value returned from tokenDecode is a decoded JWT object, find the user corresponding to the ID stored in the user information in the decoded JWT object.
  const user = await userModel.findById(tokenDecoded.data);

  // If the user is not found, send an unauthorized response to the client.
  if (!user) return responseHandler.unauthorized(res);

  // If the user is found, the auth function adds the user object to the request object.
  req.user = user;

  // Pass control to the next middleware in the chain.
  next();
};

export default { auth, tokenDecode };
