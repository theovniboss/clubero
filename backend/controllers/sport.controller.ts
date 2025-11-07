import type { Request, Response } from "express";
import sportService from "../services/sport.service";

const getAllSports = async (request: Request, response: Response) => {
	const sports = await sportService.getAllSports();
	return response.status(200).json(sports);
};

const getSport = async (request: Request, response: Response) => {
	const id = parseInt(request.params.id as string, 10);
	if (isNaN(id)) return response.status(400).json();

	const sport = await sportService.getSport(id);
	if (!sport) return response.status(404).json();

	return response.status(200).json(sport);
};

const createSport = async (request: Request, response: Response) => {
	const sport = request.body;
	const newSport = await sportService.createSport(sport);
	return response.status(200).json(newSport);
};

const updateSport = async (request: Request, response: Response) => {
	const id = parseInt(request.params.id as string, 10);
	if (isNaN(id)) return response.status(400).json();

	const sport = request.body;

	const updated = await sportService.updateSport(id, sport);
	return response.status(200).json(updated);
};

const deleteSport = async (request: Request, response: Response) => {
	const id = parseInt(request.params.id as string, 10);
	if (isNaN(id)) return response.status(400).json();

	const deleted = await sportService.deleteSport(id);
	return response.status(200).json(deleted);
};

export default {
	getAllSports,
	getSport,
	createSport,
	updateSport,
	deleteSport,
};
