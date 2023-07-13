import express from "express";
import userRoute from "./user.route.js";
import mediaRoute from "./media.route.js";
import personRoute from "./person.route.js";
import reviewRoute from "./review.route.js";

// Creates a new router.
const router = express.Router();

// Router instance with routes defined for different endpoints, which use separate modules to handle requests.
router.use("/user", userRoute);
router.use("/person", personRoute);
router.use("/review", reviewRoute);
router.use("/:mediaType", mediaRoute);

export default router;
