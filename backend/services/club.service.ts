import { sqliteConn } from '../database/prisma'
import type { Club } from '../database/generated/sqlite/client';

const getAllClubs = async () =>{
	return await sqliteConn.club.findMany();
}

const getClubs = async (createdBy:string) => {
	return await sqliteConn.club.findMany(
		{
			where:{
				createdBy: createdBy
			}
		}
	);
}

const getClub = async (id:number) => {
	return await sqliteConn.club.findUnique(
		{
			where:{
				id: id
			}
		}
	);
}

const createClub = async (club: Club) => {
	return await sqliteConn.club.create({
		data: club
	});
}

const updateClub = async (id:number, club: Club) =>{
	return await sqliteConn.club.update({
		data: club,
		where:{
			id:id
		}
	})
}

const deleteClub = async (id:number, createdBy:string) =>{
	return await sqliteConn.club.delete({
		where:{
			createdBy: createdBy,
			id: id
		}
	});
}



export default {
	getAllClubs,
	getClubs,
	getClub,
	createClub,
	updateClub,
	deleteClub
}