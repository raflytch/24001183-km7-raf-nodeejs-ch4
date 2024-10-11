const errorHandling = (err, req, res, next) => {
  res.status(500).json({
    statusCode: 500,
    message: "Internal server error",
    serverMessage: err.message,
  });
};

module.exports = errorHandling;
