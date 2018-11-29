var mongoose = require("mongoose");
const Venue = require("../schema/venue.js");
var BauturaSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    nume: String,
    cantitate: Number,
    tip: String,
    // locatie: [{type: mongoose.Schema.Types.ObjectId, ref:"Venue"}],
    locatie: String,
    imagine: String

    
});
var Bautura = mongoose.model("Bautura", BauturaSchema);
module.exports = Bautura;