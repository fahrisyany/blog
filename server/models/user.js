const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const userSchema = new Schema(
  {
    username: {
      type: String,
      required: [true, "username required"],
      unique: [true, "username already registered please input another"]
    },
    email: {
      type: String,
      required: [true, "Please input your Email"],
      unique: [true, "email already registered please input another"]
    },
    password: {
      type: String,
      required: [true, "please input yor password"]
    }
  },
  {
    timestamps: true
  }
);

var User = mongoose.model("User", userSchema);
module.exports = User;
