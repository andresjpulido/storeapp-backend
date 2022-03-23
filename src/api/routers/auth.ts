import { Router, Request, Response } from "express";
import middlewares from "../middlewares";
import authService from "../../services/authService";
import { Container } from "typedi";
const auth = require("../middlewares/auth");
const route = Router();

export default (app) => {
	app.post("/signup", async (req, res, next) => {
		const serviceInstance = Container.get(authService);
		const list = await serviceInstance.create(req.body);
		return res.json(list);
	});
 
	app.post("/signIn", async (req, res, next) => {
		const serviceInstance = Container.get(authService);
		let user: any = {};
		user = await serviceInstance.signIn(req.body);

		if (!user) {
			res.status(404).send({ message: "User or password no valid" });
		} else {
			return res.json(user);
		}
	});

	//app.post('/user', auth, UserCtrl.create)
	//app.get('/version',UserCtrl.version )
	//app.post('/private', auth, UserCtrl.private)
};
