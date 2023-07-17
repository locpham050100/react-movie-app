// Check whether a particular media has already been marked as a favorite by a user.
const favoriteUtils = {
  check: ({ listFavorites, mediaId }) =>
    listFavorites &&
    listFavorites.find((e) => e.mediaId.toString() === mediaId.toString()) !==
      undefined,
};

export default favoriteUtils;
