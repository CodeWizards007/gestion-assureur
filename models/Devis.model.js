const mongoose = require("mongoose");


const DevisSchema = mongoose.Schema({
    titre:{
        type:String,
        required:true
    },
    montant:{
        type:Number,
        required:true
    },
    status:{
        type:String,
        Default:"En attente"
    }
},{timestamps:true});
const Devis = mongoose.model("Devis", DevisSchema);

module.exports = Devis;
