const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const User = sequelize.define("User", {

  name: {
    type: DataTypes.STRING,
    allowNull: false
  },

  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true
    },
    set(value) {
      this.setDataValue('email', value.toLowerCase());
    }
  },

  password: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: [6, 20]
    }
  },

  role: {
    type: DataTypes.ENUM("user", "artist", "admin"),
    defaultValue: "user",
    allowNull: false
  }

}, {
  tableName: "users",
  timestamps: true
});

module.exports = User;