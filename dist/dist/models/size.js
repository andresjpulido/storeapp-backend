'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (sequelize, DataTypes) {

  var Size = sequelize.define('size', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: DataTypes.STRING,
    createdAt: 'TIMESTAMP',
    updatedAt: 'TIMESTAMP'
  }, {
    sequelize: sequelize,
    //modelName: 'Employee'
    // options
    tableName: 'size'
  });

  Size.associate = function (models) {
    Size.hasMany(models.inventoryModel, {
      foreignKey: 'id'
    });
  };

  console.log("invoke Size model");

  return Size;
};