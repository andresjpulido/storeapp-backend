import { Router, Request, Response } from "express";
import middlewares from "../middlewares";
 
import statusService from '../../services/statusService';
import { Container } from "typedi";
const auth = require('../middlewares/auth')
const route = Router();
 
export default (app) => {

    app.get('/status', async (req, res, next) => {
        let query = req.query;
        const serviceInstance = Container.get(statusService);
		const list = await serviceInstance.getAll(query);
 		return res.json(list);
    })
};