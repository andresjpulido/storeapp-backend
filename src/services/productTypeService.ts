import { Service, Inject } from "typedi";
import model from "../models";
const { Op } = require("sequelize");

@Service()
export default class productTypeService {
	public async create(obj) {
		const { productType } = model;
		return await productType.create(obj);
	}

	public async getAll(queryObj) { 
		const { productType } = model;
		return await productType.findAll({
			where: queryObj,
			include: [],
			order: [["id"]],
		});
	}

	public async getAllAutocomplete(queryObj) { 
		const { productType } = model;
		return await productType.findAll({
			where: {
				
					[Op.or]: [
					  {
						firstName: {
						  [Op.iLike]: '%' + queryObj.firstName + '%'
						}
					  },
					  {
						lastName: {
						  [Op.iLike]: '%' + queryObj.lastName + '%'
						}
					  }
					]
				
			},
			include: [],
			order: [["id"]],
		});
	}

	public async getOne(id) {
		const { productType } = model;
		return await productType.findOne({
			where: {
				id: id,
			},
		});
	}

	public async update(employeeObj) {
		const { productType } = model;
		await productType.update(employeeObj, {
			where: {
				id: employeeObj.id,
			},
		});
	}

	public async delete(id: any) {
		const { productType } = model;

		try {
			const cus = await productType.findOne({ where: { id: id } });
			await cus.destroy();
		} catch (e) {
			console.log(e);
			return {};
		}
	}

	public async deleteCollection(ids) {
		const { productType } = model;
		try {
			await productType.destroy({ where: { id: ids } });
		} catch (e) {
			console.log(e);
			return {};
		}
	}
}
