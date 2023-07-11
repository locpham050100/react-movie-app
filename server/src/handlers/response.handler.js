/**
 * Takes a response object, a status code, and some data to be sent as a JSON response.
 * @param {*} res
 * @param {*} statusCode
 * @param {*} data
 * @returns
 */
const responseWithData = (res, statusCode, data) =>
  res.status(statusCode).json(data);

/**
 * Method sends a response with a status code of 500 and a message indicating that something went wrong on the server.
 * @param {*} res
 * @returns
 */
const error = (res) =>
  responseWithData(res, 500, {
    status: 500,
    message: "Oops! Something went wrong!",
  });

/**
 * Method sends a response with a status code of 400 and a message that is passed as an argument to the method.
 * @param {*} res
 * @param {*} message
 * @returns
 */
const badrequest = (res, message) =>
  responseWithData(res, 400, {
    status: 400,
    message,
  });

/**
 * Method sends a response with a status code of 200 and some data to be sent as a JSON response.
 * @param {*} res
 * @param {*} data
 * @returns
 */
const ok = (res, data) => responseWithData(res, 200, data);

/**
 * Method sends a response with a status code of 201 and some data to be sent as a JSON response.
 * @param {*} res
 * @param {*} data
 * @returns
 */
const created = (res, data) => responseWithData(res, 201, data);

/**
 * Method sends a response with a status code of 401 and a message indicating that the user is unauthorized to access the requested resource.
 * @param {*} res
 * @returns
 */
const unauthorize = (res) =>
  responseWithData(res, 401, {
    status: 401,
    message: "Unathorized",
  });

/**
 * Method sends a response with a status code of 404 and a message indicating that the requested resource was not found.
 * @param {*} res
 * @returns
 */
const notfound = (res) =>
  responseWithData(res, 404, {
    status: 404,
    message: "Resource not found",
  });

export default {
  error,
  badrequest,
  ok,
  created,
  unauthorize,
  notfound,
};
