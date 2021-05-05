let mongoose=require('mongoose')

let blogSchema=mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    blog_img:{
        type:Buffer,
        contentType:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    blog_category:{
        type:String,
        required:true
    },
    blog_tags:{
            type:String,
            required:true
    },   
    author:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'users'
    },
    date:{
        type:Date,
        default:Date.now
    },
})
blogSchema.virtual('comments',{
    ref:'blog',
    localField:'_id',
    foreignField:'blog'
})

let blog=mongoose.model('blog',blogSchema)
module.exports=blog