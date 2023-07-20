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
              main: "#0de30d",
              contrastText: "#f7fef1",
            },
            secondary: {
              main: "#e70de7",
              contrastText: "#f7fef1",
            },
            background: {
              default: "#000000",
              paper: "#050505",
            },
          }
        : {
            primary: {
              main: "#0de30d",
            },
            secondary: {
              main: "#e70de7",
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
