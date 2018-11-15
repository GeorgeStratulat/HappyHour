var mongoose = require("mongoose");
const Users = require("../schema/users.js");
const Abonamente = require("../schema/abonamente.js");

var abonament_user_schema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    user_id: [{ type: mongoose.Schema.Types.ObjectId, ref:"Users"}],
    data_inceput: [{type:Date, default:Date.now}],
    data_sfarsit: Date,
    tip_abonament: [{type:mongoose.Schema.Types.ObjectId, ref:"Abonamente"}]
});
var Abonament = mongoose.model("Abonament", abonament_user_schema);
module.exports = Abonament;