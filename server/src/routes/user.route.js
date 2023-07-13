import express from "express";
import { body } from "express-validator";
import favoriteController from "../controllers/favorite.controller.js";
import userController from "../controllers/user.controller.js";
import requestHandler from "../handlers/request.handler.js";
import userModel from "../models/user.model.js";
import tokenMiddleware from "../middlewares/token.middleware.js";
import responseHandler from "../handlers/response.handler.js";

// Define routes, these routes define the URL addresses and the HTTP method for requests.
const router = express.Router();

// Configuring a route for user signup.
router.post(
  "/signup",

  // Validates "username", check "username" lenght, If it doesn't, it sets an error message.
  body("username")
    .exists()
    .withMessage("username is required")
    .isLength({ min: 8 })
    .withMessage("username minimum 8 characters")
    .custom(async (value) => {
      // Check if the requested username already exists in the database.
      const user = await userModel.findOne({ username: value });

      // If a user is found, it rejects the promise with an error message.
      if (user) return Promise.reject("username already used");
    }),

  // Validates "password", check "password" lenght, If it doesn't, it sets an error message.
  body("password")
    .exists()
    .withMessage("password is required")
    .isLength({ min: 8 })
    .withMessage("username minimum 8 characters"),

  // Validates "username", check "username" lenght, If it doesn't, it sets an error message.
  body("confirmPassword")
    .exists()
    .withMessage("confirmPassword is required")
    .isLength({ min: 8 })
    .withMessage("confirmPassword minimum 8 characters")
    .custom((value, { req }) => {
      // Checks that the "confirmPassword" field matches the "password" field.
      if (value !== req.body.password)
        throw new Error("confirmPassword not match");

      return true;
    }),
  // Validates "displayName", check "displayName" lenght, If it doesn't, it sets an error message.
  body("displayName")
    .exists()
    .withMessage("displayName is required")
    .isLength({ min: 8 })
    .withMessage("displayName minimum 8 characters"),

  // Handles checks if there are any validation errors from the previous middleware functions.
  requestHandler.validate,

  // Handles user signup.
  userController.signup
);

//  Defines a route to handle user login requests.
router.post(
  "/signin",

  // Validates "username", check "username" lenght, If it doesn't, it sets an error message.
  body("username")
    .exists()
    .withMessage("username is required")
    .isLength({ min: 8 })
    .withMessage("username minimum 8 characters"),

  // Validates "password", check "password" lenght, If it doesn't, it sets an error message.
  body("password")
    .exists()
    .withMessage("password is required")
    .isLength({ min: 8 })
    .withMessage("password minimum 8 characters"),

  // Check whether any validation error messages have been set in the request.
  requestHandler.validate,

  // Handle user login requests.
  userController.signin
);

// Defines a route to handle password update requests.
router.put(
  "/update-password",

  // Checks whether the client is authorized by verifying the token in the request header.
  tokenMiddleware.auth,

  // Validates "password", check "password" lenght, If it doesn't, it sets an error message.
  body("password")
    .exists()
    .withMessage("password is required")
    .isLength({ min: 8 })
    .withMessage("password minimum 8 characters"),

  // Validates "newPassword", check "newPassword" lenght, If it doesn't, it sets an error message.
  body("newPassword")
    .exists()
    .withMessage("newPassword is required")
    .isLength({ min: 8 })
    .withMessage("newPassword minimum 8 characters"),

  // Validates "confirmNewPassword", check "confirmNewPassword" lenght, If it doesn't, it sets an error message.
  body("confirmNewPassword")
    .exists()
    .withMessage("confirmNewPassword is required")
    .isLength({ min: 8 })
    .withMessage("confirmNewPassword minimum 8 characters")
    .custom((value, { req }) => {
      // Checks whether the "confirmNewPassword" value matches the "newPassword" value.
      if (value !== req.body.newPassword)
        throw new Error("confirmNewPassword not match");

      return true;
    }),

  // Check whether any validation error messages have been set in the request.
  requestHandler.validate,

  // Handle password update requests.
  userController.updatePassword
);

// Defines a route for retrieving user information.
router.get(
  "/info",

  // Checks whether the client is authorized by verifying the token in the request header.
  tokenMiddleware.auth,

  // Handle requests for getting a user's info.
  userController.getInfo
);

// Defines a route to get a user's favorites.
router.get(
  "/favorites",

  // Checks whether the client is authorized by verifying the token in the request header.
  tokenMiddleware.auth,

  // Handle requests for getting a user's favorites.
  favoriteController.getFavoritesOfUser
);

// Defines a route to add a favorite item.
router.post(
  "/favorites",

  // Checks whether the client is authorized by verifying the token in the request header.
  tokenMiddleware.auth,

  // Validates "mediatype", check "type", If it doesn't, it sets an error message.
  body("mediatype")
    .exists()
    .withMessage("mediatype is required")
    .custom((type) => ["movie", "tv"].includes(type))
    .withMessage("mediaType invalid"),

  // Validates "mediaId", check "mediaId" lenght, If it doesn't, it sets an error message.
  body("mediaId")
    .exists()
    .withMessage("mediaId is required")
    .isLength({ min: 1 })
    .withMessage("mediaId can not be empty"),

  // Validates "mediaTitle", If it doesn't, it sets an error message.
  body("mediaTitle").exists().withMessage("mediaTitle is required"),

  // Validates "mediaPoster", If it doesn't, it sets an error message.
  body("mediaPoster").exists().withMessage("mediaPoster is required"),

  // Validates "mediaRate", If it doesn't, it sets an error message.
  body("mediaRate").exists().withMessage("mediaRate is required"),

  // Check whether any validation error messages have been set in the request.
  requestHandler.validate,

  // Handler to handle requests for adding a favorite item.
  favoriteController.addFavorite
);

// Defines a route to remove a favorite item.
router.delete(
  "/favorites/:favoriteId",

  // Checks whether the client is authorized by verifying the token in the request header.
  tokenMiddleware.auth,

  // Handle requests for removing a favorite item.
  favoriteController.removeFavorite
);

export default router;
