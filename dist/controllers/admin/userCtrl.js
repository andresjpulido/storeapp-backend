'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _index = require('../../models/index');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var service = require('../../services');

var user = _index2.default.user;

var Users = function () {
  function Users() {
    _classCallCheck(this, Users);
  }

  _createClass(Users, null, [{
    key: 'create',
    value: function create(req, res) {

      if (!req.body.username) {
        return res.status(400).send({
          success: 'false',
          message: 'username is required'
        });
      } else if (!req.body.password) {
        return res.status(400).send({
          success: 'false',
          message: 'password is required'
        });
      }

      var _req$body = req.body,
          username = _req$body.username,
          password = _req$body.password;
      var id = req.params.id;


      user.create({
        username: username,
        password: password
      }).then(function (userData) {
        return res.status(201).send({
          success: true,
          message: 'User successfully created',
          userData: userData
        });
      }).catch(function (err) {
        var code = 1;
        if (err.name == "UniqueConstraintError") {
          code = 1;
        }
        console.log(err);
        return res.status(500).send({
          success: 'false',
          code: code,
          message: 'Error'
        });
      });
    }
  }, {
    key: 'modify',
    value: function modify(req, res) {}
  }, {
    key: 'ok',
    value: function ok(req, res) {
      console.log("todo salio OK");
      return res.status(201).send({ "result": "ok" });
    }
  }, {
    key: 'signUp',
    value: function signUp(req, res) {
      var user = new User({
        email: req.body.email,
        displayName: req.body.displayName,
        password: req.body.password
      });
      user.save(function (err) {
        if (err) return res.status(500).send({ message: 'Error al crear el usuario: ' + err });

        return res.status(201).send({ token: service.createToken(user) });
      });
    }
  }, {
    key: 'signIn',
    value: function signIn(req, res) {

      console.log("ejecutando el metodo signin >>>>>" + JSON.stringify(req.body));
      console.log(JSON.stringify(req.body, null, 2));

      user.findAll({
        include: [_index2.default.employee],
        where: {
          username: req.body.username
          //password: req.body.password
        }
      }).then(function (user) {
        var i = Object.keys(user).length;
        console.log(Object.keys(user).length);

        if (i == 0) {
          console.log("usuario no encontrado");
          return res.status(404).send({ message: 'No existe el usuario' });
        } else {

          return res.status(200).send({
            message: 'Te has logueado correctamente',
            token: service.createToken(user[0]),
            username: user[0].username,
            lastlogin: user[0].lastlogin,
            employee: user[0].employee
          });
        }
      }
      /*
      user => res.status(200).send({
      message: 'Te has logueado correctamente',
      token: service.createToken(user[0])
      })*/

      ).catch(function (err) {
        var code = 1;
        if (err.name == "UniqueConstraintError") {
          code = 1;
        }
        console.log(err);
        console.log("user bd:" + user);
        return res.status(500).send({
          success: 'false',
          code: code,
          message: 'Error'
        });
      });;
    }
  }, {
    key: 'private',
    value: function _private(req, res) {
      console.log(req.user);
      return res.status(200).send({ "usuario": req.user });
    }
  }, {
    key: 'version',
    value: function version(req, res) {
      console.log("showing version ... OK");
      return res.status(200).send({ version: "0.1" });
    }
  }]);

  return Users;
}();

exports.default = Users;