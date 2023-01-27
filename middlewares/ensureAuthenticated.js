const { promisify } = require("util");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const catchAsync = require("./../utils/catchAsync");
const appError = require("../utils/appError");

const ensureAuthenticated = catchAsync(async (req, res, next) => {
  try {
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    } else if (req.cookies.jwt) {
      token = req.cookies.jwt;
    } else {
      return next(new appError("You are not logged in", 401));
      // res.status(401).json
    }

    if (!token) {
      return next(new appError("You are not logged in", 401));
    }
    var decoded;

    decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
  } catch (err) {
    return next(new appError("You are not logged in", 401));
  }

  const currentUser = await User.findById(decoded.id);

  if (!currentUser) {
    return next(
      new appError(
        "The user belonging to this token does no longer exists",
        401
      )
    );
  }

  req.user = currentUser;

  next();
});

module.exports = ensureAuthenticated;
