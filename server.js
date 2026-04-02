require("dotenv").config();
const app = require("./src/app");
const sequelize = require("./src/config/database.js");

const User = require("./src/model/user.model");
const Music = require("./src/model/music.model");
const Playlist = require("./src/model/playlist.model");
const Like = require("./src/model/like.model");

// Define Associations
User.hasMany(Music, { foreignKey: 'artist', as: 'uploadedMusic' });
Music.belongsTo(User, { foreignKey: 'artist', as: 'artistDetails' });

User.hasMany(Playlist, { foreignKey: 'userId' });
Playlist.belongsTo(User, { foreignKey: 'userId' });

// Playlist <-> Music (Many-to-Many) Pivot Table: 'PlaylistMusic'
Playlist.belongsToMany(Music, { through: 'PlaylistMusic', as: 'songs' });
Music.belongsToMany(Playlist, { through: 'PlaylistMusic', as: 'playlists' });

User.hasMany(Like, { foreignKey: 'userId' });
Like.belongsTo(User, { foreignKey: 'userId' });

Music.hasMany(Like, { foreignKey: 'musicId' });
Like.belongsTo(Music, { foreignKey: 'musicId' });

const PORT = process.env.PORT;

sequelize.sync().then(() => {
    app.listen(process.env.PORT, () => {
        console.log("Server running on port " + process.env.PORT);
    });
}).catch((err) => {
    console.error("Failed to sync database:", err.message);
    process.exit(1);
});
// in this code sequilize.sync() will create all the tables in the database
// and then the server will start listening on the specified port