const mongoose =require('mongoose');


const analyseSchma=mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
})

module.exports=mongoose.model('analyse',analyseSchma);