const express = require("express");
require("dotenv").config();
const cookieParser = require("cookie-parser");
const cors = require("cors");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");

const authRoutes = require("./routes/auth.routes");
const userRoutes = require("./routes/user.routes");
const musicRoutes = require("./routes/music.routes");
const playlistRoutes = require("./routes/playlist.routes.js");
const likeRoutes = require("./routes/like.routes");

const app = express();

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
    message: "Too many requests from this IP, please try again after 15 minutes",
});



app.use(cors({
    origin: ["http://localhost:5173", "http://localhost:5172"],
    credentials: true,
}));
app.use(express.json());
app.use(cookieParser());
app.use(helmet())
app.use(limiter)

app.use("/api/auth", authRoutes);
app.use("/api", userRoutes);
app.use("/api", musicRoutes);
app.use("/api", playlistRoutes);
app.use("/api", likeRoutes);

module.exports = app;