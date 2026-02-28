const app = require("./src/app");
const dotenv = require("dotenv");
const db = require("./src/db");

dotenv.config();
db.connect();



app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});