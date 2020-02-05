'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (sequelize, DataTypes) {

  var Order = sequelize.define('order', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    id_customer: DataTypes.INTEGER,
    id_orderStatus: DataTypes.INTEGER,
    createdAt: 'TIMESTAMP',
    updatedAt: 'TIMESTAMP'
  }, {
    sequelize: sequelize,
    //modelName: 'Employee'
    // options
    tableName: 'order'
  });

  Order.associate = function (models) {
    Order.belongsTo(models.customer, {
      foreignKey: 'id_customer'
    });
  };

  console.log("invocacion del modelo order");

  return Order;
};