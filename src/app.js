const express = require("express");
const userRoutes = require("./routes/auth.routes");
const musicRoutes = require("./routes/music.routes");

const app = express();

app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/api/music", musicRoutes);

module.exports = app;