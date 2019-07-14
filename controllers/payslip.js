'use strict'
 
import model from '../models/index' 
 
const { payslip } = model;

class Payslips{

    static getPayslips(req, res){ 
        console.log("getPayslips")
        return payslip.findAll().then(payslips => res.status(200).send(payslips));
    }

    static getPayslipsByUserId(req, res){         
        console.log("getPayslipsByUserId " + req.params.userid)

        if(!req.params.userid){
            return res.status(404).send({
                message: 'No records',
              })
        }

        return payslip.findAll({
            where: {
              id_employee: req.params.userid
            }
          }).then(payslips => res.status(200).send(payslips));
    }

    static getHoursByUserId(req, res){ 
        return payslip.findAll({
            where: {
              id_employee: req.params.userid
            }
          }).then(payslips => res.status(200).send(payslips));
    }

}
 
export default Payslips;