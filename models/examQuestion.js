const mongoose = require("mongoose");
const examQuestionSchema = mongoose.Schema({
  exam_id: mongoose.Schema.ObjectId,
  question_id: mongoose.Schema.ObjectId,
});

const examQuestionModel = mongoose.model("exam_question", examQuestionSchema);

module.exports = examQuestionModel;
