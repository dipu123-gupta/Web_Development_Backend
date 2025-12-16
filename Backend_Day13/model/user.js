const mongoose = require("mongoose");
// import { function } from './../../MongooseBcrypt_Day11/node_modules/mongodb/src/utils';

const { Schema } = mongoose;

const UserSchema = new Schema({
  firstName: {
    type: String,
    required: [true, "First name is required"],
    minlength: [3, "string ka lenght 3 se kam nhi hona chahiye"],
    maxlength: [20, "string ka length 20 se zyada nhi hona chahiye"],
  },
  lastName: {
    type: String,
  },
  age: {
    type: Number,
    min: 12,
    max: 100,
  },
  gender: {
    type: String,
    enum: ["male", "female", "other"],
  },
  emailId: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    // minlength: 8,
    // maxlength: 20,
  },
});

const User = mongoose.model("user", UserSchema);

module.exports = User;
