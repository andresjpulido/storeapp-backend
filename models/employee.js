'use strict'; 

export default (sequelize, DataTypes) => {
 
  const Employee = sequelize.define('employee', {
    id: { type: DataTypes.INTEGER, primaryKey: true},
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    movil: DataTypes.STRING,
    address: DataTypes.STRING,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE    
  }, {
    //sequelize,
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
 