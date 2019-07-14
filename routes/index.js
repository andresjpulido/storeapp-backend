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

api.get('/employees', EmployeesCtrl.getEmployees)
api.get('/payslips', PayslipsCtrl.getPayslips)
api.get('/payslip/:userid', PayslipsCtrl.getPayslipsByUserId)
api.get('/hours', HoursCtrl.getHours)
api.get('/hours/:userid', HoursCtrl.getHoursByUserId)

api.post('/user', UserCtrl.create)

api.post('/signup', UserCtrl.signUp)
api.post('/signin', UserCtrl.signIn)

api.post('/private', auth, UserCtrl.ok) 

//api.get('/hours', HoursCtrl.getHours)

/* 
api.post('/signup', userCtrl.signUp)
api.post('/signin', userCtrl.signIn)
api.get('/private', auth, (req, res) => {
  res.status(200).send({ message: 'Tienes acceso' })
})
 */
module.exports = api
