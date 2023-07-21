import React from "react";
import { Typography, useTheme } from "@mui/material";
import LogoImg from "../../assets/imgLogo/logoImg.png";

// Renders a logo with the text "WayFlix".
const Logo = () => {
  // Access the theme object, which is used to set the color of the text.
  const theme = useTheme();

  return (
    <Typography
      fontWeight="700"
      fontSize="1.7rem"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <img src={LogoImg} alt="" height="50rem" />
      Way<span style={{ color: theme.palette.primary.main }}>Flix</span>
    </Typography>
  );
};

export default Logo;
