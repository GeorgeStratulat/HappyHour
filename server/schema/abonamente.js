var mongoose = require('mongoose');
var abonamentSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    numar_bauturi: Number,
    numar_bauturi_zilnic: Number
}); 
mongoose.model("Abonamente", abonamentSchema);
module.exports = mongoose.model("Abonamente", abonamentSchema);
