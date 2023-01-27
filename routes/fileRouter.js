var express = require("express");
var router = express.Router();
const multer = require("multer");
const fileController = require("../controllers/fileController");
const path = require("path");

var storage = multer.diskStorage({
  destination: (req, file, callBack) => {
    callBack(null, "./uploads/");
  },
  filename: (req, file, callBack) => {
    callBack(
      null,
      file.originalname
      //   file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});
var upload = multer({
  storage: storage,
});

router.post("/upload", upload.single("file"), fileController.uploadFile);
module.exports = router;
