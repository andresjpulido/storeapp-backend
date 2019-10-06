'use strict'; 

export default (sequelize, DataTypes) => {
 
  const Payslip = sequelize.define('payslip', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    employeeid: DataTypes.INTEGER,
    description: DataTypes.STRING,
    creation_date: DataTypes.DATE, 
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE    
  }, {
    //sequelize,
    //modelName: 'Employee'
    // options
    tableName: 'payslip'
  });

  Payslip.associate = function(models) {
    // associations can be defined here
  };

  console.log("invocacion del modelo Payslip")

  return Payslip;
};
 