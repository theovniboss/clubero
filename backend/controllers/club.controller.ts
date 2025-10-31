import type { Request, Response } from 'express';
import userUtils from '../utils/user.utils';
import  clubService  from './../services/club.service'


const getAllClubs = async (request: Request, response: Response) => {
	const clubs = await clubService.getAllClubs(); 
	return response.status(200).json(clubs);
}

const getClubs = async (request: Request, response: Response) => {
	const createdBy = userUtils.getUserId(request);

	const clubs = await clubService.getClubs(createdBy);
	if(!clubs || !clubs.length)
		return response.status(404).json();
	return response.status(200).json(clubs);
}

const getClub = async (request: Request, response: Response) =>{
	const  id  =  parseInt(request.params.id as string, 10);
	if(isNaN(id))
		return response.status(400).json();

	const club  =  await clubService.getClub(id);
	if(!club)
		return response.status(404).json();

	return response.status(200).json(club);


}

const createClub = async (request: Request, response: Response) => {
	const createdBy = userUtils.getUserId(request);
	const club = request.body;
	club.createdBy = createdBy;
	const newClub = await clubService.createClub(club);
	return response.status(200).json(newClub);
}

const updateClub  = async (request: Request, response: Response) => {
	const  id  =  parseInt(request.params.id as string, 10);
	if(isNaN(id))
		return response.status(400).json();

	const updatedBy = userUtils.getUserId(request);
	const club = request.body;
	club.updatedBy = updatedBy;
	

	const updated = await clubService.updateClub(id, club);
	return response.status(200).json(updated);

}

const deleteClub  = async (request: Request, response: Response) => {
	const createdBy = userUtils.getUserId(request);
	const  id  =  parseInt(request.params.id as string, 10);
	if(isNaN(id))
		return response.status(400).json();
	const deleted = await clubService.deleteClub(id, createdBy);
	return response.status(200).json(deleted);
}
export default{
	getAllClubs,
	getClubs,
	getClub,
	createClub,
	updateClub,
	deleteClub
}