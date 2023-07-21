import React, { cloneElement, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import MenuIcon from "@mui/icons-material/Menu";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import WbSunnyOutlinedIcon from "@mui/icons-material/WbSunnyOutlined";
import {
  AppBar,
  Box,
  Button,
  IconButton,
  Stack,
  Toolbar,
  useScrollTrigger,
} from "@mui/material";
import { themeModes } from "configs/theme.configs";
import { setThemeMode } from "redux/features/themeModeSlice";
import Logo from "./Logo";
import menuConfigs from "configs/menu.configs";
import { Link } from "react-router-dom";
import UserMenu from "./UserMenu";
import { setAuthModalOpen } from "redux/features/authModalSlice";

// Defines a functional component called ScrollAppBar that takes two props - children and window.
const ScrollAppBar = ({ children, window }) => {
  // Select the themeMode property from the Redux store.
  const { themeMode } = useSelector((state) => state.themeMode);

  // Create a trigger that detects when the user has scrolled beyond a certain threshold.
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 50,
    target: window ? window() : undefined,
  });

  // Clone the children element and add the new sx property.
  return cloneElement(children, {
    sx: {
      color: trigger
        ? "text.primary"
        : themeMode === themeModes.dark
        ? "primary.contrastText"
        : "text.primary",
      backgroundColor: trigger
        ? "background.paper"
        : themeMode === themeModes.dark
        ? "transparent"
        : "background.paper",
    },
  });
};

// Defines a Topbar component.
const Topbar = () => {
  // Select the user, appState, and themeMode properties from the Redux store.
  const { user } = useSelector((state) => state.user);
  const { appState } = useSelector((state) => state.appState);
  const { themeMode } = useSelector((state) => state.themeMode);

  // Define a sidebarOpen state.
  const [sidebarOpen, setSidebarOpen] = useState(false);

  //  Get the dispatch function.
  const dispatch = useDispatch();

  // Switch between dark and light theme modes.
  const onSwithTheme = () => {
    const theme =
      themeMode === themeModes.dark ? themeModes.light : themeModes.dark;
    dispatch(setThemeMode(theme));
  };

  return (
    <>
      <ScrollAppBar window={undefined}>
        <AppBar elevation={0} sx={{ zIndex: 9999 }}>
          <Toolbar
            sx={{ alignItems: "center", justifyContent: "space-between" }}
          >
            <Stack direction="row" spacing={1} alignItems="center">
              <IconButton
                color="inherit"
                sx={{ mr: 2, display: { md: "none" } }}
              >
                <MenuIcon />
              </IconButton>

              <Box sx={{ display: { xs: "inline-block", md: "none" } }}>
                <Logo />
              </Box>
            </Stack>

            {/* Main menu */}
            <Box
              flexGrow={1}
              alignItems="center"
              display={{ xs: "none", md: "flex" }}
            >
              <Box sx={{ marginRight: "30px" }}>
                <Logo />
              </Box>

              {/* Creates a button for each item in the array. */}
              {menuConfigs.main.map((item, index) => (
                <Button
                  key={index}
                  sx={{
                    color: appState.includes(item.state)
                      ? "primary.contrasText"
                      : "inherit",
                    mr: 2,
                  }}
                  component={Link}
                  to={item.path}
                  variant={appState.includes(item.state) ? "contained" : "text"}
                >
                  {item.display}
                </Button>
              ))}

              {/* Creates a Button component for each item in the main array.  */}
              <IconButton sx={{ color: "inherit" }} onClick={onSwithTheme}>
                {themeMode === themeModes.dark && <DarkModeOutlinedIcon />}
                {themeMode === themeModes.light && <WbSunnyOutlinedIcon />}
              </IconButton>
            </Box>
            {/* Main menu */}

            {/* User menu */}
            <Stack spacing={3} direction="row" alignItems="center">
              {!user && (
                <Button
                  variant="contained"
                  onClick={() => dispatch(setAuthModalOpen(true))}
                >
                  sign in
                </Button>
              )}
            </Stack>
            {user && <UserMenu />}
            {/* User menu */}
          </Toolbar>
        </AppBar>
      </ScrollAppBar>
    </>
  );
};

export default Topbar;
