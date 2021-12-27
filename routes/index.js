const express = require('express')
const router = express.Router()
// const passport= require('passport')
const userControllers=require('../controllers/userControllers')
const payrollControllers=require('../controllers/payrollControllers')
// const validator = require('../controllers/validator')

router.route('/user/addUser')
.post(userControllers.addUser)

router.route('/user/signin')
.post(userControllers.singInUser)

router.route('/payroll')
.get(payrollControllers.getPayroll)

module.exports = router