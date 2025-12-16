// --------------------------------------------
// 🔐 Middleware: JWT Authentication
// --------------------------------------------
const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    // ✅ Read token from cookies
    const token = req.cookies.token;
    if (!token) throw new Error("No token provided. Please login first.");

    // ✅ Verify token using secret key
    const verified = jwt.verify(token, process.env.SECRET_KEY);

    // ✅ Attach verified user info to request object
    req.user = verified;

    // ✅ Move to next middleware or route
    next();
  } catch (error) {
    res.status(401).send("❌ Unauthorized: " + error.message);
  }
};
