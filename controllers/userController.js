const OTPModel = require("../models/otpModel");
const userModel = require("../models/userModel");
const catchAsync = require("../utils/catchAsync");
const otp_generator = require("../utils/otp_generator");
const protection = require("../utils/protection");
const send_email = require("../utils/send_email");
const jwt = require("jsonwebtoken");
// const cookie = require("cookie-parser");

const userController = {};
userController.logIn = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  const user = await userModel.findOne({ email });
  if (user) {
    const hashed_password = user.password;
    if (protection.compare(password, hashed_password)) {
      const token_payload = {
        id: user._id,
        userType: user.type,
        email: user.email,
      };
      const token = jwt.sign(token_payload, process.env.JWT_SECRET);
      res.cookie("jwt", token);
      res.status(200).json({
        token: token,
      });
    }
  } else {
    res.status(401).json({
      message: "Invalid Information",
    });
  }
});

userController.signup = catchAsync(async (req, res, next) => {
  const { name, email, password, type } = req.body;
  console.log(name);
  console.log(email);
  console.log(password);
  console.log(type);
  const docs = await userModel.find({ email });
  if (docs.length > 0) {
    res.status(409).json({
      message: "Email already exists",
    });
    return;
  }
  const user = await userModel.create({
    name,
    email,
    password: protection.hash(password),
    type,
    verified: false,
  });
  const { otp, expiration_time } = otp_generator.generate(8);
  await OTPModel.create({
    user: user._id,
    otp,
    expiredAt: expiration_time,
  });
  const message = `<a href="http://localhost:5000/user/verification?otp=${otp}">Verify email<a>`;
  const subject = "Email Verification";
  await send_email(email, subject, message);
  res.status(200).json({
    message: "Please Verify Your Email",
  });
});

userController.verifyUser = catchAsync(async (req, res, next) => {
  const { otp } = req.query;
  console.log(otp);
  const _otp = await OTPModel.find({ otp });
  console.log(_otp);
  //   if (Date.now() <= _otp.expiredAt) {
  //     await userModel.findByIdAndUpdate(
  //       _otp.user,
  //       { verified: true },
  //       { new: true }
  //     );
  //     res.status(401).json({
  //       message: "User Verified",
  //     });
  //   }
  let cur_time = new Date().getTime() / 1000;
  const expiration_time = parseFloat(_otp[0].expiredAt);

  //   console.log(cur_time, _otp[0].expiredAt);
  if (expiration_time > cur_time) {
    await userModel.findByIdAndUpdate(
      _otp[0].user,
      { verified: true },
      { new: true }
    );
    // res.status(401).json({
    //   message: "User Verified",
    // });
    res.status(302).redirect("http://localhost:3000/login");
    return;
  }
  res.status(401).json({
    message: "OTP expired",
  });
});

userController.getUser = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  console.log(req.user);
  const user = await userModel.findById(id);
  res.json(user);
});

userController.getAllUsers = catchAsync(async (req, res, next) => {
  const users = await userModel.find({});
  res.json(users);
});

module.exports = userController;
