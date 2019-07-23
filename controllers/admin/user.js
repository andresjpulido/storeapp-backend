'use strict'

import model from '../../models/index'
const service = require('../../services')

const { user } = model;


class Users {

  static create(req, res) {

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

    const {
      username,
      password
    } = req.body

    const { id } = req.params

    user
      .create({
        username: username,
        password: password
      })
      .then(userData => res.status(201).send({
        success: true,
        message: 'User successfully created',
        userData
      }))
      .catch(function (err) {
        var code = 1;
        if (err.name == "UniqueConstraintError") {
          code = 1;
        }
        console.log(err);
        return res.status(500).send({
          success: 'false',
          code: code,
          message: 'Error'
        })

      });

  }

  static modify(req, res) {

  }

  static ok(req, res) {
    console.log("todo salio OK")
    return res.status(201).send({ "result": "ok" })
  }

  static signUp(req, res) {
    const user = new User({
      email: req.body.email,
      displayName: req.body.displayName,
      password: req.body.password
    })
    user.save((err) => {
      if (err) return res.status(500).send({ message: `Error al crear el usuario: ${err}` })

      return res.status(201).send({ token: service.createToken(user) })
    })
  }

  static signIn(req, res) {
    user.findAll({
      where: {
        username: req.body.username,
        password: req.body.password
      }
    }).then(user => res.status(200).send({
      message: 'Te has logueado correctamente',
      token: service.createToken(user[0])
    }))
    .catch(function(err) {
      var code = 1;
      if(err.name == "UniqueConstraintError") {
          code = 1;
      }
      console.log(err);
      console.log(user);
      return res.status(500).send({
          success: 'false',
          code: code,
          message: 'Error'
        })

  });;
  }

  static private (req,res){ 
    console.log(req.user) 
    return res.status(200).send({"usuario":req.user})
  }

}

export default Users;