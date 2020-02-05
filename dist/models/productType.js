'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (sequelize, DataTypes) {

  var productType = sequelize.define('productType', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: DataTypes.STRING,
    createdAt: 'TIMESTAMP',
    updatedAt: 'TIMESTAMP'
  }, {
    sequelize: sequelize,
    //modelName: 'Employee'
    // options
    tableName: 'productType'
  });

  productType.associate = function (models) {
    // associations can be defined here
  };

  console.log("invocacion del modelo ProductType");

  return productType;
};