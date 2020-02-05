'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (sequelize, DataTypes) {

  var Status = sequelize.define('status', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: DataTypes.STRING,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
  }, {
    sequelize: sequelize,
    //modelName: 'Employee'
    // options
    tableName: 'orderStatus'
  });

  Status.associate = function (models) {
    // associations can be defined here
  };

  console.log("invocacion del modelo status");

  return Status;
};