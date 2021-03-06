'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (sequelize, DataTypes) {

  var Hour = sequelize.define('hour', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    id_emp: DataTypes.INTEGER,
    activity: DataTypes.STRING,
    isPaid: DataTypes.BOOLEAN,
    start_date: DataTypes.DATE,
    end_date: DataTypes.DATE,
    amount: DataTypes.INTEGER,
    createdAt: 'TIMESTAMP',
    updatedAt: 'TIMESTAMP'
  }, {
    sequelize: sequelize,
    //modelName: 'Employee'
    // options
    tableName: 'hour'
  });

  Hour.associate = function (models) {
    // associations can be defined here
  };

  console.log("invocacion del modelo hour");

  return Hour;
};