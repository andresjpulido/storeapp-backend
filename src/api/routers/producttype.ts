import { Router, Request, Response } from "express";
import middlewares from "../middlewares"; 
import productTypeService from '../../services/productTypeService';
import { Container } from "typedi";
const auth = require('../middlewares/auth')
const route = Router();
 
export default (app) => {
 
    app.get('/productTypes', async (req, res, next) => {
        let query = req.query;
        const serviceInstance = Container.get(productTypeService);
		const list = await serviceInstance.getAll(query);
 		return res.json(list);
    })
    app.get('/productTypes/:id', async (req, res, next) => {
        const serviceInstance = Container.get(productTypeService);
        const id = req.params.id;
		const list = await serviceInstance.getOne(id);
 		return res.json(list);
    })
    app.put('/productTypes', async (req, res, next) => {
        const serviceInstance = Container.get(productTypeService);
		const list = await serviceInstance.update(req.body);
 		return res.json(list);
    })
    app.post('/productTypes', async (req, res, next) => {
        const serviceInstance = Container.get(productTypeService);
		const list = await serviceInstance.create(req.body);
 		return res.json(list);
    })
    app.delete('/productTypes/:id', async (req, res, next) => {
        const serviceInstance = Container.get(productTypeService);
        const id = req.params.id;
		const list = await serviceInstance.delete(id);
 		return res.json(list);
    }) 

};