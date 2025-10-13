import clubsModel from '../models/clubs.js';

const getAllClubs = async (request, response) => {
    try {
        const clubs = await clubsModel.getAllClubs(); 
        response.status(200).json(clubs);
    } catch (error) {
        response.status(500).json({ error: `Internal Server Error:${error}` });
    } 
};

const getClubById = async (request, response) => { 
    try {
        const id = parseInt(request.params.id);
        const club = await clubsModel.getClubById(id);
        if (club) {
            response.status(200).json(club);
        }

        else {
            response.status(404).json();
        }
    } catch (error) {   
        response.status(500).json({ error: `Internal Server Error:${error}` });
    }
};

const createClub = async (request, response) => {    
    try {
        const newClub = request.body;
        const createdClub = await clubsModel.insertClub(newClub);
        response.status(201).json(createdClub);
    } catch (error) {
        response.status(500).json({ error: `Internal Server Error:${error}` });
    }
};

const updateClub = async (request, response) => {
    try {
        const id = parseInt(request.params.id);
        const club = request.body;
        const updatedClub = await clubsModel.updateClub(id, club);
        if (updatedClub) {
            response.status(200).json(updatedClub);
        } else {
            response.status(404).json();
        }
    } catch (error) {
        response.status(500).json({ error: `Internal Server Error:${error}` });
    }   
};

const deleteClub = async (request, response) => {
    try {
        const id = parseInt(request.params.id); 
        const success = await clubsModel.deleteClub(id);
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
    getAllClubs,
    getClubById,
    createClub,
    updateClub,
    deleteClub
};