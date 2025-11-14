import userUtils from '../utils/user.utils';
import userService from "../services/user.service";
import type { Request, Response } from 'express'
import type { User } from '../models/user.model';



const getUser = async (request: Request, response: Response) => {
	const id = userUtils.getUserId(request);
	if(!id) return response.status(404).json();

	const user = await userService.getUser(id) as User
	if(!user) return response.status(404).json();


	return response.status(200).json(user);
			
	
}

const updateUser = async (request: Request, response: Response) => {
	const body = request.body;
	const id = userUtils.getUserId(request);
	if(!id) return response.status(404).json();

	const updatedUser = await userService.updateUser(id, body);
	if (!updatedUser) return response.status(404).json();

	return response.status(200).json(updatedUser);
}

const createUser =  async (request: Request, response: Response) => {
	const body = request.body;
	const user = await userService.createUser(body);
	if (!user) return response.status(404).json();

	return response.status(200).json(user);
}

const changePasswordUser = async (request: Request, response: Response) => {
	const {email} = request.body;
	if (!email) return response.status(400).json();

	const userClientId = userUtils.getUserClientId(request);

	const data = await userService.changePasswordUser(email, userClientId);
	if (!data) return response.status(404).json();

	return response.status(200).json(data);

}





export default { 
	getUser,
    updateUser,
	createUser,
	changePasswordUser 
};



