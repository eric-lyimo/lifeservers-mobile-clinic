const mongoose = require('mongoose')

const AssetsSchema = mongoose.Schema({
    assets_name:{
        type:String,
        required:true
    },
    purchased_date:{
        type:Date,
        required:true
    },
    purchased_from:{
        type:String,
        required:true
    },
    manufacturer:{
        type:String,
        required:true
    },
    model:{
        type:String,
        required:true
    },
    serialNo:{
        type:String,
    },
    supplier:{
        type:String,
        required:true
    },
    condition:{
        type:String,
        required:true
    },
    warranty:{
        type:String
    },
    description:{
        type:String,
        required:true
    }
})
var Assets=mongoose.model('Assets',AssetsSchema)
module.exports=Assets