'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (sequelize, DataTypes) {

  var Payslip = sequelize.define('payslip', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    employeeid: DataTypes.INTEGER,
    description: DataTypes.STRING,
    creation_date: DataTypes.DATE,
    createdAt: 'TIMESTAMP',
    updatedAt: 'TIMESTAMP'
  }, {
    //sequelize,
    //modelName: 'Employee'
    // options
    tableName: 'payslip'
  });

  Payslip.associate = function (models) {
    Payslip.belongsTo(models.employee, {
      foreignKey: 'employeeid'
    });
  };

  console.log("invocacion del modelo Payslip");

  return Payslip;
};