var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var indexRouter = require("./routes/index");
// var usersRouter = require("./routes/users");
// var authRouter = require("./routes/auth");
var expRouter = require("./routes/experiences");
var testRouter = require("./routes/test")
// var reviewRouter = require("./routes/review");
const mongoose = require("mongoose");
const { stack } = require("./routes/users");
require("dotenv").config();
// const passport = require("passport");
const AppError = require("./utils/appError");

mongoose
  .connect(
    "mongodb+srv://AIRTHB-member:!Group6THB@airthb.quotf.mongodb.net/AirTHB-database?retryWrites=true&w=majority",
    {
      // some options to deal with deprecated warning, you don't have to worry about them.
      useCreateIndex: true,
      useNewUrlParser: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("connected to database"));

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var cors = require("cors");
var app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/experiences", expRouter);
app.use("/test", testRouter)

app.route("*").all(function (req, res, next) {
  next(new AppError(404, "Route not found")); //go straight to the middleware
});

// error handler
const errorController = require("./utils/errorController");
app.use(errorController);

module.exports = app;
