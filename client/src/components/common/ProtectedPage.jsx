import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setAuthModalOpen } from "redux/features/authModalSlice";

/**
 * Conditionally renders child components based on whether the user is authenticated or not.
 * @param {*} param0
 * @returns
 */
const ProtectedPage = ({ children }) => {
  // Get the dispatch object from the Redux store.
  const dispatch = useDispatch();

  // Get the user value from the Redux store.
  const { user } = useSelector((state) => state.user);

  // Called to dispatch an action to the Redux store to update the authentication modal status.
  useEffect(() => {
    dispatch(setAuthModalOpen(!user));
  }, [user, dispatch]);

  return user ? children : null;
};

export default ProtectedPage;
