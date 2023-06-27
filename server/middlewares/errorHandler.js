function errorHandler(error, req, res, next) {
  let status;
  let message;

  switch (error.name) {
    case "NotFound":
      status = 404;
      message = "Data not Found";
      break;
    case "AxiosError":
      status = error.response.status;
      message = error.message;
      break;
    case "MidtransError":
      status = 400;
      message = error.ApiResponse.error_messsages[0];
      break;
    case "EmailRequired":
      status = 400;
      message = "Email is required";
      break;
    case "PasswordRequired":
      status = 400;
      message = "Password is required";
      break;
    case "Invalid":
      status = 401;
      message = "Invalid email/password";
      break;
    case "Unauthorized":
    case "JsonWebTokenError":
      status = 401;
      message = "Invalid token";
      break;
    case "Forbidden":
      status = 403;
      message = "You are not authorized";
      break;
    case "AlreadyExist":
      status = 400;
      message = "Email must be unique";
      break;
    case "SequelizeValidationError":
      status = 400;
      message = error.errors[0].message;
      break;
    case "Paid":
      status = 400;
      message = "You've Already Paid";
      break;
    default:
      status = 500;
      message = "Internal Server Error";
      break;
  }
  res.status(status).json({ message });
}

module.exports = errorHandler;
