import userUtils from '../utils/user.utils';
import type { Request, Response } from 'express'
import userService from "../services/user.service";

const getUser = async (request: Request, response: Response) => {
	const id = userUtils.getUserId(request);
	if(!id)
		return response.status(404).json();

	const user = await userService.getUser(id)
	if(user)
		return response.status(200).json(user);
	
	return response.status(404).json();
			
	
}

const updateUser = async (request: Request, response: Response) => {
	const body = request.body;
	const id = userUtils.getUserId(request);
	if(!id)
		return response.status(404).json();

	const updatedUser = await userService.updateUser(id, body);
	if (updatedUser) 
		return response.status(200).json(updatedUser);

	return response.status(404).json();

};

// const deleteUser = async (request, response) => {
//     try {
//         const id = parseInt(request.params.id); 
//         const success = await usersModel.deleteUser(id);
//         if (success) {
//             response.status(204).json();
//         } else {
//             response.status(404).json();
//         }       
//     } catch (error) {
//         response.status(500).json({ error: `Internal Server Error:${error}` });
//     }   
// };

export default { 
	getUser,
    //getAllUsers,
    //getUserById,
    //createUser,
    updateUser,
   // deleteUser,
};



