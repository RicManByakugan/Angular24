let mongoose = require('mongoose');
let Schema = mongoose.Schema;
const User = require('./user');
const mongoosePaginate = require('mongoose-aggregate-paginate-v2');

let AssignmentSchema = Schema({
    id: { type: Number },
    dateDeRendu: { type: Date, required: true },
    nom: { type: String, required: true },
    rendu: { type: Boolean, required: true },
    matiere: { type: String, required: true },
    remarque: { type: String, required: true },
    note: { type: Number, required: true },
    user: [{ type: Schema.Types.ObjectId, ref: 'User' }]
});

AssignmentSchema.plugin(mongoosePaginate);

// C'est à travers ce modèle Mongoose qu'on pourra faire le CRUD
// assignment est le nom de la collection dans la base de données
// Mongoose tolère certaines erreurs dans le nom (ex: Assignent au lieu de assignments)
module.exports = mongoose.model('assignments', AssignmentSchema);
