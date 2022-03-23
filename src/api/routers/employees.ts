import { Router, Request, Response } from 'express';
import middlewares from '../middlewares';
import employeeService from '../../services/employeeService';
import { Container } from 'typedi';
const auth = require('../middlewares/auth');
const route = Router();

export default (app) => {
    app.get('/employees', middlewares.auth, async (req, res, next) => {
        const queryObj = req.query;
        const serviceInstance = Container.get(employeeService);
        let list = [];
        if (queryObj.autocomplete === 'true') list = await serviceInstance.getAllAutocomplete(queryObj);
        else list = await serviceInstance.getAll(queryObj);
        return res.json(list);
    });
    app.get('/employees/:id', async (req, res, next) => {
        const serviceInstance = Container.get(employeeService);
        const id = req.params.id;
        const employee = await serviceInstance.getOne(id);
        return res.json(employee);
    });
    app.put('/employees', async (req, res, next) => {
        const serviceInstance = Container.get(employeeService);
        await serviceInstance.update(req.body);
        return res.status(200).send();
    });
    app.post('/employees', async (req, res, next) => {
        const serviceInstance = Container.get(employeeService);
        const list = await serviceInstance.create(req.body);
        return res.json(list);
    });
    app.delete('/employees/:id', async (req, res, next) => {
        const serviceInstance = Container.get(employeeService);
        const id = req.params.id;
        const list = await serviceInstance.delete(id);
        return res.json(list);
    });
    app.delete('/employees', async (req, res, next) => {
        const serviceInstance = Container.get(employeeService);
        const ids = req.body.ids;
        await serviceInstance.deleteCollection(ids);
        return res.status(200).send();
    });
};
