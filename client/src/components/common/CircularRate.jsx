import React from "react";
import { Box, Typography, CircularProgress } from "@mui/material";

//  Display a circular progress indicator (CircularProgress).
const CircularRate = ({ value }) => {
  return (
    <Box
      sx={{
        position: "relative",
        display: "inline-flex",
        width: "max-content",
      }}
    >
      <CircularProgress
        variant="determinate"
        value={value * 10}
        color="success"
        size={50}
      />

      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography
          variant="caption"
          component="div"
          fontWeight="bold"
          sx={{ marginTop: "-5px" }}
        >
          {Math.floor(value * 10) / 10}
        </Typography>
      </Box>
    </Box>
  );
};

export default CircularRate;
