const mongoose = require('mongoose')

const Departments = mongoose.Schema({
    department_name:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    status:{
        type:String,
    }
})
let departments=mongoose.model('departments',Departments)
module.exports=departments