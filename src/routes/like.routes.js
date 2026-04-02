const router = require("express").Router();
const likeController = require("../controller/like.controller");
const authMiddleware = require("../middleware/auth.middleware");

router.post("/like", authMiddleware, likeController.likeMusic);
router.post("/unlike", authMiddleware, likeController.unlikeMusic);
router.get("/liked/:userId", authMiddleware, likeController.getLikedMusic); 

module.exports = router;
