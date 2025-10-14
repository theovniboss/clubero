import usersModel from "../models/users.js";

const getAllUsers = async (request, response) => {
    try {
        const users = await usersModel.getAllUsers(); 
        response.status(200).json(users);
    } catch (error) {
        response.status(500).json({ error: `Internal Server Error:${error}` });
    } 
};

const getUserById = async (request, response) => {
    try {
        const id = parseInt(request.params.id);
        const user = await usersModel.getUserById(id);
        if (user) {
            response.status(200).json(user);
        } else {
            response.status(404).json();
        } 
    } catch (error) {   
        response.status(500).json({ error: `Internal Server Error:${error}` });
    }
};

const createUser = async (request, response) => {    
    try {
        const newUser = request.body;
        const createdUser = await usersModel.insertUser(newUser);
        response.status(201).json(createdUser);
    } catch (error) {
        response.status(500).json({ error: `Internal Server Error:${error}` });
    }
};  

const updateUser = async (request, response) => {
    try {
        const id = parseInt(request.params.id);     
        const user = request.body;
        const updatedUser = await usersModel.updateUser(id, user);
        if (updatedUser) {
            response.status(200).json(updatedUser);
        } else {
            response.status(404).json();
        }   
    } catch (error) {
        response.status(500).json({ error: `Internal Server Error:${error}` });
    }   
};

const deleteUser = async (request, response) => {
    try {
        const id = parseInt(request.params.id); 
        const success = await usersModel.deleteUser(id);
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
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
};



