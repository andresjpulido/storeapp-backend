'use strict'; 

/*
import model from '../models/index'
const { inventoryModel } = model;
*/
//import inventoryModel from './inventory'

export default (sequelize, DataTypes) => {
 
  const Size = sequelize.define('size', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: DataTypes.STRING, 
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE    
  }, {
    sequelize,
    //modelName: 'Employee'
    // options
    tableName: 'size'
  });

  Size.associate = function(models) {
     Size.hasMany(models.inventoryModel,{
       foreignKey: 'id'
     })
  };

  console.log("invoke Size model")

   
  

  return Size;
};
 