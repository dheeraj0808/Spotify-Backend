const { DataTypes } = require("sequelize");
const sequelize = require("../config/database.js");

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
      len: [6, 100]
    }
  },

  role: {
    type: DataTypes.ENUM("user", "artist", "admin"),
    defaultValue: "user",
    allowNull: false
  },

  otp: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: null
  },

  otpExpiry: {
    type: DataTypes.DATE,
    allowNull: true,
    defaultValue: null
  },

  isOtpVerified: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    allowNull: false
  },

  isBlocked: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    allowNull: false
  }

}, {
  tableName: "users",
  timestamps: true
});

module.exports = User;