'use strict'; 

export default (sequelize, DataTypes) => {
 
  const Employee = sequelize.define('employee', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    movil: DataTypes.STRING,
    address: DataTypes.STRING,
    typeDocument: DataTypes.STRING,
    document: DataTypes.STRING,
    birthDate: DataTypes.DATE,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE     
  }, {
    sequelize,
    //modelName: 'Employee'
    // options
    tableName: 'employee'
  });

  Employee.associate = function(models) { 
    // associations can be defined here
  };  

  console.log("invocacion del modelo employee")

  return Employee;
};
 