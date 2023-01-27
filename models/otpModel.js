const mongoose = require("mongoose");
const OTPSchema = mongoose.Schema({
  otp: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Schema.ObjectId,
    required: true,
  },
  expiredAt: {
    type: String,
    required: true,
    default: () => Date.now() + 5 * 60 * 1000,
  },
});

const OTPModel = mongoose.model("Otp", OTPSchema);
module.exports = OTPModel;
