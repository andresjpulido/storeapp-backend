'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _index = require('../models/index');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var hour = _index2.default.hour,
    user = _index2.default.user;

var Hours = function () {
  function Hours() {
    _classCallCheck(this, Hours);
  }

  _createClass(Hours, null, [{
    key: 'create',
    value: function create(req, res) {
      var _req$body = req.body,
          activity = _req$body.activity,
          start_date = _req$body.start_date,
          stop_date = _req$body.stop_date,
          id_emp = _req$body.id_emp,
          amount = _req$body.amount;
      var userId = req.params.userId;


      console.log(activity, start_date, stop_date, id_emp, amount);

      return hour.create({
        activity: activity, start_date: start_date, stop_date: stop_date, id_emp: id_emp, amount: amount
      }).then(function (emp) {
        return res.status(201).send({
          message: 'Hour ' + activity + ' has been created successfully ',
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
    key: 'getHours',
    value: function getHours(req, res) {
      console.log("getHours");
      return hour.findAll().then(function (hours) {
        return res.status(200).send(hours);
      });
    }
  }, {
    key: 'getHoursById',
    value: function getHoursById(req, res) {
      return hour.findAll({
        where: {
          id: 1
        }
      }).then(function (hours) {
        return res.status(200).send(hours);
      });
    }
  }, {
    key: 'getHoursByUserId',
    value: function getHoursByUserId(req, res) {
      console.log(req.params.username, req.params.isPaid);

      hour.sequelize.query('select h.* from hour h inner join employee e on h.id_emp = e.id inner join "user" u on e.id = u.id_employee where u.username = ? ', { replacements: [req.params.username], type: hour.sequelize.QueryTypes.SELECT }).then(function (hours) {
        return res.status(200).send(hours);
      }).catch(function (err) {
        console.log(" se petaquio esta joda", err);
        return res.status(500).send({
          success: 'false',
          code: "CODE",
          message: 'Error' + err
        });
      });

      /*
         return hour.findAll({
             where: {
               id_emp: req.params.empId,
               isPaid: req.params.isPaid
             }
         }).then(hours => res.status(200).send(hours));*/
    }
  }]);

  return Hours;
}();

exports.default = Hours;