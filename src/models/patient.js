var mongoose=require('mongoose')
var validator = require('validator')
var jwt = require('jsonwebtoken')
var bcrypt= require('bcryptjs')

const UserSchema= new mongoose.Schema({
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
    DOB:{
        type:String,
        required:true
    },
    gender:{
        type:String,
    },
    address:{
       type:String,
       required:true
    },
    phone_no:{
        type:Number,
        required:true
    },
    tokens:[{ 
        token:{
        type:String,
        required:true
        
        }
    }],
    city:{
        type:String,
    },
    status:{
        type:String
    },
    img:{
        type:String
    },
    country:{
        type:String
    },
    password:{
        type:String,
        required:true,
        minlength:7,
        trim:true
    },
    confirm_pass:{
        type:String,
        required:true,
        minlength:7,
        trim:true
    }
})

UserSchema.pre('save', async function (next) {
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


const User = mongoose.model('patient',UserSchema)
module.exports=User;
  