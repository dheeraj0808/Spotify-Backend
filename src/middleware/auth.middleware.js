const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  console.log(req.cookies);
  let token = req.cookies?.token;
  console.log(token);
  // Check Authorization header if cookie is not present
  if (!token && req.headers.authorization) {
    const parts = req.headers.authorization.split(" ");
    if (parts.length === 2 && (parts[0] === "Bearer" || parts[1])) {
      token = parts[1];
    }
  }

  if (!token) {
    return res.status(401).json({ message: "Authentication token required" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};