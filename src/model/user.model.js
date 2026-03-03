const { DataTypes } = require("sequelize");
const sequelize = require("../db");

const User = sequelize.define("User", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    first_name: {
        type: DataTypes.STRING,
        allowNull: true
    },
    last_name: {
        type: DataTypes.STRING,
        allowNull: true
    },
    email: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: true
    },
    role_id: {
        type: DataTypes.INTEGER,
        defaultValue: 1 // Assuming 1 for regular user
    },
    role: {
        type: DataTypes.ENUM('user', 'artist'),
        defaultValue: 'user'
    },
    isActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    },
    isVerified: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
}, {
    tableName: "users",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: false // matching original schema which only had created_at
});

// Sync the model with the database
User.sync()
    .then(() => console.log("Users table ensured in database"))
    .catch(err => console.error("Error creating users table:", err.message));

module.exports = User;