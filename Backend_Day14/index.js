// ----------------------------------------------------------
//  Express Server Setup with JWT Authentication + Mongoose
// ----------------------------------------------------------

//  Load environment variables first
require("dotenv").config();

//  Import Express framework
const express = require("express");
const app = express();

//  Import cookie-parser to handle cookies
const cookieParser = require("cookie-parser");

//  Import bcryptjs for password encryption
const bcrypt = require("bcryptjs");

//  Import jwt for token creation and verification
const jwt = require("jsonwebtoken");

//  Import database connection
const Database = require("./dataBase");

//  Import User Model (Mongoose Schema)
const User = require("./model/user");

// Import custom user validation function
const ValidateUser = require("./validator/validator");

//  Import authentication middleware
const UserAuth = require("./MiddleWare/UserAuthenticatin");

//  Middleware setup
app.use(express.json()); // To parse incoming JSON data
app.use(cookieParser()); // To read cookies from client requests

//  Define server port from environment variables
const PORT = process.env.PORT || 4000;

// ----------------------------------------------------------
//  REGISTER ROUTE  ➜  /register
// ----------------------------------------------------------
app.post("/register", async (req, res) => {
  try {
    //  Check if user with same email already exists
    const exists = await User.findOne({ email: req.body.email });
    if (exists) return res.status(400).json({ error: "Email already registered" });

    //  Validate user input (name, email, password strength)
    ValidateUser(req.body);

    //  Encrypt (hash) password before saving to database
    req.body.password = await bcrypt.hash(req.body.password, 10);

    //  Create new user in database
    await User.create(req.body);

    res.send(" Registered successfully");
  } catch (error) {
    res.status(400).send(` Error: ${error.message}`);
  }
});

// ----------------------------------------------------------
//  LOGIN ROUTE  ➜  /login
// ----------------------------------------------------------
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // 🔹 Check if user exists in database
    const user = await User.findOne({ email });
    if (!user) throw new Error("User not found");

    // 🔹 Compare entered password with hashed password
    const isAllowed = await bcrypt.compare(password, user.password);
    if (!isAllowed) throw new Error("Invalid credentials");

    // 🔹 Generate JWT token with 1 hour expiry
    const token = jwt.sign(
      { _id: user._id, email: user.email },
      process.env.SECRET_KEY,
      { expiresIn: "1h" }
    );

    // 🔹 Store token in cookie (httpOnly for security)
    res.cookie("token", token, {
      httpOnly: true,
      secure: true,      // only via HTTPS
      sameSite: "strict" // prevent CSRF attacks
    });

    res.send("✅ Login successful");
  } catch (error) {
    res.status(400).send(` ${error.message}`);
  }
});

// ----------------------------------------------------------
//  GET ALL USERS  ➜  /users (Protected Route)
// ----------------------------------------------------------
app.get("/users", UserAuth, async (req, res) => {
  try {
    const users = await User.find();
    res.send(users);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

// ----------------------------------------------------------
//  GET SINGLE USER  ➜  /user (Protected Route)
// ----------------------------------------------------------
app.get("/user", UserAuth, (req, res) => {
  res.send(req.user);
});

// ----------------------------------------------------------
//  UPDATE USER  ➜  /update/:id (Protected Route)
// ----------------------------------------------------------
app.put("/update/:id", UserAuth, async (req, res) => {
  try {
    await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.send(" Updated successfully");
  } catch (error) {
    res.status(400).send(error.message);
  }
});

// ----------------------------------------------------------
//  DELETE USER  ➜  /user/:id (Protected Route)
// ----------------------------------------------------------
app.delete("/user/:id", UserAuth, async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.send(" Deleted successfully");
  } catch (error) {
    res.status(400).send(error.message);
  }
});

// ----------------------------------------------------------
//  CONNECT TO DATABASE & START SERVER
// ----------------------------------------------------------
Database()
  .then(() => {
    console.log(" Database successfully connected");
    app.listen(PORT, () => console.log(` Server running on port ${PORT}`));
  })
  .catch((err) => console.log(" Error connecting to Database:", err.message));
