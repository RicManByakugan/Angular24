const mongoose = require("mongoose");
let Schema = mongoose.Schema;

let subjectSchema = Schema({
  type: { type: String, required: true },
});

module.exports = mongoose.model("Subject", subjectSchema);
