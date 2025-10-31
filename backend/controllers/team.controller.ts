import type { Request, Response } from "express";
import userUtils from "../utils/user.utils";
import teamService from "../services/team.service";

const getAllTeams = async (request: Request, response: Response) => {
	const teams = await teamService.getAllTeams();
	return response.status(200).json(teams);
};

const getTeams = async (request: Request, response: Response) => {
	const createdBy = userUtils.getUserId(request);
	const teams = await teamService.getTeams(createdBy);
	if (!teams || !teams.length) return response.status(404).json();
	return response.status(200).json(teams);
};

const getTeam = async (request: Request, response: Response) => {
	const id = parseInt(request.params.id as string, 10);
	if (isNaN(id)) return response.status(400).json();

	const team = await teamService.getTeam(id);
	if (!team) return response.status(404).json();

	return response.status(200).json(team);
};

const createTeam = async (request: Request, response: Response) => {
	const createdBy = userUtils.getUserId(request);
	const team = request.body;
	team.createdBy = createdBy;
	const newTeam = await teamService.createTeam(team);
	return response.status(200).json(newTeam);
};

const updateTeam = async (request: Request, response: Response) => {
	const id = parseInt(request.params.id as string, 10);
	if (isNaN(id)) return response.status(400).json();

	const updatedBy = userUtils.getUserId(request);
	const team = request.body;
	team.updatedBy = updatedBy;

	const updated = await teamService.updateTeam(id, team);
	return response.status(200).json(updated);
};

const deleteTeam = async (request: Request, response: Response) => {
	const createdBy = userUtils.getUserId(request);
	const id = parseInt(request.params.id as string, 10);
	if (isNaN(id)) return response.status(400).json();

	const deleted = await teamService.deleteTeam(id, createdBy);
	return response.status(200).json(deleted);
};

export default {
	getAllTeams,
	getTeams,
	getTeam,
	createTeam,
	updateTeam,
	deleteTeam,
};
