var express = require('express');
var router= express.Router();
var doctorController=require('../controllers/doctors')

router.use(express.json());
router.use(express.urlencoded());

router.get('/doctor',doctorController.doctor)

module.exports=router