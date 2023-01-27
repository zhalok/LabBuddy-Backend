const catchAsync = require("../utils/catchAsync");

const csv = require("csv-parser");
const fs = require("fs");
// import {} from asserts
// const storage = multer.diskStorage({
//   destination: "./public/",
//   filename: function (req, file, cb) {
//     cb(null, "IMAGE-" + Date.now() + path.extname(file.originalname));
//   },
// });
// const upload = multer({
//   storage: storage,
//   limits: { fileSize: 1000000 },
// }).single("myfile");

const fileController = {};

// fileController.uploadFile = catchAsync(async (req, res, next) => {
//   const storage = multer.diskStorage({
//     destination: "./public/",
//     filename: function (req, file, cb) {
//       cb(null, "IMAGE-" + Date.now() + path.extname(file.originalname));
//     },
//   });

// const obj = (req, res) => {
//   console.log("nigga");
//   upload(req, res, () => {
//     console.log("Request ---", req.body);
//     console.log("Request file ---", req.file); //Here you get file.
//     const file = new File();
//     file.meta_data = req.file;
//     file.save().then(() => {
//       res.send({ message: "uploaded successfully" });
//     });
//     /*Now do where ever you want to do*/
//   });
// };
//   //   res.json()
// });

fileController.uploadFile = catchAsync(async (req, res, next) => {
  const MIME_TYPE = {
    "image/jpg": "jpg",
    "image/png": "png",
    "image/jpeg": "jpeg",
  };
  // console.log(req.file);

  // Initialize the parser

  fs.createReadStream(`uploads/${req.file.originalname}`)
    .pipe(csv())
    .on("data", (row) => {
      console.log(row);
    })
    .on("end", () => {
      console.log("CSV file successfully processed");
    });
  res.end();
  // console.log(req.file);
  // res.json("hello");
  // res.end();
  // upload(req, res, () => {
  //   console.log("Request ---", req.body);
  //   console.log("Request file ---", req.file); //Here you get file.
  //   const file = new File();
  //   file.meta_data = req.file;
  //   file.save().then(() => {
  //     res.send({ message: "uploaded successfully" });
  //   });
  //   /*Now do where ever you want to do*/
  // });
});

module.exports = fileController;
