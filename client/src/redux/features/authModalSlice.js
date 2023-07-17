import { createSlice } from "@reduxjs/toolkit";

// Create a slice of store for managing authModal state.
export const authModalSlice = createSlice({
  // The name of the slice.
  name: "AuthModal",

  // The initial state of the slice.
  initialState: {
    authModalOpen: false,
  },
  // Define an object, containing functions that handle the actions corresponding to the slice.
  reducers: {
    // Sets the authModalOpen state to the payload value of the action.
    setAuthModalOpen: (state, action) => {
      state.authModalOpen = action.payload;
    },
  },
});

export const { setAuthModalOpen } = authModalSlice.actions;

export default authModalSlice.reducer; // Be used in managing the Redux store.
