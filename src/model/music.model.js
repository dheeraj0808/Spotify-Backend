const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Music = sequelize.define("Music", {

  uri: {
    type: DataTypes.STRING,
    allowNull: false
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },

  artist: {
    type: DataTypes.STRING,
    references: {
      model: "User",
      key: "id"
    },
    allowNull: false
  },

  album: {
    type: DataTypes.STRING,
    allowNull: false
  },

  genre: {
    type: DataTypes.STRING,
    allowNull: false
  },

  duration: {
    type: DataTypes.INTEGER,
    allowNull: false
  },

  url: {
    type: DataTypes.STRING,
    allowNull: false
  },

  image: {
    type: DataTypes.STRING,
    allowNull: false
  },

  lyrics: {
    type: DataTypes.TEXT,
    allowNull: false
  },

  releaseDate: {
    type: DataTypes.DATE,
    allowNull: false
  },

  createdAt: {
    type: DataTypes.DATE,
    allowNull: false
  },

  updatedAt: {
    type: DataTypes.DATE,
    allowNull: false
  }

}, {
  timestamps: true
});

module.exports = Music;