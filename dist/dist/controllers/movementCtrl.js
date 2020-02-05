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

var Sequelize = require("sequelize");

var movementModel = _index2.default.movementModel,
    size = _index2.default.size,
    productType = _index2.default.productType,
    operation = _index2.default.operation;

var Movement = function () {
  function Movement() {
    _classCallCheck(this, Movement);
  }

  _createClass(Movement, null, [{
    key: 'new',

    /* 
    TODO agregar la transaccion para ingresar primero el movimiento y despues hacer la actualizacion en el inventario 
    */
    value: function _new(req, res) {

      console.log("req.body::", req.body);
      var _req$body = req.body,
          amount = _req$body.amount,
          idSize = _req$body.idSize,
          idProductType = _req$body.idProductType,
          username = _req$body.username,
          idOperation = _req$body.idOperation;
      var userId = req.params.userId;

      movementModel.sequelize.query('CALL movement (:requested_amount, :idSize, :idProductType, :idOperation, :username)', { replacements: { requested_amount: amount, idSize: idSize, idProductType: idProductType,
          idOperation: idOperation, username: username } }).then(function (movement) {
        return res.status(200).send(movement);
      }).catch(function (err) {
        console.log(" se petaquio esta joda", err);
        return res.status(500).send({
          success: 'false',
          code: "CODE",
          message: 'Error' + err
        });
      });
    }
  }, {
    key: 'report',
    value: function report(req, res) {

      console.log("req.body::", req.body);
      var _req$params = req.params,
          date1 = _req$params.date1,
          date2 = _req$params.date2;
      var userId = req.params.userId;

      var dateStr = date1.split("-");
      date1 = dateStr[0] + "/" + dateStr[1] + "/" + dateStr[2];
      dateStr = date2.split("-");
      date2 = dateStr[0] + "/" + dateStr[1] + "/" + dateStr[2];

      movementModel.sequelize.query('select ot.name as namePiece, s.name as "sizepiece",  sum(mov.amount) as totalPieces from movement mov  inner join "productType" ot on mov."id_productType" = ot."id"  inner join "size" s on mov.id_size = s."id"  where mov."createdAt" between :date1 and :date2  group by ot.name, s.name  order by ot.name,s.name', { replacements: { date1: date1, date2: date2 }, type: movementModel.sequelize.QueryTypes.SELECT }).then(function (p) {
        return res.status(200).send(p);
      }).catch(function (err) {
        console.log("Error:", err);
        return res.status(500).send({
          success: 'false',
          code: "CODE",
          message: 'Error' + err
        });
      });
    }

    /*
    TODO Agregar metodo para obtener el historial de todos los movimientos generados en un periodo en particular
    */

  }, {
    key: 'findAll',
    value: function findAll(req, res) {
      return movementModel.findAll({
        include: [size, productType, operation],
        order: [[productType, 'name', 'ASC'], [size, 'name', 'ASC']]
      }).then(function (movement) {
        return res.status(200).send(movement);
      }).catch(function (err) {
        console.log(" se petaquio esta joda", err);
        return res.status(500).send({
          success: 'false',
          code: "CODE",
          message: 'Error' + err
        });
      });
    }
  }, {
    key: 'findBetween',
    value: function findBetween(req, res) {
      console.log("req.body::", req.params);
      var _req$params2 = req.params,
          date1 = _req$params2.date1,
          date2 = _req$params2.date2;
      var userId = req.params.userId;

      var dateStr = date1.split("-");
      date1 = dateStr[0] + "/" + dateStr[1] + "/" + dateStr[2];
      dateStr = date2.split("-");
      date2 = dateStr[0] + "/" + dateStr[1] + "/" + dateStr[2];

      return movementModel.findAll({
        include: [size, productType, operation],
        order: [[productType, 'name', 'ASC'], [size, 'name', 'ASC']],
        where: {
          "createdAt": _defineProperty({}, Sequelize.Op.between, [date1, date2])
        }
      }).then(function (movement) {
        return res.status(200).send(movement);
      }).catch(function (err) {
        console.log(" se petaquio esta joda", err);
        return res.status(500).send({
          success: 'false',
          code: "CODE",
          message: 'Error' + err
        });
      });
    }
  }]);

  return Movement;
}();

exports.default = Movement;