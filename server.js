const dotenv = require("dotenv");
dotenv.config();

const app = require("./src/app");
const db = require("./src/db");
// Connection is already handled in src/db.js



app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`); 
});