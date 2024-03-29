import { Router, Request, Response } from "express";
import middlewares from "../middlewares";
import customerService from "../../services/customerService";
import { Container } from "typedi";

const auth = require('../middlewares/auth')
const route = Router();
 
export default (app) => {

    app.get('/customers', async (req, res, next) => {
         const queryObj = req.query
         const serviceInstance = Container.get(customerService);
         let list =[];
         if(queryObj.autocomplete === "true")
             list = await serviceInstance.getAllAutocomplete(queryObj);
         else
             list = await serviceInstance.getAll(queryObj);
          return res.json(list);
    })
    app.get('/customers/:id', async (req, res, next) => {
        const serviceInstance = Container.get(customerService);
        const id = req.params.id;
		const list = await serviceInstance.getOne(id);
 		return res.json(list);
    })
    app.put('/customers', async (req, res, next) => {
        const serviceInstance = Container.get(customerService);
		const list = await serviceInstance.update(req.body);
 		return res.json(list);
    })
    app.post('/customers', async (req, res, next) => {
        const serviceInstance = Container.get(customerService);
		const list = await serviceInstance.create(req.body);
 		return res.json(list);
    })
    app.delete('/customers/:id', async (req, res, next) => {
        const serviceInstance = Container.get(customerService);
        const id = req.params.id;
		const list = await serviceInstance.delete(id);
 		return res.json(list);
    })

};