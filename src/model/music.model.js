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
  

});

module.exports = Music;