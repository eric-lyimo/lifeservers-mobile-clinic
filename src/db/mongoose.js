const mongoose = require('mongoose')
mongoose.connect(process.env.MONGODB_URL,{
    useNewUrlParser:true,
    useCreateIndex:true,
    useUnifiedTopology:true
},(e,result)=>{
    try {
        if(!e){
            return console.log("succesfully connected")
        }
        throw new error
    } catch (error) {
        console.log(e)
    }
})


module.exports=mongoose;