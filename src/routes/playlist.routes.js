const router = require("express").Router();

const playlistController = require("../controller/playlist.controller");

router.post("/create", playlistController.createPlaylist);
router.get("/all", playlistController.getPlaylists);
router.post("/add/:playlistId/:musicId", playlistController.addMusicToPlaylist);
router.delete("/remove/:playlistId/:musicId", playlistController.removeMusicFromPlaylist);
router.get("/with-songs/:playlistId", playlistController.getPlaylistWithSongs);

module.exports = router;