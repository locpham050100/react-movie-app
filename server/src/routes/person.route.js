import express from "express";
import personController from "../controllers/person.controller.js";

// Create a new router object.
const router = express.Router();

// Retrieves a list of media items related to a specific person from the database.
router.get("/:personId/medias", personController.personMedias);

// Retrieves the detailed information for a specific person from the database.
router.get("/:personId", personController.personDetail);

export default router;
