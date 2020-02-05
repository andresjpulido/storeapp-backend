'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (sequelize, DataTypes) {

  var User = sequelize.define('user', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    lastlogin: 'TIMESTAMP',
    createdAt: 'TIMESTAMP',
    updatedAt: 'TIMESTAMP'
  }, {
    sequelize: sequelize,
    tableName: 'user'
  });

  User.associate = function (models) {
    User.belongsTo(models.employee, {
      foreignKey: 'id_employee'
    });
  };

  return User;
};