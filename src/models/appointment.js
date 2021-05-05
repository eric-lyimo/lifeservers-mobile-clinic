const mongoose = require('mongoose')

const AppointmentSchema = mongoose.Schema({
    user_name:{
        type:String,
        required:true
    },
    department:{
        type:String,
        required:true
    },
    staff_name:{
        type:String,
        required:true
    },
    Date:{
        type:String,
        required:true
    },
    email:{
        type:String,
        
    },
    phone_number:{
        type:Number,
        required:true
    },
    message:{
        type:String
    },
    status:{
        type:String,
        required:true
    },
    id:{
        type:String,
        required:true
    },
    time:{
        type:Number,
        required:true
    }
})

const Appointment=mongoose.model('Appointment',AppointmentSchema);
module.exports=Appointment;