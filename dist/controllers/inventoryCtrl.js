'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _index = require('../models/index');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var inventoryModel = _index2.default.inventoryModel,
    size = _index2.default.size,
    productType = _index2.default.productType;

var Inventory = function () {
  function Inventory() {
    _classCallCheck(this, Inventory);
  }

  _createClass(Inventory, null, [{
    key: 'createEntry',

    /* 
    TODO agregar la transaccion para ingresar primero el movimiento y despues hacer la actualizacion en el inventario 
    */
    value: function createEntry(req, res) {

      console.log("req.body::", req.body);
      var _req$body = req.body,
          amount = _req$body.amount,
          idSize = _req$body.idSize,
          idProductType = _req$body.idProductType;
      var userId = req.params.userId;


      var inventoryModelObj = {
        amount: amount,
        id_size: idSize,
        id_productType: idProductType
      };

      return inventoryModel.create(inventoryModelObj).then(function (inv) {
        return res.status(201).send({
          message: 'inventory ' + inv.id + ' has been created successfully ',
          inv: inv
        });
      }).catch(function (err) {
        console.log(" se petaquio esta joda", err);
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
      return inventoryModel.findAll({
        include: [size, productType],
        order: [[productType, 'name', 'ASC'], [size, 'name', 'ASC']]
      }).then(function (inventory) {
        return res.status(200).send(inventory);
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

  return Inventory;
}();

exports.default = Inventory;