import React from "react";
import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import GlobalLoading from "components/common/GlobalLoading";
import Footer from "components/common/Footer";
import Topbar from "components/common/Topbar";
import AuthModal from "components/common/AuthModal";

// Used to provide the main layout for the application.
const MainLayout = () => {
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
