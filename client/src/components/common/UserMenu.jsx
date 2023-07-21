import React, { useState } from "react";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import { useDispatch, useSelector } from "react-redux";
import {
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Menu,
  Typography,
} from "@mui/material";
import menuConfigs from "configs/menu.configs";
import { Link } from "react-router-dom";
import { setUser } from "redux/features/userSlice";

// Displays a user menu.
const UserMenu = () => {
  //  Initializes the variables user, dispatch, and anchorEl.
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState(null);

  // Sets the anchorEl variable to the current target of the event passed as a parameter.
  const toggleMenu = (e) => setAnchorEl(e.currentTarget);
  return (
    <>
      {user && (
        <>
          <Typography
            variant="h6"
            sx={{ cursor: "pointer", userSelect: "none" }}
            onClick={toggleMenu}
          >
            {user.displayName}
          </Typography>
          <Menu
            open={Boolean(anchorEl)}
            anchorEl={anchorEl}
            onClose={() => setAnchorEl(null)}
            PaperProps={{ sx: { padding: 0 } }}
          >
            {/* Display the items in the menu. */}
            {menuConfigs.user.map((item, index) => (
              <ListItemButton
                component={Link}
                to={item.path}
                key={index}
                onClick={() => setAnchorEl(null)}
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText
                  disableTypography
                  primary={
                    <Typography textTransform="uppercase">
                      {item.display}
                    </Typography>
                  }
                />
              </ListItemButton>
            ))}

            {/* Log out the user. */}
            <ListItemButton
              sx={{ borderRadius: "10px" }}
              onClick={() => dispatch(setUser(null))}
            >
              <ListItemIcon>
                <LogoutOutlinedIcon />
              </ListItemIcon>
              <ListItemText
                disableTypography
                primary={
                  <Typography textTransform="uppercase">sign out</Typography>
                }
              />
            </ListItemButton>
          </Menu>
        </>
      )}
    </>
  );
};

export default UserMenu;
