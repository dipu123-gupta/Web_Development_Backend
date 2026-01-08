const jwt = require("jsonwebtoken");
const User = require("../models/userModel");


const authMiddleware = async (req, res, next) => {
  try {
    // const token = req.header("Authorization");
    const { token } = req.cookies;
    if (!token) {
      return res.status(401).json({ message: "Token missing" });
    }

    const payload = jwt.verify(token, process.env.JWT_SECRET);
    const { id } = payload;
    if (!id) {
      throw new Error("Id is missing");
    }
    const user = await User.findById(id);

    if (!user) {
      throw new Error("User Dosen't exists");
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid Token" });
  }
};

module.exports = authMiddleware;
