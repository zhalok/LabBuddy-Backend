const mongoose = require("mongoose");
const examSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  topic: {
    type: String,
    required: true,
  },
  creator: {
    type: mongoose.Schema.ObjectId,
    required: true,
  },
  startsAt: {
    type: Number,
    required: true,
  },
  endsAt: {
    type: Number,
    required: true,
  },
});

const examModel = mongoose.model("exam", examSchema);

module.exports = examModel;
