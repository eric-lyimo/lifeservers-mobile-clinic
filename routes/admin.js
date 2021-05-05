var express = require('express');
var adminRouters = express.Router();
const adminController = require('../controllers/admin');
const auth = require('../src/auth/auth');
const multer= require('multer')

adminRouters.use(express.json());
adminRouters.use(express.urlencoded({extended:true}));


const upload = multer({
    limits: {
        fileSize: 2000000
    },
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
            return cb(new Error('Please upload an image'))
        }  
        cb(undefined, true)
    }
  })

adminRouters.get('/admin',auth,adminController.admin)
adminRouters.get('/register',adminController.register)
adminRouters.get('/doctors',auth,adminController.doctors)
adminRouters.get('/appointments',auth,adminController.appointment)
adminRouters.get('/add-appointment',auth,adminController.addAppointment)
adminRouters.get('/add-doctor',auth,adminController.addDoctor)
adminRouters.get('/departments',auth,adminController.departments)
adminRouters.get('/add-department',auth,adminController.add_departments)
adminRouters.get('/patients',auth,adminController.patient)
adminRouters.get('/add-patient',auth,adminController.add_patients)
adminRouters.get('/edit-patient',auth,adminController.edit_patient)
adminRouters.get('/employees',auth,adminController.employee)
adminRouters.get('/edit-employee',auth,adminController.edit_employees)
adminRouters.get('/add-employee',auth,adminController.add_employees)

adminRouters.post('/register',adminController.signup)
adminRouters.post('/add-employee',auth,adminController.add_employee)
adminRouters.post('/add-appointment',auth,adminController.add_appointment)
adminRouters.post('/add-department',auth,adminController.add_department)
adminRouters.post('/add-patient',auth,adminController.add_patient)
adminRouters.post('/add-doctor',auth,upload.single('img'),adminController.add_doctor)


module.exports=adminRouters