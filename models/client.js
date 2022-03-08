const mongoose =require('mongoose');


const clientSchma=mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    number:{
        type:String,
        required:true
    },
    nameanalyse:[
       nam = {
            type:String,
            required:true

        },
    ],
    priceanalyse:[
        price={
            type:Number,
            required:true
        }
    ],
})

module.exports=mongoose.model('client',clientSchma);