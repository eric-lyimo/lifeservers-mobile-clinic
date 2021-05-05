const mongoose = require('mongoose')
var validator = require('validator')
var bcrypt=require('bcryptjs')

const DoctorSchema = mongoose.Schema({
    first_name:{
        type:String,
        required:true
    },
    last_name:{
        type:String,
        required:true
    },
    user_name:{
        type:String,
        required:true
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
    },
    DOB:{
        type:String,
        required:true
    },
    gender:{
        type:String,
        required:true
    },
    address:{
        type:String,
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
    biography:{
        type: String,
        required:true
    },
    phone_no:{
        type:Number,
        required:true
    },
    education:{
        type:String,
        required:true
    },
    specialist:{
        type:String,
        required:true
    },
    city:{
        type:String
    },
    role:{
        type:String,
        default:'doctor'
    },
    img:{
        type:Buffer
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
    }

})
DoctorSchema.pre('save', async function (next) {
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
DoctorSchema.statics.findByCredentials = async (email, password) => {
    const user = await users.findOne({ email })
    if (!user) {
    throw new Error('Unable to login')
    }
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
    throw new Error('Unable to login')
    }
    return user
}

const Doctor= mongoose.model('Doctor',DoctorSchema)

    module.exports=Doctor