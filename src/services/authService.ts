import { Service, Inject } from "typedi";
import { IntegerDataType, Op } from "sequelize";
import model from "../models";
import privatekey from "./privatekey";
import tokenUtil from "../utils/token";

@Service()
export default class authService {
	constructor() {}

	public async create(obj: any) {
		const { user } = model;

		try {
			return user.create(obj, {
				include: [],
			});
		} catch (e) {
			console.log(e);
			return {};
		}
	}

	public async signIn(obj: any) {
		const NodeRSA = require("node-rsa");
		const key = new NodeRSA(privatekey);
		const encrypted = obj.password;
		const decrypted = key.decrypt(encrypted, "utf8");

		const { user } = model;

        var userResult:any|null = null;

		await user
			.findOne({
				include: [model.employee],
				where: {
					username: obj.username,
					password: decrypted,
				},
			})
			.then(async function (result) { 
				if (result === null) {
					return null;
				}
				var i = Object.keys(result).length;

				if (i == 0) {
					return null;
				} else {
					let lastlogin = result.lastlogin;
					result.lastlogin = new Date();
					await result.save();

					userResult = {
						token: tokenUtil.createToken(result.username),
						username: result.username,
						lastlogin: lastlogin,
						employee: result.employee,
						id: result.id,
					};
					 
					return userResult;
				}
			})
			.catch(function (err) {
				var code = 1;
				if (err.name == "UniqueConstraintError") {
					code = 1;
				}
				console.log(err);
				console.log("user bd:" + user);
				return {
					success: "false",
					code: code,
					message: "Error",
				};
			});

		console.log("finaliza");
        return userResult;
	}

	public async getAll(queryObj) {
		const { customer } = model;

		try {
			return customer.findAll({
				where: queryObj,
				include: [],
				order: [["id"]],
			});
		} catch (e) {
			console.log(e);
			return {};
		}
	}

	public async getAllAutocomplete(queryObj) {
		const { customer } = model;
		return await customer.findAll({
			where: {
				[Op.or]: [
					{
						firstName: {
							[Op.iLike]: "%" + queryObj.firstName + "%",
						},
					},
					{
						lastName: {
							[Op.iLike]: "%" + queryObj.lastName + "%",
						},
					},
				],
			},
			include: [],
			order: [["id"]],
		});
	}

	public async getOne(id: any) {
		const { customer } = model;

		try {
			return customer.findOne({
				where: {
					id: id,
				},
				include: [],
				order: [["id"]],
			});
		} catch (e) {
			console.log(e);
			return {};
		}
	}

	public async delete(id: any) {
		const { customer } = model;

		try {
			const cus = await customer.findOne({ where: { id: id } });
			await cus.destroy();
		} catch (e) {
			console.log(e);
			return {};
		}
	}

	public async update(customerObj: any) {
		const { customer } = model;
		console.log(customerObj);
		await customer.update(customerObj, {
			where: {
				id: customerObj.id,
			},
		});
	}
}
