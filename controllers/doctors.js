var patient = require('../src/models/patient')
var Assets = require('../src/models/assets')
var employee = require('../src/models/employee')
var holidays = require('../src/models/holidays')
var doctors = require('../src/models/doctor')
var departments = require('../src/models/departments')
var appointment = require('../src/models/appointment');
const Appointment = require("../src/models/appointment");
const Employee = require('../src/models/employee')
const User = require('../src/models/users')
const sharp = require('sharp')

exports.doctor=(req,res)=>{
    res.render('doctor/index.pug')
}