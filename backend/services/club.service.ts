import { sqliteConn } from '../database/prisma'
import type { Club } from '../database/generated/sqlite/client';

const getAllClubs = async () =>{
	return await sqliteConn.club.findMany();
}

const getClubs = async (userId:string) => {
	return await sqliteConn.club.findMany(
		{
			where:{
				OR: [ 
				{createdBy: userId},
				{
					teams:{
						some:{
							teamUser:{
								some:{
									userId: userId,
									active: true
								}
							}
						}
					}
				}]
			},
			include: {
				teams: {
					where:{
						teamUser: {
							some: { userId: userId, active: true }
						}
					}
				},
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

const isUserInClub = async (userId: string, clubId: number): Promise<boolean> => {
	const teamCount = await sqliteConn.club.findFirst(
		{
			where:{
				AND: [
					{id: clubId}
				],
				OR: [ 
				{createdBy: userId},
				{
					teams:{
						some:{
							teamUser:{
								some:{
									userId: userId,
									active: true
								}
							}
						}
					}
				}]
			},
		}
	);

    return !!teamCount;
};



export default {
	getAllClubs,
	getClubs,
	getClub,
	createClub,
	updateClub,
	deleteClub,
	isUserInClub
}