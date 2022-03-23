import { Router, Request, Response } from "express";
import middlewares from "../middlewares";
import { Container } from "typedi";
import hourService from '../../services/hourService';
const auth = require('../middlewares/auth')
const route = Router();

export default (app) => {
 
    app.get('/hours', async (req, res, next) => {
        let query = req.query;
        const serviceInstance = Container.get(hourService);
		const list = await serviceInstance.getAll(query);
 		return res.json(list);
    })
    app.get('/hours/:id', async (req, res, next) => {
        const serviceInstance = Container.get(hourService);
        const id = req.params.id;
		const list = await serviceInstance.getOne(id);
 		return res.json(list);
    })
    app.put('/hours', async (req, res, next) => {
        const serviceInstance = Container.get(hourService);
		const list = await serviceInstance.update(req.body);
 		return res.json(list);
    })
    app.post('/hours', async (req, res, next) => {
        const serviceInstance = Container.get(hourService);
		const list = await serviceInstance.create(req.body);
 		return res.json(list);
    })
    app.delete('/hours/:id', async (req, res, next) => {
        const serviceInstance = Container.get(hourService);
        const id = req.params.id;
		const list = await serviceInstance.delete(id);
 		return res.json(list);
    })
    app.delete('/hours', async (req, res, next) => {
        const serviceInstance = Container.get(hourService);
        const ids = req.body.ids;
		const username = req.body.username;
		const list = await serviceInstance.deleteCollection(ids, username);
 		return res.json(list);
    })

};
