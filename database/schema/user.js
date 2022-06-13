const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  name: String,
  dept: String,
  msg: Array,
});
module.exports = mongoose.model("users", userSchema);
