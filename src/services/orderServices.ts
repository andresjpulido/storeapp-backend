import { Service, Inject } from 'typedi';
import model from '../models';
import Order from '../types/order';

@Service()
export default class orderService {
    public async getAll(queryObj) {
        const { order, customer, status } = model;

        try {
            return order.findAll({
                where: queryObj,
                include: [customer, status],
                order: [['id']],
            });
        } catch (e) {
            console.log(e);
            return {};
        }
    }

    public async getOne(id: any) {
        const { order } = model;

        try {
            return order.findOne({
                where: {
                    id: id,
                },
                order: [['id']],
            });
        } catch (e) {
            console.log(e);
            return {};
        }
    }

    public async delete(id: any) {
        const { order } = model;

        try {
            const cus = await order.findOne({ where: { id: id } });
            await cus.destroy();
        } catch (e) {
            console.log(e);
            return {};
        }
    }

    public async update(orderObj: any) {
        const { payslip } = model;
        console.log(orderObj);
        await payslip.update(orderObj, {
            where: {
                id: orderObj.id,
            },
        });
    }

    public async create(orderObj: Order) {
        const { payslip } = model;

        try {
            return payslip.create(orderObj, {
                include: [],
            });
        } catch (e) {
            console.log(e);
            return {};
        }
    }
}
