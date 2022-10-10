const mongoose = require("mongoose");


const AssureurSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: Date,
        required: true,
        unique: true,
    },
    téléphone: {
        type:number
    },
    salaire: {
        type: number,
    },
},{timestamps:true});
const Assureur = mongoose.model("Assureur", AssureurSchema);

module.exports = Assureur;
