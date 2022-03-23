import { Router, Request, Response } from "express";
import middlewares from "../middlewares";
import parameterService from "../../services/parameterService";
import { Container } from "typedi";
const auth = require("../middlewares/auth");
const route = Router();

export default (app) => {
	app.get("/operations", async (req, res, next) => {
		let query = req.query;
		const serviceInstance = Container.get(parameterService);
		const list = await serviceInstance.getAll(query);
		return res.json(list);
	});
};
