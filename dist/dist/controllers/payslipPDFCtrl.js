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

var _printer = require('pdfmake/src/printer');

var _printer2 = _interopRequireDefault(_printer);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

var fs = require("fs");
//const path = require("path");
var puppeteer = require('puppeteer');
var handlebars = require("handlebars");

var payslip = _index2.default.payslip;

function fontPath(file) {
  return _path2.default.resolve('Roboto', file);
}

function generatePdf(docDefinition, callback) {

  var fontDescriptors = {
    Roboto: {
      normal: fontPath('Roboto-Regular.ttf'),
      bold: fontPath('Roboto-Medium.ttf'),
      italics: fontPath('Roboto-Italic.ttf'),
      bolditalics: fontPath('Roboto-Italic.ttf')
    }
  };

  try {

    var printer = new _printer2.default(fontDescriptors);
    var doc = printer.createPdfKitDocument(docDefinition);

    var chunks = [];

    doc.on('data', function (chunk) {
      chunks.push(chunk);
    });

    doc.on('end', function () {
      //const result = Buffer.concat(chunks);
      //callback('data:application/pdf;base64,' + result.toString('base64'));
      callback(Buffer.concat(chunks));
    });

    doc.end();
  } catch (err) {
    throw err;
  }
};

function getNameOfDay(dayNumber) {

  console.log(dayNumber);

  switch (dayNumber) {
    case 0:
      return 'Sun';
    case 1:
      return 'Mon';
    case 2:
      return 'Tue';
    case 3:
      return 'Wed';
    case 4:
      return 'Thu';
    case 5:
      return 'Fri';
    case 6:
      return 'Sat';
  }
}

var Payslips = function () {
  function Payslips() {
    _classCallCheck(this, Payslips);
  }

  _createClass(Payslips, null, [{
    key: 'create',
    value: function create(req, res) {
      var _req$body = req.body,
          description = _req$body.description,
          employeeid = _req$body.employeeid,
          isprocessed = _req$body.isprocessed;
      var userId = req.params.userId;

      //TODO obtener los identificadores de los registros de las horas para enlazarlos al payslip

      return payslip.create({
        description: description, isprocessed: isprocessed, employeeid: employeeid
      }).then(function (emp) {
        return res.status(201).send({
          message: 'payslip ' + description + ' has been created successfully ',
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
    key: 'getPayslips',
    value: function getPayslips(req, res) {
      console.log("getPayslips");
      return payslip.findAll().then(function (payslips) {
        return res.status(200).send(payslips);
      });
    }
  }, {
    key: 'getPayslipsByUserId',
    value: function getPayslipsByUserId(req, res) {
      console.log("getPayslipsByUserId " + req.params.userid);

      if (!req.params.userid) {
        return res.status(404).send({
          message: 'No records'
        });
      }

      return payslip.findAll({
        where: {
          employeeid: req.params.userid
        }
      }).then(function (payslips) {
        return res.status(200).send(payslips);
      });
    }
  }, {
    key: 'getHoursByUserId',
    value: function getHoursByUserId(req, res) {
      return payslip.findAll({
        where: {
          employeeid: req.params.userid
        }
      }).then(function (payslips) {
        return res.status(200).send(payslips);
      });
    }
  }, {
    key: 'getPayslipsById_',
    value: function getPayslipsById_(req, res) {

      console.log("req.params.payslipid " + req.params.payslipid);
      if (!req.params.payslipid) {
        return res.status(404).send({
          message: 'No records'
        });
      }

      //TODO hacer la sumatoria de todas las horas disponibles para un empleado en particular

      return payslip.findAll({
        where: {
          id: req.params.payslipid
        }
      }).then(function (payslips) {
        return res.status(200).send(payslips);
      });
    }
  }, {
    key: 'getPayslipsById',
    value: function getPayslipsById(req, res) {
      var _req$params = req.params,
          company = _req$params.company,
          empid = _req$params.empid,
          isprocessed = _req$params.isprocessed;

      var c = req.params.company;

      //TODO find out companyname, company address
      var companyName = "Oro Negro";
      var companyAddress = "283 Karangahape Road, Samoa House";
      var period = "16/07/2018 to 22/07/2018";
      var hourValue = '16.50';
      var bankAccountName = 'Andres Pulido';
      var employeeName = 'Andres Pulido B';
      var position = 'Jeller';
      var irdNumber = '126-075-219';
      var taxCode = 'M';
      var hoursDB = [{
        "id": 1,
        "id_emp": 1,
        "activity": "polishing",
        "isPaid": false,
        "start_date": "2019-10-01T13:00:00.000Z",
        "end_date": "2019-10-01T18:30:00.000Z",
        "createdAt": "2019-11-21",
        "updatedAt": "2019-11-21"
      }, {
        "id": 2,
        "id_emp": 1,
        "activity": "polishing",
        "isPaid": false,
        "start_date": "2019-10-02T13:30:00.000Z",
        "end_date": "2019-10-02T18:00:00.000Z",
        "createdAt": "2019-11-21",
        "updatedAt": "2019-11-21"
      }];

      var hoursList = [];
      var totalHoursValue = 0;
      var dayValue = 0;
      var hours = 0;
      var tax = 1;
      var total = 0;
      var dateFormated = '';
      console.log("hoursDB.length " + hoursDB.length);

      for (var i = 0; i < hoursDB.length; i++) {
        var d = new Date(hoursDB[i].end_date);
        var dateFormated = d.getDate() + "/" + (d.getMonth() + 1) + " " + getNameOfDay(d.getDay());
        //+ " " + ("0" + d.getHours()).slice(-2) + ":" + ("0" + d.getMinutes()).slice(-2)
        hours = (new Date(hoursDB[i].end_date).getTime() - new Date(hoursDB[i].start_date).getTime()) / (1000 * 60 * 60);
        dayValue = hourValue * hours;
        totalHoursValue = totalHoursValue + dayValue;
        hoursList.push([dateFormated, hours, hourValue, dayValue]);
      }

      hoursList.push(['Basic Income -  worked hours:', hours, '', '']);
      hoursList.push(['PAYE incl. EL (ACC)', '', '', tax]);
      total = totalHoursValue - tax;
      hoursList.push(['Take Home Pay:', '', '', total]);

      console.log("req.body, req.params" + req.body, req.params);
      console.log(hoursList);

      //http://pdfmake.org/playground.html

      var docDefinition = {
        content: [{
          text: ['Employee Payslip'],
          style: 'header1'
        }, {
          text: [companyName + ', ' + companyAddress],
          style: 'subheader'
        }, {
          text: ['Period - ' + period],
          style: 'subheader'
        }, {
          style: 'table1',
          table: {
            widths: ['*', '*', '*', '*'],
            body: [[{ text: 'Employee Name:', style: 'label' }, employeeName, { text: 'Position:', style: 'label' }, position], [{ text: 'IRD Number :', style: 'label' }, irdNumber, { text: 'Tax Code :', style: 'label' }, taxCode]]
          },
          layout: 'noBorders'
        }, {
          text: 'Gross Taxable Income',
          style: 'header2'
        }, {
          style: 'tableEmployee',
          table: {
            widths: ['*', '*', '*', '*'],
            body: hoursList
          },
          layout: 'noBorders'
        }, {
          text: 'Payment Detail',
          style: 'header2'
        }, {
          style: 'tableEmployee',
          table: {
            widths: ['*', '*', '*', '*'],
            body: [['Kiwi Bank', '38-9019-0652827-00', bankAccountName, '$' + total]]
          },
          layout: 'noBorders' /*,  
                              {
                               text: 'Year To Date - Tax Year Summary (From 01/04/2018)',
                               style: 'header2'
                              }, 
                              {
                               style: 'tableEmployee',
                               table: {
                                 widths: ['*', '*', '*', '*'],
                                 body: [ 
                                   ['Taxable Gross Earnings', '$1,608.75'],
                                   ['P.A.Y.E.', '$209.65'] 
                                 ]
                               },
                               layout: 'noBorders',
                              }, */
        }],
        styles: {
          header1: {
            fontSize: 18,
            bold: true,
            alignment: 'center',
            margin: [0, 10, 0, 0]
          },
          subheader: {
            fontSize: 10,
            alignment: 'center',
            margin: [0, 0, 0, 0]
          },
          header2: {
            fontSize: 14,
            bold: true,
            alignment: 'center',
            margin: [0, 20, 60, 0]
          },
          table1: {
            margin: [45, 40, 0, 15]
          },
          tableEmployee: {
            margin: [45, 20, 0, 15]
          },
          textEmployer: {
            alignment: 'center',
            fontSize: 10,
            margin: [45, 20, 0, 15]
          },
          label: {
            bold: true
          }
        },
        defaultStyle: {
          // alignment: 'justify' 

        }
      };

      var fontDescriptors = {
        Roboto: {
          normal: fontPath('Roboto-Regular.ttf'),
          bold: fontPath('Roboto-Medium.ttf'),
          italics: fontPath('Roboto-Italic.ttf'),
          bolditalics: fontPath('Roboto-Italic.ttf')

        } };

      var printer = new _printer2.default(fontDescriptors);
      var fs = require('fs');

      //var pdfDoc = printer.createPdfKitDocument(docDefinition);
      //pdfDoc.pipe(fs.createWriteStream('pdfs/tables.pdf'));
      //pdfDoc.end();

      generatePdf(docDefinition, function (response) {
        res.setHeader('Content-Type', 'application/pdf');
        res.send(response); // sends a base64 encoded string to client
      });
    }
  }]);

  return Payslips;
}();

exports.default = Payslips;