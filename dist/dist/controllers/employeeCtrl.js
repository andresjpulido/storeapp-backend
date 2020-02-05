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

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

var employee = _index2.default.employee;

var Employees = function () {
  function Employees() {
    _classCallCheck(this, Employees);
  }

  _createClass(Employees, [{
    key: 'getEmployeeFromReq',
    value: function getEmployeeFromReq(req) {
      var employee = {
        firstName: req.body.firstName,
        lastName: req.body.lastName

      };

      return employee;
    }
  }], [{
    key: 'create',
    value: function create(req, res) {

      console.log("req.body::", req.body);
      var _req$body = req.body,
          firstName = _req$body.firstName,
          lastName = _req$body.lastName,
          movil = _req$body.movil,
          address = _req$body.address,
          typeDocument = _req$body.typeDocument,
          document = _req$body.document,
          birthDate = _req$body.birthDate,
          ird = _req$body.ird,
          email = _req$body.email,
          position = _req$body.position,
          bankName = _req$body.bankName,
          accountNumber = _req$body.accountNumber;
      var userId = req.params.userId;

      var employeeObj = {
        firstName: firstName,
        lastName: lastName,
        movil: movil,
        address: address,
        typeDocument: typeDocument,
        document: document,
        birthDate: birthDate,
        ird: ird,
        email: email,
        position: position,
        bankName: bankName,
        accountNumber: accountNumber
      };

      return employee.create(employeeObj).then(function (emp) {
        return res.status(201).send({
          message: 'Employee ' + emp.firstName + ' has been created successfully ',
          emp: emp
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
  }, {
    key: 'findAll',
    value: function findAll(req, res) {
      return employee.findAll().then(function (employees) {
        return res.status(200).send(employees);
      });
    }
  }, {
    key: 'modify',
    value: function modify(req, res) {
      var _req$body2 = req.body,
          title = _req$body2.title,
          author = _req$body2.author,
          description = _req$body2.description,
          quantity = _req$body2.quantity;

      return employee.findAll({
        where: {
          id: req.params.idEmp
        }
      }).then(function (book) {

        if (book.length == 0) {
          console.log("empleado encontrado");
          res.status(400).send({ "message": "Employee not found" });
        }

        book.update({
          title: title || book.title,
          author: author || book.author,
          description: description || book.description,
          quantity: quantity || book.quantity
        }).then(function (updatedBook) {
          res.status(200).send({
            message: 'Book updated successfully',
            data: {
              title: title || updatedBook.title,
              author: author || updatedBook.author,
              description: description || updatedBook.description,
              quantity: quantity || updatedBook.quantity
            }
          });
        }).catch(function (error) {
          console.log(error);
          res.status(400).send(error);
        });
      }).catch(function (error) {
        console.log(error);
        res.status(400).send(error);
      });
    }
  }, {
    key: 'remove',
    value: function remove(req, res) {

      return employee.findAll({
        where: {
          id: req.params.idEmp
        }
      }).then(function (employeesFound) {

        if (employeesFound.length == 0) {
          console.log("empleado encontrado");
          res.status(400).send({ message: "Employee not found" });
        }

        employee.destroy({
          where: {
            id: req.params.idEmp
          }
        });

        res.status(200).send({
          message: 'Emp successfully deleted'
        });
      }).catch(function (error) {
        return res.status(400).send(error);
      });
    }
  }]);

  return Employees;
}();

exports.default = Employees;