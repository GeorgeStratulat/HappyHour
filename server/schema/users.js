var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const Abonamente = require("../schema/abonamente.js");
const Bauturi = require("../schema/bautura.js");
var UserSchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    prenume: String,
    nume: String,
    data_nastere: Date,
    email: String,
    tip_abonament:  [{ type: mongoose.Schema.Types.ObjectId, ref:"Abonamente"}],
    bautura_zi: Boolean,
    lista_bauturi:  [{ type: mongoose.Schema.Types.ObjectId, ref:"Bauturi"}],
    parola: String
});
var Users = mongoose.model("Users", UserSchema);

module.exports = Users;