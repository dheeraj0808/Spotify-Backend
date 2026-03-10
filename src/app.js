const express = require("express");

// ROUTES
const authRoutes = require("./routes/auth.routes");
const userRoutes = require("./routes/user.routes");
const artistRoutes = require("./routes/artist.routes");
const adminRoutes = require("./routes/admin.routes");
const musicRoutes = require("./routes/music.routes");

const app = express();



// Parse JSON body
app.use(express.json());


// Authentication routes
app.use("/api/auth", authRoutes);

// Normal user routes
app.use("/api/users", userRoutes);

// Artist routes
app.use("/api/artists", artistRoutes);

// Admin routes
app.use("/api/admin", adminRoutes);



app.get("/", (req, res) => {
  res.json({
    message: "Spotify Backend API running "
  });
});


module.exports = app;