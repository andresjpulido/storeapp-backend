'use strict';

var services = require('../services');

function isAuth(req, res, next) {

  if (!req.headers.authorization) {
    return res.status(403).send({ message: 'No tienes autorización' });
  }

  var token = req.headers.authorization.split(' ')[1];

  services.decodeToken(token).then(function (response) {
    req.user = response;
    next();
  }).catch(function (response) {
    return res.status(response.status).send({ code: response.code, message: 'No tienes autorización' });
  });
}

module.exports = isAuth;