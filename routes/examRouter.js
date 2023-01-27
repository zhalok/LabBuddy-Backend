const express = require("express");
// const examController = require("../controllers/examController");
const examController = require("../controllers/examController");
const ensureAuthenticated = require("../middlewares/ensureAuthenticated");
const router = express.Router();
const multer = require("multer");
// const fileController = require("../controllers/fileController");
const path = require("path");
try {
  var storage = multer.diskStorage({
    destination: (req, file, callBack) => {
      callBack(null, "./uploads/");
    },
    filename: (req, file, callBack) => {
      callBack(null, file.originalname);
    },
  });
} catch (e) {
  console.log(e);
}

var upload = multer({
  storage: storage,
});

router.post("/create", ensureAuthenticated, examController.createExam);
router.post(
  "/createFromCSV",
  ensureAuthenticated,
  upload.single("file"),
  examController.createExamFromCSV
);
module.exports = router;
