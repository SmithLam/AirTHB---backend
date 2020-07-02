const handleCastErrorDB = (err) => {
  const message = `Invalid ${err.path}: ${err.value}`;
  return new AppError(400, message);
};

const handleDuplicateErrorDB = (err) => {
  const value = err.errmsg.match(/(["'])(?:(?=(\\?))\2.)*?\1/);
  const message = `Duplicate field value: ${value[0]}, please try again with different value`;
  return new AppError(400, message);
};

const handleValidationErrorDB = (err) => {
  const errors = Object.values(err.errors).map((el) => el.message);
  const message = `Invalid input data. ${errors.join(". ")}`;
  return new AppError(400, message);
};

module.exports = function (err, req, res, next) {
  console.log(err);
  if (process.env.NODE_ENV !== "development") {
    res
      .status(err.statusCode)
      .json({ status: err.status, message: err.message });
  } else {
    res
      .status(err.statusCode)
      .json({ status: err.status, message: err.message, stack: err.stack });
  }
};
