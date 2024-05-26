const mongoose = require("mongoose");
const Subject = require("./subject");
let Schema = mongoose.Schema;

let userSchema = Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  role: { type: String, required: true },
  photo: { type: String, required: false, undefined: true },
  subject: { type: Schema.Types.ObjectId, ref: "Subject", undefined: true },
});

module.exports = mongoose.model("User", userSchema);
