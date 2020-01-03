'use strict'

const express = require('express')
const inventaryCtrl = require('../controllers/inventary')
//const userCtrl = require('../controllers/product')
const utilCtrl = require('../controllers/util')
import EmployeesCtrl from '../controllers/employee'
import PayslipsCtrl from '../controllers/payslip'
import PayslipsPDFCtrl from '../controllers/payslipPDF'
import HoursCtrl from '../controllers/hour'
import UserCtrl from '../controllers/admin/user'
import { url } from 'inspector';
const auth = require('../middlewares/auth')
const api = express.Router()
 
const asyncMiddleware = require('./asyncMiddleware');

api.get('/echo/:echo', utilCtrl.echo)
api.get('/', utilCtrl.test)
api.get('/orders', inventaryCtrl.getOrders)

api.get('/employees', auth, EmployeesCtrl.findAll)
//api.post('/employee', auth, EmployeesCtrl.create)
api.post('/employee', EmployeesCtrl.create)
api.delete('/employees/:idEmp', auth, EmployeesCtrl.remove)
api.put('/employees/:idEmp', auth, EmployeesCtrl.modify)

//api.get('/payslips', PayslipsCtrl.getPayslips)
//api.get('/payslips/:userid', PayslipsCtrl.getPayslipsByUserId)

//return pdf file
api.get('/payslip/:payslipid', PayslipsCtrl.getPayslipsById)
api.get('/payslippdf/:payslipid', PayslipsPDFCtrl.getPayslipsById)
api.post('/payslip', PayslipsCtrl.create)
api.get('/payslips', auth, PayslipsCtrl.getPayslips)

//api.get('/payslip/:payslipid', asyncMiddleware(async (req, res, next) => {
    /* 
      if there is an error thrown in getUserFromDb, asyncMiddleware
      will pass it to next() and express will handle the error;
    */
   //await makepdf({ id: req.params.id })
    
   //res.json('');
//}));
//PayslipsCtrl.getPayslipsById)
 



api.get('/hours', auth, HoursCtrl.getHours)
api.get('/hour/:id', auth, HoursCtrl.getHoursById)
api.get('/hours/:empId/:isPaid', auth, HoursCtrl.getHoursByUserId)
api.post('/hour', auth, HoursCtrl.create)

api.post('/user', auth, UserCtrl.create)

api.post('/signup', UserCtrl.signUp)
api.post('/signin', UserCtrl.signIn)

api.post('/private', auth, UserCtrl.private) 

//api.get('/hours', HoursCtrl.getHours)
 
module.exports = api
