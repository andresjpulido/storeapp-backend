import { Service, Inject } from "typedi"; 
import model from "../models";

@Service()
export default class parameterService {
	constructor() {}

	public async getAll(queryObj) {
		const { parameter } = model;

		try {
			return parameter.findAll({
				where: queryObj,
			})
		} catch (e) {
			console.log(e);
			return {};
		}
	}

	public async getOne(id:any) {
		const { parameter } = model;

		try {
			return parameter.findOne(
				{
					where: {
						id: id
					},
					include: [],
					order: [
						['id']
					]
				},
			)
		} catch (e) {
			console.log(e);
			return {};
		}
	}
 

}
