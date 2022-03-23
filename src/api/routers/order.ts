import { Router, Request, Response } from 'express';
import middlewares from '../middlewares';
import OrderCtrl from '../../controllers/orderCtrl';
import { Container } from 'typedi';
import orderService from '../../services/orderServices';
const auth = require('../middlewares/auth');
const route = Router();

export default (app) => {
    app.put('/orders', OrderCtrl.put);
    app.post('/orders', OrderCtrl.create);
    app.get('/orders/:id', OrderCtrl.getOrder);
    app.get('/orders', OrderCtrl.getAll);

    /*
    app.get('/orders', async (req, res, next) => {
        let query = req.query;
        const serviceInstance = Container.get(orderService);
        const list = await serviceInstance.getAll(query);
        return res.json(list);
    });
    app.get('/orders/:id', async (req, res, next) => {
        const serviceInstance = Container.get(orderService);
        const id = req.params.id;
        const list = await serviceInstance.getOne(id);
        return res.json(list);
    });
    app.put('/orders', async (req, res, next) => {
        const serviceInstance = Container.get(orderService);
        const list = await serviceInstance.update(req.body);
        return res.json(list);
    });
    app.post('/orders', async (req, res, next) => {
        const serviceInstance = Container.get(orderService);
        const list = await serviceInstance.create(req.body);
        return res.json(list);
    });
    app.delete('/orders/:id', async (req, res, next) => {
        const serviceInstance = Container.get(orderService);
        const id = req.params.id;
        const list = await serviceInstance.delete(id);
        return res.json(list);
    });
    */
};
