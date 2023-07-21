import React, { useEffect, useState } from "react";
import { Box, LinearProgress, Paper, Toolbar } from "@mui/material";
import { useSelector } from "react-redux";
import Logo from "./Logo";

// Display a linear progress bar and a notification box when loading global data for the application.
const GlobalLoading = () => {
  // Get the value of globalLoading from the Redux store.
  const { globalLoading } = useSelector((state) => state.globalLoading);

  // Manage the state of the linear progress bar.
  const [isLoading, setIsLoading] = useState(false);

  // Track the value of globalLoading.
  useEffect(() => {
    if (globalLoading) {
      setIsLoading(true);
    } else {
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    }
  }, [globalLoading]);

  return (
    <>
      <Paper
        sx={{
          opacity: isLoading ? 1 : 0,
          pointerEvents: "none",
          transition: "all .3s ease",
          position: "fixed",
          width: "100vw",
          height: "100vh",
          zIndex: 999,
        }}
      >
        <Toolbar />
        <LinearProgress />
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <Logo />
        </Box>
      </Paper>
    </>
  );
};

export default GlobalLoading;
