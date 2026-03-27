const { DataTypes } = require("sequelize");
const sequelize = require("../config/database.js");

const Playlist = sequelize.define("Playlist", {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING,
        allowNull: true
    },
    image: {
        type: DataTypes.STRING,
        allowNull: true
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
},
    {
        tableName: "playlists",
        timestamps: true
    });

module.exports = Playlist;