const mongoose = require("mongoose");
// import { type } from "./../../MongoDB_Day8/node_modules/path-to-regexp/dist/index.d";
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    // name: String,
    // age: Number,
    // city: String,
    // gender: String,
    // emailId: String,
    // mobaileNumber: Number,
    firstName: {
      type: String,
      required: true,
      minLength: 3,
      maxLength: 20,
    },
    lastName: {
      type: String,
      // unique: true,
    },
    age: {
      type: Number,
      min: 14,
      max: 70,
    },
    gender: {
      type: String,
      // enum:["male","female","other"]

      validate(value) {
        if (!["male", "female", "other"].includes(value)) {
          throw new Error("invalide gender");
        }
      },
    },
    emailId: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      immutable: true,
    },
    password: {
      type: String,
    },
    city: {
      type: String,
    },
    photo: {
      type: String,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("user", userSchema);

module.exports = User;
