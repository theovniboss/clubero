import type { Request, Response } from "express";
import userUtils from "../utils/user.utils";
import teamService from "../services/team.service";
import userService from "../services/user.service";

import type { Team } from "../models/team.model";
import type { User } from "../models/user.model";

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
const getTeamUsers = async (request: Request, response: Response) => {
	return getTeam(request, response, true);
};

const getTeam = async (request: Request, response: Response, includeUsers: boolean = false) => {
	const id = parseInt(request.params.id as string, 10);
	if (isNaN(id)) return response.status(400).json();
	const teamDB = await teamService.getTeam(id, includeUsers) 
	if (!teamDB) return response.status(404).json();

	const team = JSON.parse(JSON.stringify(teamDB));
	

	if (includeUsers) {
		const userIds = teamDB.teamUser.map(user => user.userId)
		delete team.teamUser;
		const users = await userService.getUsersById(userIds);
		team.users = users.data as unknown as  User[];
	}

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





const getTeamsByUser = async(request: Request, response: Response) =>{
	const userId = userUtils.getUserId(request);

	const teams  = await teamService.getTeamsByUser(userId);
	if(!teams)
		return response.status(404).json();

	return response.status(200).json(teams);
}

const inviteTeamUsers = async (request: Request, response: Response) => {

		const teamId = parseInt(request.params.id as string, 10);
		if (isNaN(teamId)) return response.status(400).json();
		const users = request.body.users;
		if(!users || !users.length) return response.status(400).json();
		const usersCreated = [];

		const userClientId = userUtils.getUserClientId(request);
		for (let i = 0; i < users.length; i++) {
			const user = users[i] as User;
			const created = await userService.createUser(user);
			if(!created || !created.user_id || !created.email) return response.status(404).json();

			const teamUser = await teamService.addTeamUser(teamId, created.user_id);
			if(!teamUser) return response.status(404).json();

			const invite = await userService.changePasswordUser(created.email, userClientId);
			if(!invite) return response.status(404).json();

			usersCreated.push(created);
		}

		return response.status(200).json(usersCreated);



}




export default {
	getAllTeams,
	getTeams,
	getTeam,
	getTeamUsers,
	createTeam,
	updateTeam,
	deleteTeam,
	getTeamsByUser,
	inviteTeamUsers
	
};
