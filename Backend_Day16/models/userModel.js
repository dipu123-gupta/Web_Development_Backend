const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      required: true,
    },
    age:{
        type:Number,
        max:80,
        min:12
    },
    gender:{
      type:String,
      enum:["male","female","other"],
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
