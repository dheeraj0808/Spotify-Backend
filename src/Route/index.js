const authRoutes = require("./auth/auth.routes");
const userRoutes = require("./User/user.routes");
const musicRoutes = require("./Music/music.routes");
const playlistRoutes = require("./Playlist/playlist.routes");
const likeRoutes = require("./like/like.routes");




module.exports = {
    authRoutes,
    userRoutes,
    musicRoutes,
    playlistRoutes,
    likeRoutes
}
