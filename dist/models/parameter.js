'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (sequelize, DataTypes) {

  var parameter = sequelize.define('parameter', {
    code: { type: DataTypes.STRING, primaryKey: true },
    label: DataTypes.STRING,
    value: DataTypes.STRING,
    createdAt: 'TIMESTAMP',
    updatedAt: 'TIMESTAMP'
  }, {
    sequelize: sequelize,
    //modelName: 'Employee'
    // options
    tableName: 'parameter'
  });

  parameter.associate = function (models) {};

  console.log("invoke parameter model");

  return parameter;
};