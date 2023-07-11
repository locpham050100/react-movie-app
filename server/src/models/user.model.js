import mongoose from "mongoose";
import crypto from "crypto";
import modelOptions from "./model.option";

// Defines a Mongoose schema for a user object
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    displayName: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    salt: {
      type: String,
      required: true,
    },
  },
  modelOptions
);

/**
 * Method generates password.
 * @param {*} password
 */
userSchema.methods.setPassword = function (password) {
  // Generates a random salt value using the Node.js crypto module.
  this.salt = crypto.randomBytes(16).toString("hex");

  // Uses the pbkdf2Sync function to hash the password using the salt and a fixed set of parameters.
  this.password = crypto
    .pbkdf2Sync(password, this.salt, 1000, 64, "sha512")
    .toString("hex");
};

/**
 * Methods confirm password.
 * @param {*} password
 * @returns boolean
 */
userSchema.methods.validPassword = function (password) {
  // Takes a password as input, generates a hash using the same method as setPassword.
  const hash = crypto
    .pbkdf2Sync(password, this.salt, 1000, 64, "sha512")
    .toString("hex");

  // Returns true if the resulting hash matches the password field of the user object.
  return this.password === hash;
};

// The userSchema is used to define a Mongoose model called userModel.
const userModel = mongoose.model("User", userSchema);

export default userModel;
