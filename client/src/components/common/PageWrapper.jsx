import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setAppState } from "../../redux/features/appStateSlice";

/**
 * Update the state of the application through the Redux store when the page is reloaded.
 * @param {*} param0
 * @returns
 */
const PageWrapper = ({ state, children }) => {
  window.scrollTo(0, 0);

  // Get the dispatch object from the Redux store.
  const dispatch = useDispatch();

  // When PageWrapper is rendered, called and sends an action to the Redux store to update the state of the application.
  useEffect(() => {
    dispatch(setAppState(state));
  }, [state, dispatch]);

  // Returns the child components wrapped by PageWrapper.
  return children;
};

export default PageWrapper;
