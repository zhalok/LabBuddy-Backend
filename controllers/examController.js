const catchAsync = require("../utils/catchAsync");
// const { parse } = require("csv-parse");
const csv = require("csv-parser");
const fs = require("fs");
// const examModel = require();
const examModel = require("../models/examModel");
const questionModel = require("../models/questionModel");
const examQuestionModel = require("../models/examQuestion");
const examController = {};

examController.createExam = catchAsync(async (req, res, next) => {});
examController.createExamFromCSV = catchAsync(async (req, res, next) => {
  //   const records = [];
  //   console.log(req.file);
  const records = [];
  const user = req.user;
  let { title, duration, topic } = req.body;
  // console.log(title, startsAt, endsAt);
  //   duration = parseFloat(duration);
  const exam = await examModel.create({
    creator: user._id,
    title,
    topic: topic,
    startsAt: Date.now(),
    endsAt: Date.now() + 1 * 60 * 1000,
  });
  //   console.log(exam);
  //   console.log(req.user);
  //   console.log(req.file.originalname);

  fs.createReadStream(`uploads/${req.file.originalname}`)
    .pipe(csv())
    .on("data", (row) => {
      //   console.log(row);
      records.push(row);
      //   console.log(row);
    })
    .on("end", async () => {
      //   console.log(records);
      //   for (let i = 0; i < records.length; i++) console.log(records[i].Question);

      for (let i = 0; i < records.length; i++) {
        const question = await questionModel.create({
          statement: records[i].Question,
          option1: records[i].A,
          option2: records[i].B,
          option3: records[i].C,
          option4: records[i].D,
          ans: records[i].Ans,
        });
        await examQuestionModel.create({
          exam_id: exam._id,
          question_id: question._id,
        });
      }
      console.log("CSV file successfully processed");
    });

  res.json({
    message: "kahani khatam",
  });
  //   fs.createReadStream("uploads/file-1674834686309.csv")
  //     .pipe(csv())
  //     .on("data", (row) => {
  //       console.log(row);
  //     })
  //     .on("end", () => {
  //       console.log("CSV file successfully processed");
  //     });
  //   res.end();
});

module.exports = examController;
