const express = require("express");
const { createLab } = require("../controllers/labControllers");
const router = express.Router();

router.route('/create').post(createLab);
router.route('/join').post(createLab);
router.route('/leave').post(createLab);
router.route('/delete').post(createLab);

module.exports=router;