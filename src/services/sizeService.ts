import { Service, Inject } from "typedi";
import { IntegerDataType, Op } from "sequelize";
import model from "../models";

@Service()
export default class userService {
	constructor() {}

	public async getAll(queryObj) {
		const { status } = model;

		try {
			return status.findAll({
				where: queryObj,
				include: [],
				order: [["id"]],
			});
		} catch (e) {
			console.log(e);
			return {};
		}
	}
}