const router = require("express").Router();
const playlistController = require("../controller/playlist.controller");
const authMiddleware = require("../middleware/auth.middleware");

router.post("/create", authMiddleware, playlistController.createPlaylist);
router.get("/all", authMiddleware, playlistController.getPlaylists);
router.post("/add/:playlistId/:musicId", authMiddleware, playlistController.addMusicToPlaylist);
router.delete("/remove/:playlistId/:musicId", authMiddleware, playlistController.removeMusicFromPlaylist);
router.get("/with-songs/:playlistId", authMiddleware, playlistController.getPlaylistWithSongs);

module.exports = router;