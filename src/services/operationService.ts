import { Service, Inject } from "typedi";
import { IntegerDataType, Op } from "sequelize";
import model from "../models";

@Service()
export default class operationService {
	constructor() {}

	public async getAll(queryObj) {
		const { operation } = model;

		try {
			return operation.findAll({
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