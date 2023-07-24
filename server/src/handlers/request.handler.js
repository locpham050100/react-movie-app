import { validationResult } from "express-validator";

/**
 * Check if there are any validation errors in the request.
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns
 */
const validate = (req, res, next) => {
  // Returns an object that contains an array of validation errors, if any.
  const errors = validationResult(req);

  // Method is used to check if the array of errors is empty.
  if (!errors.isEmpty()) return res.status(400).json(errors.array()[0].msg);

  // Pass control to the next middleware.
  next();
};

export default { validate };
