const mongoose = require('mongoose')
 const HolidaysSchema = mongoose.Schema({
    holiday_name:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        required:true
    }
})
 var Holidays=mongoose.model('Holidays',HolidaysSchema)
 module.exports=Holidays
