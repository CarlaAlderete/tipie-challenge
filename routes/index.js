const express = require('express')
const router = express.Router()
const userControllers=require('../controllers/userControllers')
const payrollControllers=require('../controllers/payrollControllers')

router.route('/user/addUser')
.post(userControllers.addUser)

router.route('/user/signin')
.post(userControllers.singInUser)

router.route('/payroll')
.get(payrollControllers.getPayroll)

module.exports = router