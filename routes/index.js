'use strict'

const express = require('express')
const inventaryCtrl = require('../controllers/inventary')
const userCtrl = require('../controllers/product')
const utilCtrl = require('../controllers/util')
import EmployeesCtrl from '../controllers/employee'
import PayslipsCtrl from '../controllers/payslip'
import HoursCtrl from '../controllers/hour'
import UserCtrl from '../controllers/admin/user'
import { url } from 'inspector';
const auth = require('../middlewares/auth')
const api = express.Router()
 
api.get('/echo/:echo', utilCtrl.echo)
api.get('/', utilCtrl.test)
api.get('/orders', inventaryCtrl.getOrders)

api.get('/employees', auth, EmployeesCtrl.findAll)
//api.post('/employee', auth, EmployeesCtrl.create)
api.post('/employee', EmployeesCtrl.create)
api.delete('/employees/:idEmp', auth, EmployeesCtrl.remove)
api.put('/employees/:idEmp', auth, EmployeesCtrl.modify)

api.get('/payslips', PayslipsCtrl.getPayslips)
api.get('/payslips/:userid', PayslipsCtrl.getPayslipsByUserId)
api.get('/payslip/:payslipid', PayslipsCtrl.getPayslipsById)
api.post('/payslip', PayslipsCtrl.create)

api.get('/hours', HoursCtrl.getHours)
api.get('/hour/:id', HoursCtrl.getHoursById)
api.get('/hours/:userid/:isPaid', HoursCtrl.getHoursByUserId)
api.post('/hour', HoursCtrl.create)

api.post('/user', UserCtrl.create)

api.post('/signup', UserCtrl.signUp)
api.post('/signin', UserCtrl.signIn)

api.post('/private', auth, UserCtrl.private) 

//api.get('/hours', HoursCtrl.getHours)
 
module.exports = api
