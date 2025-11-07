import prisma from '../database/prisma'
import type { Club } from '../database/generated/prisma/client';

const getAllClubs = async () =>{
	return await prisma.club.findMany();
}

const getClubs = async (createdBy:string) => {
	return await prisma.club.findMany(
		{
			where:{
				createdBy: createdBy
			}
		}
	);
}

const getClub = async (id:number) => {
	return await prisma.club.findUnique(
		{
			where:{
				id: id
			}
		}
	);
}

const createClub = async (club: Club) => {
	return await prisma.club.create({
		data: club
	});
}

const updateClub = async (id:number, club: Club) =>{
	return await prisma.club.update({
		data: club,
		where:{
			id:id
		}
	})
}

const deleteClub = async (id:number, createdBy:string) =>{
	return await prisma.club.delete({
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