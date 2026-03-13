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
    type: DataTypes.INTEGER,
    references: {
      model: "users",
      key: "id"
    },
    allowNull: false
  },
  

});

module.exports = Music;
//this is the music model used for the music table in the database