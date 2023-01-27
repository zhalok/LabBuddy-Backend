const mongoose = require("mongoose");
const questionSchema = mongoose.Schema({
  statement: {
    type: String,
    required: true,
  },
  option1: {
    type: String,
    required: true,
  },
  option2: {
    type: String,
    required: true,
  },
  option3: {
    type: String,
    required: true,
  },
  option4: {
    type: String,
    required: true,
  },
  ans: {
    type: String,
    required: true,
  },
});

const questionModel = mongoose.model("questions", questionSchema);
module.exports = questionModel;
