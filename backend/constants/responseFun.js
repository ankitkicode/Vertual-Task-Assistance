// utils/response.js (Enhanced Response Helper)

// Success Response
exports.success = (res, message, data = {}) => {
    res.status(200).json({
      success: true,
      message,
      data,
    });
  };
  
  // Error Response
  exports.error = (res, message, statusCode = 400) => {
    res.status(statusCode).json({
      success: false,
      message,
    });
  };
  
  // Validation Error Response
  exports.validationError = (res, errors) => {
    res.status(422).json({
      success: false,
      message: "Validation Error",
      errors,
    });
  };
  
  // Unauthorized Response
  exports.unauthorized = (res, message = "Unauthorized access") => {
    res.status(401).json({
      success: false,
      message,
    });
  };
  
  // Forbidden Response
  exports.forbidden = (res, message = "Forbidden access") => {
    res.status(403).json({
      success: false,
      message,
    });
  };
  
  // Not Found Response
  exports.notFound = (res, message = "Resource not found") => {
    res.status(404).json({
      success: false,
      message,
    });
  };
  
  // Server Error Response
  exports.serverError = (res, message = "Internal Server Error") => {
    res.status(500).json({
      success: false,
      message,
    });
  };


  // how to use this code in express.js
//   const { success, error, unauthorized, notFound } = require("../utils/response");
// // Example Usage in Controller
// if (!user) return notFound(res, "User not found");
// if (!isAuthorized) return unauthorized(res, "Invalid token");
// success(res, "Data fetched successfully", { user });
  