import { createTheme } from "@mui/material/styles";
import { colors } from "@mui/material";

// Defines two different theme modes.
export const themeModes = {
  dark: "dark",
  light: "light",
};

// Object create a suitable custom theme.
const themeConfigs = {
  custom: ({ mode }) => {
    const customPallete =
      mode === themeModes.dark
        ? {
            primary: {
              main: "#ff0000",
              contrastText: "#ffffff",
            },
            secondary: {
              main: "#f44334",
              contrastText: "#ffffff",
            },
            background: {
              default: "#000000",
              paper: "#131313",
            },
          }
        : {
            primary: {
              main: "#ff0000",
            },
            secondary: {
              main: "#f44336",
            },
            background: {
              default: colors.grey["100"],
            },
          };

    // Method takes a configuration object to create a theme for the application.
    return createTheme({
      // Customize the color for the interface.
      palette: {
        mode,
        ...customPallete,
      },

      // Customize the properties of certain interface components.
      components: {
        MuiButton: {
          defaultProps: { disableElevation: true }, // Button to have no shadow effect when pressed.
        },
      },
    });
  },
};

export default themeConfigs;
