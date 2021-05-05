const mongoose = require('mongoose')
const validator=require('validator')
const { request } = require('../../app')
const bcrypt=require('bcryptjs')

const EmployeeSchema = mongoose.Schema({
    first_name:{
         type: String,
         required:true
     },
     last_name:{
         type: String,
         required:true
     },
     user_name:{
         type: String,
         required:true
     },
     email:{
         type:String,
         validate(value){
             if (!validator.isEmail(value)){
                 throw new error('invalid email')
             }
         }
     },
     password:{
        type:String,
        minlength:7,
        trim:true,
        required:true
     },
     
     confirm_pass:{
        type:String,
        minlength:7,
        trim:true,
        required:true
     },
     address:{
        type:String,
     },
     phone_no:{
         type:Number,
         required:true
     },
     join_date:{
         type:String,
         required:true
     },
     role:{
         type:String,
         required:true
     },
     status:{
         type:String
     }
 })
 
EmployeeSchema.pre('save', async function (next) {
    const user = this
    if(user.password===user.confirm_pass){
        if (user.isModified('password') && user.isModified('confirm_pass')) {
        user.password = await bcrypt.hash(user.password, 8)
        user.confirm_pass = await bcrypt.hash(user.confirm_pass, 8)
    }
        
    }
    else{
        throw new Error('password do not match')
    }
    next()
})

 var Employee=mongoose.model('Employee',EmployeeSchema)
 module.exports=Employee