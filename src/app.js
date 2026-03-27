const express = require("express");
require("dotenv").config();
const cookieParser = require("cookie-parser");
const cors = require("cors");

const authRoutes = require("./routes/auth.routes");
const userRoutes = require("./routes/user.routes");
const musicRoutes = require("./routes/music.routes");
const playlistRoutes = require("./routes/playlist.routes.js");

const app = express();

app.use(cors({
    origin: ["http://localhost:5173", "http://localhost:5172"],
    credentials: true,
}));
app.use(express.json());
app.use(cookieParser());


app.use("/api/auth", authRoutes);
app.use("/api", userRoutes);
app.use("/api", musicRoutes);
app.use("/api", playlistRoutes);

module.exports = app;