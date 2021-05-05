let mongoose=require('mongoose')

let commentSchema=mongoose.Schema({
    name:{
        type:String,
        required:true
    },

    comments:{
        type:String,
        required:true
    },
    blog:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'blog'
    },   
    date:{
        type:Date,
        default:Date.now
    }
})
let comments=mongoose.model('comments',commentSchema)
module.exports=comments