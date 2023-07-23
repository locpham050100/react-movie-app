import React from "react";
import { Box, Modal } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setAuthModalOpen } from "redux/features/authModalSlice";
import Logo from "./Logo";

// Determine the type of action and make corresponding changes to the store.
const actionState = {
  signin: "signin",
  signup: "signup",
};

// Defines a functional component AuthModal.
const AuthModal = () => {
  // Get the authModalOpen state from the store.
  const { authModalOpen } = useSelector((state) => state.authModal);

  // Send actions corresponding to events triggered by the user.
  const dispatch = useDispatch();

  // Determine the current action that the user is performing on the authentication modal.
  const [action, setAction] = useState(actionState.signin);

  // Listen for changes in the authModalOpen state.
  useEffect(() => {
    if (authModalOpen) setAction(actionState.signin);
  }, [authModalOpen]);

  // Dispatch an action to close the authentication modal when called.
  const handleClose = () => dispatch(setAuthModalOpen(false));

  // Switch between the signin and signup actions in the authentication modal.
  const switchAuthState = (state) => setAction(state);

  return (
    <Modal open={authModalOpen} onClose={handleClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "100%",
          maxWidth: "600px",
          padding: 4,
          outline: "none",
        }}
      >
        <Box
          sx={{
            padding: 4,
            boxShadow: 24,
            backgroundColor: "background.paper",
          }}
        >
          <Box sx={{ textAlign: "center", marginBottom: "2rem" }}>
            <Logo />
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};

export default AuthModal;
