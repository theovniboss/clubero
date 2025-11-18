import { sqliteConn } from '../database/prisma'
import type { CashFlow, CashFlowCategory } from '../database/generated/sqlite/client';

const getCashFlowCategories = async (clubId?: number) => {
	return await sqliteConn.cashFlowCategory.findMany({
		where: {
			OR: [
				{clubId: clubId},
				{clubId: null}
			]
		}
	});
};

const createCashFlowCategory = async (category: CashFlowCategory) => {
    return await sqliteConn.cashFlowCategory.create({
        data: category
    });
}

const updateCashFlowCategory = async (id: number, category: CashFlowCategory) => {
    return await sqliteConn.cashFlowCategory.update({
		data: category,
        where: {
            id: id
        },
        
    });
}

const deleteCashFlowCategory = async (id: number) => {
    return await sqliteConn.cashFlowCategory.delete({
        where: {
            id: id
        }
    });
}

const getCashFlows = async (clubId: number) => {
    return await sqliteConn.cashFlow.findMany({
        where: { clubId: clubId }
    });
};

const getCashFlow = async (id: number) => {
    return await sqliteConn.cashFlow.findUnique({
        where: { id: id }
    });
};

const createCashFlow = async (cashFlow: CashFlow) => {
    return await sqliteConn.cashFlow.create({
        data: cashFlow
    });
};

const updateCashFlow = async (id: number, cashFlow: CashFlow) => {
    return await sqliteConn.cashFlow.update({
        data: cashFlow,
        where: { id: id }
    });
};

const deleteCashFlow = async (id: number) => {
    return await sqliteConn.cashFlow.delete({
        where: { id: id }
    });
};

export default {
    getCashFlowCategories,
    createCashFlowCategory,
    updateCashFlowCategory,
    deleteCashFlowCategory,
    getCashFlows,
    getCashFlow,
    createCashFlow,
    updateCashFlow,
    deleteCashFlow
}