'use strict'
 
import model from '../models/index' 
 
const { employee } = model;

class Employees{
    
    static create(req, res) {

        const { first_name, last_name, movil, address } = req.body
        const { userId } = req.params

        return employee
          .create({
            first_name,
            last_name,
            movil,
            address,
            userId
          })
          .then(emp => res.status(201).send({
            message: `Employee ${title} has been created successfully `,
            emp
          }))
    }

    static getEmployeeById(req, res){

    }

    static updateEmployeeById(req, res){

    }

    static deleteEmployeeById(req, res){

    }

    static getEmployees(req, res){ 
        return employee.findAll().then(employees => res.status(200).send(employees));
    }

    static modify(req, res) {
        const { title, author, description, quantity } = req.body
        return Book
          .findById(req.params.bookId)
          .then((book) => {
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
            .catch(error => res.status(400).send(error));
          })
          .catch(error => res.status(400).send(error));
      }
      static delete(req, res) {
        return Book
          .findById(req.params.bookId)
          .then(book => {
            if(!book) {
              return res.status(400).send({
              message: 'Book Not Found',
              });
            }
            return book
              .destroy()
              .then(() => res.status(200).send({
                message: 'Book successfully deleted'
              }))
              .catch(error => res.status(400).send(error));
          })
          .catch(error => res.status(400).send(error))
      }
      
}

export default Employees;