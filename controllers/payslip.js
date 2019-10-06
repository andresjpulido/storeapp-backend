'use strict'
 
import model from '../models/index' 
 
const { payslip } = model;

class Payslips{

  static create(req, res) {

    const { description, employeeid, isprocessed} = req.body
    const { userId } = req.params
 
    //TODO obtener los identificadores de los registros de las horas para enlazarlos al payslip

    return payslip
      .create({
        description, isprocessed, employeeid
      })
      .then(emp => res.status(201).send({
        message: `payslip ${description} has been created successfully `,
        emp
      }))
      .catch(function (err) {
        console.log(" se petaquio esta joda", err)
        return res.status(500).send({
          success: 'false',
          code: "CODE",
          message: 'Error' + err
        })
      }
      )
  }

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
              employeeid: req.params.userid
            }
          }).then(payslips => res.status(200).send(payslips));
    }

    static getHoursByUserId(req, res){ 
        return payslip.findAll({
            where: {
              employeeid: req.params.userid
            }
          }).then(payslips => res.status(200).send(payslips));
    }



    static getPayslipsById(req, res){
      
      console.log("req.params.payslipid " + req.params.payslipid)
      if(!req.params.payslipid){
        return res.status(404).send({
            message: 'No records',
          })
      }

      //TODO hacer la sumatoria de todas las horas disponibles para un empleado en particular
      
      return payslip.findAll({
        where: {
          id: req.params.payslipid
        }
      }).then(payslips => res.status(200).send(payslips));

    }

}
 
export default Payslips;