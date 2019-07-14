'use strict'
 
import model from '../models/index' 
 
const { hour } = model;

class Hours{

    static getHours(req, res){ 
        console.log("getHours")
        return hour.findAll().then(hours => res.status(200).send(hours));
    }

    static getHoursByUserId(req, res){ 
        return hour.findAll({
            where: {
              id: 1
            }
          }).then(hours => res.status(200).send(hours));
    }

}
 
export default Hours;