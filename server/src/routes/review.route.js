import express from "express";
import { body } from "express-validator";
import reviewController from "../controllers/review.controller.js";
import tokenMiddleware from "../middlewares/token.middleware.js";
import requestHandler from "../handlers/request.handler.js";

// Creates a new router object with the mergeParams option set to true.
const router = express.Router({ mergeParams: true });

// Defines a route for the HTTP GET method.
router.get(
  "/",

  // Authenticate the token.
  tokenMiddleware.auth,

  // Retrieves a list of reviews that the user has created and returns them to the client.
  reviewController.getReviewsOfUser
);

// Defines a route for the HTTP POST method
router.post(
  "/",

  // Authenticate the token sent with the request.
  tokenMiddleware.auth,

  // Validates "mediaId", check "mediaId" lenght, If it doesn't, it sets an error message.
  body("mediaId")
    .exists()
    .withMessage("mediaId is required")
    .isLength({ min: 1 })
    .withMessage("mediaId can not be empty"),

  // Validates "content", check "content" lenght, If it doesn't, it sets an error message.
  body("content")
    .exists()
    .withMessage("content is required")
    .isLength({ min: 1 })
    .withMessage("content can not be empty"),

  // Validates "mediatype", check "type", If it doesn't, it sets an error message.
  body("mediatype")
    .exists()
    .withMessage("mediatype is required")
    .custom((type) => ["movie", "tv"].includes(type))
    .withMessage("mediaType invalid"),

  // Validates "mediaTitle", If it doesn't, it sets an error message.
  body("mediaTitle").exists().withMessage("mediaTitle is required"),

  // Validates "mediaPoster", If it doesn't, it sets an error message.
  body("mediaPoster").exists().withMessage("mediaPoster is required"),

  // Check if there are any validation errors in the request body.
  requestHandler.validate,

  // Creates a new review using the validated data from the request body and returns a response to the client.
  reviewController.create
);

// Defines a route for the HTTP PUT method.
router.delete(
  "/:reviewId",

  // Authenticate the token sent with the request.
  tokenMiddleware.auth,

  // Handle the deletion of the review based on the reviewId parameter.
  reviewController.remove
);

export default router;
