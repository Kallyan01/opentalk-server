const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  name: {type:String,required:true},
  joindate: Date,
  activedate: Date,
  msgs: Array,
  authcode: String,
  password: String,
  linkvisits: Number,
  ip: String,
  location: Object
});
module.exports = mongoose.model("users", userSchema);
