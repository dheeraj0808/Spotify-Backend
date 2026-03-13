const express = require("express");
const router = express.Router();
const { createMusic } = require("../controller/music.controller");

router.post("/create", createMusic);

module.exports = router;