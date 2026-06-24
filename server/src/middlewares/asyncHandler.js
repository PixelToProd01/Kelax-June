/**
 * Wraps async controllers to catch errors automatically
 * and forward them to the global error middleware
 */

const asyncHandler = (fn) => {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};

export default asyncHandler;
