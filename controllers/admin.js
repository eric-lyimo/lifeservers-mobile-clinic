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


exports.register=async(req,res)=>{
  res.render('admin/register')
}
exports.signup=async(req,res)=>{
  const user = new User(req.body)
  try {
     await user.generateAuthToken()
      await user.save()
      res.status(201).redirect('/login')
  } catch (e) {
      res.status(400).send(e)
  }
}

exports.appointment=async(req,res)=>{
  appointment.find((err,data)=>{
    if(!err){
      res.render('admin/appointments',{
        appointList:data
      })
    }
    else res.send("an error occured")
  })
}

exports.addAppointment=async(req,res)=>{
  res.render('admin/add-appointment')
}
exports.add_patients=async(req,res)=>{
  res.render('admin/add-patient')
}
exports.add_appointment=async function(req,res,next){
  let doc=new appointment(req.body)
    try {
      await doc.save()
      res.status(201).redirect('/admin')
    } catch (e) {
     res.status(400).send(e)
  }
}

exports.edit_patient=async(req,res)=>{
  res.render('admin/edit-patient')
}

exports.patient=(req,res)=>{
  patient.find((err,data)=>{
    if(!err){
      res.render("admin/patients",{
        patientList:data
      })
    }
    else console.log('found an error')
  })
}

exports.add_patient=async function(req,res,next){
  let doc=new patient(req.body)
    try {
      await doc.save()
      res.status(201).redirect('/patients')
    } catch (e) {
     res.status(400).send(e)
  }
}

exports.add_departments=async(req,res)=>{
  res.render('admin/add-department')
}

exports.departments=async(req,res)=>{
  departments.find((err,data)=>{
    if(!err){
      res.render('admin/departments',{
        departList:data
      })
      console.log(data)
    }
    else console.log("an error occured")
  }) 
}

exports.add_department=async function(req,res,next){
  let doc=new departments(req.body)
    try {
      await doc.save()
      res.status(201).redirect('/departments')
    } catch (e) {
     res.status(400).send(e)
  }
}


exports.doctors=(req,res)=>{
  doctors.find((err,doc)=>{
    if(!err){
    res.render('admin/doctors',{
        doc
     })
    }
    else{console.log("error")}
  })
}

exports.addDoctor=(req,res)=>{
  res.render('admin/add-doctor')
}

exports.add_doctor=async(req,res)=>{
  const buffer=await sharp(req.file.buffer).resize({width:250,height:250}).png().toBuffer()
  const thumb=new Buffer.from(buffer).toString('base64')
    try {
      const doct = new doctors(req.body)
      doct.img=thumb
        await doct.save()
        res.status(201).redirect('/doctors')
    } catch (e) {
        res.status(400).send(e)
    }
  }

  exports.employee=(req,res)=>{
    Employee.find((err,data)=>{
      if(!err){
        res.render('admin/employees',{
          employeeList:data
        })
      }
      else console.log("an error occured")
    })
  }
  exports.edit_employees=(req,res)=>{
    res.render('admin/edit-employee')
  }
  exports.add_employees=(req,res)=>{
    res.render('admin/add-employee')
  }
  exports.add_employee=async(req,res)=>{
    const doct = new Employee(req.body)
    try {
        await doct.save()
        res.status(201).redirect('/employees')
    } catch (e) {
        res.status(400).send(e)
    }
  }

exports.admin=function(req,res,next){
  departments.find((err,docs)=>{
    if(err) return next(err)
  }).then((doc)=>{
    let departList=doc
    patient.find((err,patData)=>{
      if(err)return next(err)
    }).then((patData)=>{
      let patientList=patData
       appointment.find((err,data)=>{
         if(err)return next(err)
       }).then((data)=>{
        let appointList=data
        user=req.session.admin
         doctors.find((err,dr)=>{
             res.render('admin/admin',{
               departList,
               patientList,
               patientlength:patientList.length,
               appointList,
               appointlength:appointList.length,
               doctorList:dr,
               drlength:dr.length,
               user
             })
         })
       })
    })
  })
}

