const router = require("express").Router();
const authMiddleware = require("../../middleware/auth.middleware");
const roleMiddleware = require("../../middleware/role.middleware");
const likeController = require("./like.controller");

router.post("/like", authMiddleware, likeController.likeMusic);
router.post("/unlike", authMiddleware, likeController.unlikeMusic);
router.get("/liked/:userId", authMiddleware, likeController.getLikedMusic); 

module.exports = router;
