let mongoose=require('mongoose')
let validator=require('validator')
let bcrypt=require('bcryptjs')
const jwt = require('jsonwebtoken')

userSchema=mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        require:true,
        minlength:7,
        trim:true
    },
    confirm_pass:{
        type:String,
        require:true,
        minlength:7,
        trim:true
    },
    role:{
        type:String,
        default:'user'
    },
    email:{
        type:String,
        validate(value){
            if (!validator.isEmail(value)){
                throw new error('invalid email')
            }
        }
    },
    phone_no:{
        type:Number,
        required:true,
        trim:true,
        length:10
    },
    tokens:[{
        token:{
            type:String,
            required:true
        }
    }]
})
userSchema.virtual('blog',{
    ref:'blog',
    localField:'_id',
    foreignField:'author'
})

userSchema.pre('save', async function (next) {
    const user = this
    if(!user.password==user.confirm_pass){
        throw new Error('password do not match')
    }
    else if (user.isModified('password') && user.isModified('confirm_pass')) {
        user.password = await bcrypt.hash(user.password, 8)
        user.confirm_pass = await bcrypt.hash(user.confirm_pass, 8)
    }
    next()
})
userSchema.methods.generateAuthToken = async function () {
    const user = this
    const token = jwt.sign({ _id: user._id.toString() }, 'lifeserversmobileclinic')
    user.tokens = user.tokens.concat({ token })
    await user.save()
    return token
}
userSchema.statics.findByCredentials = async (email, password) => {
    const user = await users.findOne({ email })
    if (!user) {
    throw new Error('no user found')
    }
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
    throw new Error('Unable to login')
    }
    return user
}
userSchema.statics.createUser = async function (firstName, lastName, type) {
    try {
      const user = await this.create({ firstName, lastName, type });
      return user;
    } catch (error) {
      throw error;
    }
  }
  
  /**
   * @param {String} id, user id
   * @return {Object} User profile object
   */
  userSchema.statics.getUserById = async function (id) {
    try {
      const user = await this.findOne({ _id: id });
      if (!user) throw ({ error: 'No user with this id found' });
      return user;
    } catch (error) {
      throw error;
    }
  }
  
  /**
   * @return {Array} List of all users
   */
  userSchema.statics.getUsers = async function () {
    try {
      const users = await this.find();
      return users;
    } catch (error) {
      throw error;
    }
  }
  
  /**
   * @param {Array} ids, string of user ids
   * @return {Array of Objects} users list
   */
  userSchema.statics.getUserByIds = async function (ids) {
    try {
      const users = await this.find({ _id: { $in: ids } });
      return users;
    } catch (error) {
      throw error;
    }
  }
  
  /**
   * @param {String} id - id of user
   * @return {Object} - details of action performed
   */
  userSchema.statics.deleteByUserById = async function (id) {
    try {
      const result = await this.remove({ _id: id });
      return result;
    } catch (error) {
      throw error;
    }
  }
  

users=mongoose.model('users',userSchema)
module.exports=users