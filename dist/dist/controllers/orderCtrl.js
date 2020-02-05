'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
    }
  }return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
  };
}();

var _index = require('../models/index');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key] = value;
  }return obj;
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

var order = _index2.default.order,
    customer = _index2.default.customer;

var Order = function () {
  function Order() {
    _classCallCheck(this, Order);
  }

  _createClass(Order, null, [{
    key: 'getAll',
    value: function getAll(req, res) {
      return order.findAll({
        include: [customer],
        order: [['id']]
      }).then(function (order) {
        return res.status(200).send(order);
      });
    }
  }, {
    key: 'getOpened',
    value: function getOpened(req, res) {
      var _require = require("sequelize"),
          Op = _require.Op;

      return order.findAll({
        where: _defineProperty({}, Op.or, [{ id_orderStatus: 1 }, { id_orderStatus: 3 }]),
        include: [customer],
        order: [['id']]
      }).then(function (order) {
        return res.status(200).send(order);
      });
    }
  }]);

  return Order;
}();

exports.default = Order;