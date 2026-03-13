const express = require("express");
const router = express.Router();
const { createMusic } = require("../controller/music.controller");
const multer = require("multer");

const upload = multer({
    storage:multer.memoryStorage()
});

router.post("/create", upload.single("music"), createMusic);

module.exports = router;