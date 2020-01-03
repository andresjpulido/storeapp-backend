'use strict'; 

export default (sequelize, DataTypes) => {
 
  const User = sequelize.define('user', {
      id: { 
          type: DataTypes.INTEGER, 
          primaryKey: true, 
          autoIncrement: true
      },     
      username: DataTypes.STRING,
      password: DataTypes.STRING,
      lastlogin: DataTypes.DATE, 
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE    
  }, {
    sequelize,    
    tableName: 'user'
  });

  User.associate = function(models) {
    // associations can be defined here
  };
 
  return User;
};
 