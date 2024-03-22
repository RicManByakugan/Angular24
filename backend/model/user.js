const mongoose = require('mongoose');
let Schema = mongoose.Schema;

let userSchema = Schema({
    email: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, required: true },
});

module.exports = mongoose.model('User', userSchema);