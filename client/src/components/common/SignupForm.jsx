import React, { useState } from "react";
import { LoadingButton } from "@mui/lab";
import { Alert, Box, Button, Stack, TextField } from "@mui/material";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import * as Yup from "yup";
import userApi from "api/modules/user.api";
import { setAuthModalOpen } from "redux/features/authModalSlice";
import { setUser } from "redux/features/userSlice";

// Creates a sign-up form for users.
const SignupForm = ({ switchAuthState }) => {
  // Send actions to the Redux store.
  const dispatch = useDispatch();

  // Manage the state of isLoginRequest.
  const [isLoginRequest, setIsLoginRequest] = useState(false);

  // A string to store any error messages returned from the server.
  const [errorMessage, setErrorMessage] = useState();

  // Handle form state and validation.
  const signinForm = useFormik({
    // Specifies the initial values for the form fields.
    initialValues: {
      password: "",
      username: "",
      displayName: "",
      confirmPassword: "",
    },

    // Defines the validation rules for the form fields.
    validationSchema: Yup.object({
      username: Yup.string()
        .min(8, "User name minimum 8 characters ")
        .required("User name is required"),
      password: Yup.string()
        .min(8, "Password minimum 8 characters ")
        .required("Password is required"),
      displayName: Yup.string()
        .min(8, "Display name minimum 8 characters ")
        .required("Display name is required"),
      confirmPassword: Yup.string()
        .min(8, "Confirm password minimum 8 characters ")
        .required("Confirm password is required"),
    }),

    // Called when the form is submitted.
    onSubmit: async (values) => {
      setErrorMessage(undefined);
      setIsLoginRequest(true);

      // Sends a sign-in request to the server.
      const { response, err } = await userApi.signup(values);

      setIsLoginRequest(false);

      // If the request is successful, the user is logged.
      if (response) {
        signinForm.resetForm();

        // The setUser action is dispatched to update the Redux store.
        dispatch(setUser(response));
        dispatch(setAuthModalOpen(false));
        toast.success("Sign in success");
      }

      // If there is an error, the error message is stored in errorMessage.
      if (err) setErrorMessage(err.message);
    },
  });

  return (
    <Box component="form" onSubmit={signinForm.handleSubmit}>
      <Stack spacing={3}>
        {/* TextField components for the username, password, displayName. confirmPassword fields */}
        <TextField
          type="text"
          placeholder="User name"
          name="username"
          fullWidth
          value={signinForm.values.username}
          onChange={signinForm.handleChange}
          color="success"
          error={
            signinForm.touched.username &&
            signinForm.errors.username !== undefined
          }
          helperText={signinForm.touched.username && signinForm.errors.username}
        />

        <TextField
          type="text"
          placeholder="Display name"
          name="displayName"
          fullWidth
          value={signinForm.values.displayName}
          onChange={signinForm.handleChange}
          color="success"
          error={
            signinForm.touched.displayName &&
            signinForm.errors.displayName !== undefined
          }
          helperText={
            signinForm.touched.displayName && signinForm.errors.displayName
          }
        />

        <TextField
          type="password"
          placeholder="Password"
          name="password"
          fullWidth
          value={signinForm.values.password}
          onChange={signinForm.handleChange}
          color="success"
          error={
            signinForm.touched.password &&
            signinForm.errors.password !== undefined
          }
          helperText={signinForm.touched.password && signinForm.errors.password}
        />

        <TextField
          type="password"
          placeholder="Confirm password"
          name="confirmPassword"
          fullWidth
          value={signinForm.values.confirmPassword}
          onChange={signinForm.handleChange}
          color="success"
          error={
            signinForm.touched.confirmPassword &&
            signinForm.errors.confirmPassword !== undefined
          }
          helperText={
            signinForm.touched.confirmPassword &&
            signinForm.errors.confirmPassword
          }
        />
      </Stack>

      {/*  Displays a loading state when the isLoginRequest state is true. */}
      <LoadingButton
        type="submit"
        fullWidth
        size="large"
        variant="contained"
        sx={{ marginTop: 4 }}
        loading={isLoginRequest}
      >
        Sign up
      </LoadingButton>

      {/* Toggle between the sign-in and sign-up forms.  */}
      <Button fullWidth sx={{ marginTop: 1 }} onClick={() => switchAuthState()}>
        Sign in
      </Button>

      {/* Displayed using the Alert component */}
      {errorMessage && (
        <Box>
          <Alert severity="error" variant="outlined">
            {errorMessage}
          </Alert>
        </Box>
      )}
    </Box>
  );
};

export default SignupForm;
