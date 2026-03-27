const router = require("express").Router();

const likeController = require("../controller/like.controller");


router.post("/like", likeController.likeMusic);
router.post("/unlike", likeController.unlikeMusic);
router.get("/liked/:userId", likeController.getLikedMusic); 

module.exports = router;
