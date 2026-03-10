const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {

  const header = req.headers.authorization;

  if (!header) {
    return res.json({ message: "Token required" });
  }

  const token = header.split(" ")[1];

  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  req.user = decoded;

  next();
};