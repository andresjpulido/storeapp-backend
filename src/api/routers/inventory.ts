import { Router, Request, Response } from "express";
import middlewares from "../middlewares";
import InventoryCtrl from '../../controllers/inventoryCtrl';
import { Container } from "typedi";
const auth = require('../middlewares/auth')
const route = Router();
 
export default (app) => {

    app.post('/inventory', InventoryCtrl.createEntry)
    app.get('/inventory', InventoryCtrl.findAll)

};