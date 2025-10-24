const errorHandler = (err, req, res, next) => {
  statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    Message: err.msg,
    Status: err.status,
    "Status Code": statusCode,
    Stack: err.stack,
  });
};

module.exports = errorHandler;
