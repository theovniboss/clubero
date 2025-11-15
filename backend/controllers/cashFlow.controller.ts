import cashflowService from "../services/cashFlow.service";
import type { Request, Response } from 'express'
import userUtils from "../utils/user.utils";

const getCashFlowCategories = async (request: Request, response: Response) => {
    const clubId = parseInt(request.params.clubId as string, 10);
    if(!clubId) return response.status(400).json();

    const categories = await cashflowService.getCashFlowCategories(clubId);
    if(!categories) return response.status(404).json();

    return response.status(200).json(categories);
}

const createCashFlowCategory = async (request: Request, response: Response) => {
    
    const createdBy = userUtils.getUserId(request);
    if(!createdBy) return response.status(401).json();
	const category = request.body;
	category.createdBy = createdBy

    const created = await cashflowService.createCashFlowCategory(category);
    if (!created) return response.status(400).json();

    return response.status(200).json(created);
}

const updateCashFlowCategory = async (request: Request, response: Response) => {

    const id = parseInt(request.params.id as string, 10);
	if(!id) return response.status(400).json();

    const updatedBy = userUtils.getUserId(request);
    if(!updatedBy) return response.status(401).json();
    
	const category = request.body;
	category.updatedBy = updatedBy;

    const updatedCategory = await cashflowService.updateCashFlowCategory(id, category);
    if (!updatedCategory) return response.status(404).json();

    return response.status(200).json(updatedCategory);
}

const deleteCashFlowCategory = async (request: Request, response: Response) => {
    const id = parseInt(request.params.id as string, 10);
    if(!id) return response.status(400).json();

    const deleted = await cashflowService.deleteCashFlowCategory(id);
    return response.status(200).json(deleted);
}

const getCashFlows = async (request: Request, response: Response) => {
    const clubId = parseInt(request.params.clubId as string, 10);
    if(!clubId) return response.status(400).json();

    const cashFlows = await cashflowService.getCashFlows(clubId);
    if(!cashFlows) return response.status(404).json();

    return response.status(200).json(cashFlows);
}

const getCashFlow = async (request: Request, response: Response) => {
    const id = parseInt(request.params.id as string, 10);
    if(!id) return response.status(400).json();

    const cashFlow = await cashflowService.getCashFlow(id);
    if(!cashFlow) return response.status(404).json();

    return response.status(200).json(cashFlow);
}

const createCashFlow = async (request: Request, response: Response) => {
    const createdBy = userUtils.getUserId(request);
    if(!createdBy) return response.status(401).json();

    const cashFlow = request.body;
    cashFlow.createdBy = createdBy;

    const created = await cashflowService.createCashFlow(cashFlow);
    if (!created) return response.status(400).json();

    return response.status(201).json(created);
}

const updateCashFlow = async (request: Request, response: Response) => {
    const id = parseInt(request.params.id as string, 10);
    if(!id) return response.status(400).json();

    const updatedBy = userUtils.getUserId(request);
    if(!updatedBy) return response.status(401).json();

    const cashFlow = request.body;
    cashFlow.updatedBy = updatedBy;

    const updated = await cashflowService.updateCashFlow(id, cashFlow);
    if (!updated) return response.status(404).json();

    return response.status(200).json(updated);
}

const deleteCashFlow = async (request: Request, response: Response) => {
    const id = parseInt(request.params.id as string, 10);
    if(!id) return response.status(400).json();

    const deleted = await cashflowService.deleteCashFlow(id);
    return response.status(200).json(deleted);
}

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
};