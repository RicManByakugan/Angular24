let mongoose = require("mongoose");
let Schema = mongoose.Schema;
const User = require("./user");
const mongoosePaginate = require("mongoose-aggregate-paginate-v2");

let AssignmentSchema = Schema({
  title: { type: String, required: true },
  isDone: { type: Boolean, required: true },
  subject: { type: String, required: true },
  comment: { type: String, required: false },
  score: { type: Number, required: false },
  creationDate: { type: Date, required: false, default: new Date() },
  validationDate: { type: Date, required: false },
  file: { type: String, required: false },
  student: { type: Schema.Types.ObjectId, ref: "User" },
  teacher: { type: Schema.Types.ObjectId, ref: "User" },
});

AssignmentSchema.plugin(mongoosePaginate);

// C'est à travers ce modèle Mongoose qu'on pourra faire le CRUD
// assignment est le nom de la collection dans la base de données
// Mongoose tolère certaines erreurs dans le nom (ex: Assignent au lieu de assignments)
module.exports = mongoose.model("assignments", AssignmentSchema);
