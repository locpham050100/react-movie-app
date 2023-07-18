import { useEffect, useRef } from "react";

/**
 * Takes a value as input and returns the previous value of that input.
 * @param {*} value
 * @returns
 */
const usePrevious = (value) => {
  // Creates a mutable object that persists for the lifetime of the component.
  const ref = useRef();

  // Update the ref with the current value of the input whenever the input value changes.
  useEffect(() => {
    ref.current = value;
  }, [value]);

  // The previous value is returned.
  return ref.current;
};

export default usePrevious;
