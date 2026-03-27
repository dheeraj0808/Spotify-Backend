const express = require("express");
const router = express.Router();
const { createMusic, getAllMusic, getMusicByName, updateMusic, deleteMusic } = require("../controller/music.controller");
const multer = require("multer");

const authMiddleware = require("../middleware/auth.middleware");
const roleMiddleware = require("../middleware/role.middleware");

const upload = multer({
    storage: multer.memoryStorage()
});

router.post("/create", authMiddleware, roleMiddleware("artist"), upload.single("music"), createMusic);
router.get("/all", authMiddleware, roleMiddleware("admin"), getAllMusic);
router.get("/search/:name", authMiddleware, roleMiddleware("user"), getMusicByName);
router.put("/update/:id", authMiddleware, roleMiddleware("artist","admin"), updateMusic);
router.delete("/delete/:id", authMiddleware, roleMiddleware("artist","admin"), deleteMusic);

module.exports = router;