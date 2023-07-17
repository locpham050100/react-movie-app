import { createSlice } from "@reduxjs/toolkit";

// Create a slice of store for managing user state.
export const userSlice = createSlice({
  // The name of the slice.
  name: "User",

  // The initial state of the slice.
  initialState: {
    user: null,
    listFavorites: [],
  },
  // Define an object, containing functions that handle the actions corresponding to the slice.
  reducers: {
    // Handle update the user's state.
    setUser: (state, action) => {
      // Handle the user has logged out or not
      if (action.payload === null) {
        // Remove the token stored in localStorage.
        localStorage.removeItem("actkn");
      } else {
        if (action.payload.token)
          // Save the token to localStorage.
          localStorage.setItem("actkn", action.payload.token);
      }

      // The user state of the slice will be updated.
      state.user = action.payload;
    },

    // Handle update the list of favorites.
    setListFavorites: (state, action) => {
      state.listFavorites = action.payload;
    },

    // Handle remove a favorite item from the list.
    removeFavorite: (state, action) => {
      const { mediaId } = action.payload;

      // Create a new list by filtering out the favorite items with mediaId different from the mediaId passed into the action.
      state.listFavorites = [...state.listFavorites].filter(
        (e) => e.mediaId.toString() !== mediaId.toString()
      );
    },

    // Add a new favorite item to the list.
    addFavorite: (state, action) => {
      state.listFavorites = [action.payload, ...state.listFavorites];
    },
  },
});

export const { setUser, setListFavorites, addFavorite, removeFavorite } =
  userSlice.actions;

export default userSlice.reducer; // Be used in managing the Redux store.
