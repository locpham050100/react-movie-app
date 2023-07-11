// Specifies configuration options for a database model.
const modelOptions = {
  toJSON: {
    // Includes virtual properties in the output.
    virtuals: true,
    transform: (_, obj) => {
      delete obj._id;
      return obj;
    },
  },
  toObject: {
    // Includes virtual properties in the output.
    virtuals: true,
    transform: (_, obj) => {
      delete obj._id;
      return obj;
    },
  },

  // Disables outputting a version key in the output.
  versionKey: false,

  // Includes createdAt and updatedAt properties in the output with values indicating when the document was created and last updated, respectively.
  timestamps: true,
};

export default modelOptions;
