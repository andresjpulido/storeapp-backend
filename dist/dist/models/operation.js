'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (sequelize, DataTypes) {

  var operation = sequelize.define('operation', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: DataTypes.STRING,
    createdAt: 'TIMESTAMP',
    updatedAt: 'TIMESTAMP'
  }, {
    sequelize: sequelize,
    //modelName: 'Employee'
    // options
    tableName: 'operation'
  });

  operation.associate = function (models) {
    operation.hasMany(models.operationType, {
      foreignKey: 'id_operationType'
    });
  };

  console.log("invoke operation model");

  return operation;
};