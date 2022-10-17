const mongoose = require("mongoose");


const AssureurSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    téléphone: {
        type:Number
    },
    salaire: {
        type: Number,
    },
},{timestamps:true});
const Assureur = mongoose.model("Assureur", AssureurSchema);

module.exports = Assureur;
