import React, { useEffect } from "react";
import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import GlobalLoading from "components/common/GlobalLoading";
import Footer from "components/common/Footer";
import Topbar from "components/common/Topbar";
import AuthModal from "components/common/AuthModal";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import userApi from "api/modules/user.api";
import favoriteApi from "api/modules/favorite.api";
import { setListFavorites, setUser } from "redux/features/userSlice";

// Used to provide the main layout for the application.
const MainLayout = () => {
  // Send actions to the Redux store.
  const dispatch = useDispatch();

  // Get the state of a part of the store - user.
  const { user } = useSelector((state) => state.user);

  // Call an API and update the state of the user when the page is loaded for the first time or when dispatch changes.
  useEffect(() => {
    // Call an API.
    const authUser = async () => {
      // Call an API using the userApi library and retrieve the result from the API.
      const { response, err } = await userApi.getInfo();

      // Update the state of the user.
      if (response) dispatch(setUser(response));

      // Set the state of the user to null.
      if (err) dispatch(setUser(null));
    };

    authUser();
  }, [dispatch]);

  // Call an API and update the state of the favorites list when user or dispatch changes.
  useEffect(() => {
    // Call an API.
    const getFavorites = async () => {
      // Call an API using the favoriteApi library and retrieve the result from the API.
      const { response, err } = await favoriteApi.getList();

      // Update the state of the favorites list.
      if (response) dispatch(setListFavorites(response));

      // An error message is displayed.
      if (err) toast.error(err.messages);
    };

    // Called to retrieve the user's list of favorites.
    if (user) getFavorites();

    // Update the state of the favorites list to an empty array.
    if (!user) dispatch(setListFavorites([]));
  }, [user, dispatch]);

  return (
    <>
      {/**global loading */}
      <GlobalLoading />
      {/**global loading */}

      {/**login modal */}
      <AuthModal />
      {/**login modal*/}

      <Box display="flex" minHeight="100vh">
        {/** header */}
        <Topbar />
        {/** header */}

        {/**main */}

        <Box component="main" flexGrow={1} overflow="hidden" minHeight="100vh">
          <Outlet />
        </Box>

        {/**main */}
      </Box>

      {/** footer */}
      <Footer />
      {/** footer */}
    </>
  );
};

export default MainLayout;
