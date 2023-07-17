import { createSlice } from "@reduxjs/toolkit";

// Create a slice of store for managing appState state.
export const appStateSlice = createSlice({
  // The name of the slice.
  name: "AppState",

  // The initial state of the slice.
  initialState: {
    appState: "",
  },
  // Define an object, containing functions that handle the actions corresponding to the slice.
  reducers: {
    // Sets the appState state to the payload value of the action.
    setAppState: (state, action) => {
      state.appState = action.payload;
    },
  },
});

export const { setAppState } = appStateSlice.actions;

export default appStateSlice.reducer; // Be used in managing the Redux store.
