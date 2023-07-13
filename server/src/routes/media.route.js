import express from "express";
import mediaController from "../controllers/media.controller.js";

// Create a new router object.
const router = express.Router({ mergeParams: true });

// Performs a search for media items based on the query parameters in the request URL.
router.get("/search", mediaController.search);

// Returns a list of available media genres.
router.get("/genres", mediaController.getGenres);

// Retrieves the details for the media item with the specified ID from the database.
router.get("/detail/:mediaId", mediaController.getDetail);

// Retrieves a list of media items in the specified category from the database.
router.get("/:mediaCategory", mediaController.getList);

export default router;
