const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Like = sequelize.define("Like", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    musicId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },

},
    {
        timestamps: true
    });

module.exports = Like;
