const mongoose = require("mongoose");


const ConstatsSchema = mongoose.Schema({
titre:{
        type:String,
},
fautif:{
    type:String,
    Enum:["fautif","non-fautif"],
    required:true,
},
 dateAccidents:{
    type:Date,
     default:Date.now()
 },
 emplacement:{
        gouvernement:{
            type:String,
            //required:true
        },
        cite:{
          type:String,
           // required:true
        },
         rue:{
            type:String,
         }
 },
 rapport:{   // dedié au expert
  type:Number,
  },
    montantRembourse:{ // dedié au expert
    type:Number,
    },
    statusRembourssement:{ // dedié au responsable
    type:String,
    enum:["En attente","Remboursé","Non remboursé"],
    default:"En attente"
    },

    images:[
        {
            type:String,
        }
    ],
    devis:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Devis"
    }],
    expertId:{
    type:Number,
    required:true
    },
    responsableId:{
       type:Number,
        required:true
    },
    clientId:{
        type:Number,
        required:true
    }
}, {timestamps:true});


const Constat = mongoose.model("Constat", ConstatsSchema);

module.exports = Constat;
