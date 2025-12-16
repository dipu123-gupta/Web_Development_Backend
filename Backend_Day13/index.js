const express = require("express");
// import { Log } from './../MongooseBcrypt_Day11/node_modules/mongoose/types/expressions.d';
const main = require("./dataBase");
const User = require("./model/user");
const ValidateUser = require("./validator/validator");
const bcrypt = require("bcrypt");
const app = express();
app.use(express.json());
const PORT = 4000;

//! register user 
app.post("/register", async (req, res) => {
  try {
    // req.body.password = await bcrypt.hash(req.body.password, 10);
    //! req.body ke ander data aaya hai , usmein firstName present hona chahiye
    ValidateUser(req.body);
    req.body.password = await bcrypt.hash(req.body.password, 10);

    const users = await User.create(req.body);
    res.send("Registed Successfully");
  } catch (error) {
    res.send(error.message);
  }
});

//! login user
app.post("/login", async (req, res) => {
  try {
    const people = await User.findById(req.body._id);
    console.log(people);
    // res.send(people)

    if (!(req.body.emailId === people.emailId)) {
      throw new Error("Invalid credentials");
    }

    const IsAllowed = await bcrypt.compare(req.body.password, people.password);
    if (!IsAllowed) throw new Error("Invalid credentials");

    res.send("Login successfully");
  } catch (error) {
    res.send(error.message);
  }
});

//! find all user
app.get("/user", async (req, res) => {
  try {
    const users = await User.find();
    res.send(users);
  } catch (error) {
    res.send(error.message);
  }
});

//! find user by id
app.get("/user/:id", async (req, res) => {
  try {
    const user = await User.findById(req.body._id);
    if (!user) {
      res.send("User not found");
    } else {
      res.send(user);
    }
  } catch (error) {
    res.send(error.message);
  }
});

//! update data 
app.put("/user/:id", async (req, res) => {
  try {
    const update = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.send("Update successfully");
  } catch (error) {
    res.send(error.message);
  }
});

//! delete data
app.delete("/user/:id", async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
});

main()
  .then(async () => {
    console.log("Database connected Successfully");

    app.listen(PORT, () => {
      console.log("Server Running on port number: 4000");
    });
  })
  .catch(() => console.log("error"));
