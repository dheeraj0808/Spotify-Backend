require("dotenv").config();
const app = require("./src/app");
const sequelize = require("./src/config/db");

const PORT = 3000;

sequelize.sync().then(() => {
    app.listen(PORT, () => {
        console.log("Server running on port " + PORT);
    });
}).catch((err) => {
    console.error("Failed to sync database:", err.message);
    process.exit(1);
});
//in this code sequilize.sync() will create all the tables in the database
// and then the server will start listening on the specified port