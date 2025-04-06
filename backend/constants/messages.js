const MESSAGES = {
  SUCCESS: {
    DATA_RETRIEVED: "Data retrieved successfully.",
    DATA_SAVED: "Data saved successfully.",
    DATA_UPDATED: "Data updated successfully.",
    DATA_DELETED: "Data deleted successfully.",
    LOGIN_SUCCESS: "Login successful.",
    LOGOUT_SUCCESS: "Logout successful.",
    ACCOUNT_CREATED: "Account created successfully.",
    GENERAL: "The operation was successful.",
    CREATED: "The resource was successfully created.",
    UPDATED: "The resource was successfully updated.",
    DELETED: "The resource was successfully deleted.",
    EMAIL: "Email sent successfully",
    OTP: "OTP sent successfully",
    OTP_VERIFIED: "OTP verified successfully",
    COOKIE: "Logout successful",
    PLAN_CANCEL: "Subscription cancelled successfully",
    TRUE: true,
    FALSE: false,
  },
  
  ERROR: {
    ALREADY_VERIFIED: "Email already verified.",
    OTP_EXPIRED: "OTP has expired.",
    INVALID_OTP: "Invalid OTP provided.",
    NOT_FOUND: "Requested resource not found.",
    INTERNAL_SERVER_ERROR: "Internal server error. Please try again later.",
    VALIDATION_ERROR: "Invalid input data.",
    UNAUTHORIZED: "Unauthorized access.",
    FORBIDDEN: "You do not have permission to perform this action.",
    DUPLICATE_ENTRY: "Duplicate entry found.",
    DATA_NOT_FOUND: "No data found.",
    LOGIN_FAILED: "Invalid credentials, login failed.",
  },
  
  VALIDATION: {
    REQUIRED_FIELD: "This field is required!",
    INVALID_EMAIL: "Please provide a valid email address!",
    PASSWORD_MIN_LENGTH: "Password must be at least 8 characters long!",
    PASSWORD_COMPLEXITY: "Password must include at least one uppercase letter, one lowercase letter, one number, and one special character!",
    INVALID_ID: "The provided ID is invalid.",
    BODY: "Please provide all fields in body!",
    INVALID_PASSWORD: "Invalid credential!",
    TOKEN_NOT_FOUND: "No token provided",
    EXPIRED_TOKEN: "Invalid or expired refresh token",
    VERIFY_EMAIL: "Please verify your email before proceeding.",
    PARAMS: "Provide id in params",
    SUPER_ADMIN: "SuperAdmin user not found",
    PLAN_CANCEL: "No active subscription found",
  }
};

module.exports = MESSAGES;
