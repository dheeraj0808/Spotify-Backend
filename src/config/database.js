const { Sequelize } = require("sequelize");
//{sequalize} : Sequelize class from sequelize package 
//if we use sequelize, we need to install it first using npm install sequelize
//then create a instance of sequelize like this 
//const sequelize = new Sequelize.Sequelize("database", "user", "password");
//Sequelize.DataTypes.STRING :-datatype k liye




const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT || 3306,
        dialect: "mysql",
        logging: false,
        // Cloud databases like Aiven require SSL connection to work
        ...(process.env.DB_HOST && process.env.DB_HOST.includes('aivencloud') ? {
            dialectOptions: {
                ssl: {
                    require: true,
                    rejectUnauthorized: false
                }
            }
        } : {})
    }
);

sequelize.authenticate()
    .then(() => {
        console.log("Database connected successfully");
    })
    .catch((err) => {
        console.log("Database connection error:", err);
    });

module.exports = sequelize;