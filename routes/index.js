'use strict'

const express = require('express')

//const userCtrl = require('../controllers/product')
const utilCtrl = require('../controllers/util')
import EmployeesCtrl from '../controllers/employeeCtrl'
import PayslipsCtrl from '../controllers/payslipCtrl'
import PayslipsPDFCtrl from '../controllers/payslipPDFCtrl'
import HoursCtrl from '../controllers/hourCtrl'
import UserCtrl from '../controllers/admin/userCtrl'
import InventoryCtrl from '../controllers/inventoryCtrl'
import SizeCtrl from '../controllers/sizeCtrl'
import ProductTypeCtrl from '../controllers/ProductTypeCtrl'
import MovementCtrl from '../controllers/movementCtrl'
import OperationCtrl from '../controllers/operationCtrl'
import { url } from 'inspector';
const auth = require('../middlewares/auth')
const api = express.Router()
 
const asyncMiddleware = require('./asyncMiddleware');

api.get('/echo/:echo', utilCtrl.echo)
api.get('/', utilCtrl.test)
//api.get('/orders', InventoryCtrl.getOrders)
api.post('/inventory', InventoryCtrl.createEntry)
api.get('/inventory', InventoryCtrl.findAll)

api.get('/operations', OperationCtrl.findAll)

api.get('/sizes', SizeCtrl.findAll)
api.get('/productTypes', ProductTypeCtrl.findAll)
api.get('/movements', MovementCtrl.findAll)
api.post('/movement', MovementCtrl.new)
api.get('/movement/report/:date1/:date2', MovementCtrl.report)

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
api.get('/hours/:username/:isPaid', auth, HoursCtrl.getHoursByUserId)
api.post('/hour', auth, HoursCtrl.create)

api.post('/user', auth, UserCtrl.create)

api.post('/signup', UserCtrl.signUp)
api.post('/signin', UserCtrl.signIn)

api.post('/private', auth, UserCtrl.private) 

//api.get('/hours', HoursCtrl.getHours)
 
module.exports = api
