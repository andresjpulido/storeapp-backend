'use strict'

function getInventary(req, res){

    var inv = [{
        sec: 1,
        typeName: "drops",
        size: "Small",
        amount: new Date()
      }]
    
      inv.push({
        sec: 2,
        typeName: "Toki",
        size: "Small",
        amount: new Date()
      }); 
    
      inv.push({
        sec: 3,
        typeName: "manaia",
        size: "Small",
        amount: new Date()
      });
     
     
      return res.status(200).send({
        success: 'true',
        message: 'todo retrieved successfully',
        inv,
      }); 
}

function getOrders(req, res){

    var orders = [{
        sec: 1,
        orderId: 1,
        productName: "Toki",
        creationDate: new Date(),
        note: "New"
      }]
    
      orders.push({
        sec: 2,
        orderId: 1,
        productName: "Manaia",
        creationDate: new Date(),
        note: "New"
      });
    
      orders.push({
        sec: 3,
        orderId: 2,
        productName: "Toki",
        creationDate: new Date(),
        note: "Repair"
      });
     
     
      return res.status(200).send({
        success: 'true',
        message: 'todo retrieved successfully',
        orders,
      }); 
}

function deleteProductById(req, res){

}

function getProducts(req, res){

}

function getOrderByIdClient(req, res){
  return res.status(200).send({
    success: 'true',
    message: 'todo retrieved successfully',
    orders,
  }); 
}

module.exports = {
    getInventary, getOrders, deleteProductById, getProducts
}