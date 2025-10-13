import sportsModel from '../models/sports.js';

const getAllSports = async (request, response) => {
    try {
        const sports = await sportsModel.getAllSports();
        response.status(200).json(sports);
    } catch (error) {
        response.status(500).json({ error: `Internal Server Error:${error}` });
    }   
};

const getSportById = async (request, response) => { 
    try {
        const id = parseInt(request.params.id);
        const sport = await sportsModel.getSportById(id);
        if (sport) {
            response.status(200).json(sport);
        }   
        else {
            response.status(404).json();
        }
    } catch (error) {
        response.status(500).json({ error: `Internal Server Error:${error}` });
    }
};

const createSport = async (request, response) => {    
    try {
        const newSport = request.body;
        const createdSport = await sportsModel.insertSport(newSport);
        response.status(201).json(createdSport);
    } catch (error) {
        response.status(500).json({ error: `Internal Server Error:${error}` });
    }
};

const updateSport = async (request, response) => {
    try {
        const id = parseInt(request.params.id);
        const sport = request.body;
        const updatedSport = await sportsModel.updateSport(id, sport);
        if (updatedSport) {
            response.status(200).json(updatedSport);
        } else {
            response.status(404).json();
        }
    } catch (error) {
        response.status(500).json({ error: `Internal Server Error:${error}` });
    }   
};

const deleteSport = async (request, response) => {
    try {
        const id = parseInt(request.params.id);
        const success = await sportsModel.deleteSport(id);
        if (success) {
            response.status(204).json();
        } else {
            response.status(404).json();
        }
    } catch (error) {
        response.status(500).json({ error: `Internal Server Error:${error}` });
    }   
};

export default {
    getAllSports,
    getSportById,
    createSport,
    updateSport,
    deleteSport
};