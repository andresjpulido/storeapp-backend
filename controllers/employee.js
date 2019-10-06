'use strict'

import model from '../models/index'

const { employee } = model;

class Employees {

  static create(req, res) {

    const { firstName, lastName, movil, address, typeDocument, document, birthDate, ird, email, position, bankName, accountNumber } = req.body
    const { userId } = req.params

    return employee
      .create({
        firstName,
        lastName,
        movil,
        address,
        typeDocument,
        document,
        birthDate,
        ird,
        email,
        position,        
        bankName,
        accountNumber  
      })
      .then(emp => res.status(201).send({
        message: `Employee ${firstName} has been created successfully `,
        emp
      }))
      .catch(function (err) {
        console.log(" se petaquio esta joda", err)
        return res.status(500).send({
          success: 'false',
          code: "CODE",
          message: 'Error' + err
        })
      }
      )
  }

  static findAll(req, res) {
    return employee.findAll().then(employees => res.status(200).send(employees));
  }

  static modify(req, res) {
    const { title, author, description, quantity } = req.body
    return employee
      .findAll({
        where: {
          id: req.params.idEmp
        }
      })
      .then((book) => {

        if (book.length == 0) {
          console.log("empleado encontrado");
          res.status(400).send({ "message": "Employee not found" })
        }

        book.update({
          title: title || book.title,
          author: author || book.author,
          description: description || book.description,
          quantity: quantity || book.quantity
        })
          .then((updatedBook) => {
            res.status(200).send({
              message: 'Book updated successfully',
              data: {
                title: title || updatedBook.title,
                author: author || updatedBook.author,
                description: description || updatedBook.description,
                quantity: quantity || updatedBook.quantity
              }
            })
          })
          .catch(error => {
            console.log(error);
            res.status(400).send(error)
          });
      })
      .catch(error => {
        console.log(error);
        res.status(400).send(error)
      });
  }

  static remove(req, res) {

    return employee
      .findAll({
        where: {
          id: req.params.idEmp
        }
      })

      .then((employeesFound) => {

        if (employeesFound.length == 0) {
          console.log("empleado encontrado");
          res.status(400).send({ message: "Employee not found" })
        }

        employee.destroy({
          where: {
            id: req.params.idEmp
          }
        })

        res.status(200).send({
          message: 'Emp successfully deleted'
        })
      })
      .catch(error => res.status(400).send(error));

  }
}

export default Employees;