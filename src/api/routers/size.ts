import { Router, Request, Response } from "express";
import middlewares from "../middlewares";
import sizeService from '../../services/sizeService';
import { Container } from "typedi";
const auth = require('../middlewares/auth')
const route = Router();
 
export default (app) => {

    app.get('/size', async (req, res, next) => {
        let query = req.query;
        const serviceInstance = Container.get(sizeService);
		const list = await serviceInstance.getAll(query);
 		return res.json(list);
    })
};