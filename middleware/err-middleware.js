const errorHandler = (err, req, res, next) => {
  err.statusCode = err.statusCode || 400;
  return res.status(err.statusCode).json({
    Message: err.message,
    Status: err.status,
    "Status Code": err.statusCode,
    Stack: err.stack,
  });
};

module.exports = errorHandler;
