import teamsModel from '../models/teams.js';

const getAllTeams = async (request, response) => {
 
	const teams = await teamsModel.getAllTeams();
	response.status(200).json(teams);

};
const getTeamById = async (request, response) => { 
	const id = parseInt(request.params.id);
	const team = await teamsModel.getTeamById(id);
	if(team) 
		response.status(200).json(team);

	response.status(404).json();
};

const createTeam = async (request, response) => {  
	const newTeam = request.body;
	const createdTeam = await teamsModel.insertTeam(newTeam);
	response.status(201).json(createdTeam);
};

const updateTeam = async (request, response) => {
    try {
        const id = parseInt(request.params.id);
        const team = request.body;
        const updatedTeam = await teamsModel.updateTeam(id, team);
        if (updatedTeam) {
            response.status(200).json(updatedTeam);
        } else {
            response.status(404).json();
        }
    } catch (error) {
        response.status(500).json({ error: `Internal Server Error:${error}` });
    }
};
const deleteTeam = async (request, response) => {
    try {
        const id = parseInt(request.params.id); 
        const success = await teamsModel.deleteTeam(id);
        if (success) {
            response.status(204).json();
        } else {
            response.status(404).json();
        }
    }
    catch (error) {
        response.status(500).json({ error: `Internal Server Error:${error}` });
    }
};
export default {
    getAllTeams,
    getTeamById,
    createTeam,
    updateTeam,
    deleteTeam
};

