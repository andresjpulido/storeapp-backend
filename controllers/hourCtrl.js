'use strict'
 
import model from '../models/index' 
 
const { hour } = model;

class Hours{

  static create(req, res) {

    const { activity, start_date, stop_date, id_emp} = req.body
    const { userId } = req.params

    console.log(activity, start_date, stop_date, id_emp)

    return hour
      .create({
        activity, start_date, stop_date, id_emp
      })
      .then(emp => res.status(201).send({
        message: `Hour ${activity} has been created successfully `,
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

    static getHours(req, res){ 
        console.log("getHours")
        return hour.findAll().then(hours => res.status(200).send(hours));
    }

    static getHoursById(req, res){ 
      return hour.findAll({
          where: {
            id: 1
          }
        }).then(hours => res.status(200).send(hours));
  }

    static getHoursByUserId(req, res){ 
      console.log(req.params.empId, req.params.isPaid)
     
        return hour.findAll({
            where: {
              id_emp: req.params.empId,
              isPaid: req.params.isPaid
            }
        }).then(hours => res.status(200).send(hours));
    }

    

}
 
export default Hours;