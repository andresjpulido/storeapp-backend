'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (sequelize, DataTypes) {

  var operationType = sequelize.define('operationType', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: DataTypes.STRING,
    createdAt: 'TIMESTAMP',
    updatedAt: 'TIMESTAMP'
  }, {
    sequelize: sequelize,
    //modelName: 'Employee'
    // options
    tableName: 'operationType'
  });

  operationType.associate = function (models) {
    // associations can be defined here
  };

  console.log("invocacion del modelo operationType");

  return operationType;
};