'use strict'
 
import model from '../models/index'

const { movementModel, size, productType, operation } = model;

class Movement {
/* 
TODO agregar la transaccion para ingresar primero el movimiento y despues hacer la actualizacion en el inventario 
*/
  static new(req, res) {

    console.log("req.body::" , req.body)
    const { amount, idSize, idProductType, username, idOperation } = req.body
    const { userId } = req.params
 
    movementModel.sequelize
  .query('CALL movement (:requested_amount, :idSize, :idProductType, :idOperation, :username)', 
        {replacements: { requested_amount: amount, idSize: idSize, idProductType: idProductType, 
          idOperation:idOperation, username:username}})
  .then(movement => res.status(200).send(movement))
  .catch(function (err) {
    console.log(" se petaquio esta joda", err)
    return res.status(500).send({
      success: 'false',
      code: "CODE",
      message: 'Error' + err
    })
  })






    /*
    const movementModelObj = {
      amount: amount, 
      id_size: idSize, 
      id_productType: idProductType,
      id_operation: idOperation,
      id_user: idUser
    };
     
    //TODO verify if exits amount of product available
    

    //TODO crear la transaccion para insertar registro en movement y actualizar en inventory

    return movementModel
      .create(movementModelObj)
      .then(inv => res.status(201).send({
        message: `inventory ${inv.id} has been created successfully `,
        inv
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
*/



  }

/*
TODO Agregar metodo para obtener el historial de todos los movimientos generados en un periodo en particular
*/
  static findAll(req, res){
    return movementModel.findAll(
      {
        include:[size, productType, operation],
        order: [
          [productType, 'name', 'ASC'],
          [size, 'name', 'ASC']
        ]
      },
      ).then(movement => res.status(200).send(movement))
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

}

export default Movement;