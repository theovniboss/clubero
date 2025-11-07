import prisma from "../database/prisma";
import type { Team } from "../database/generated/prisma/client";

export interface TeamUpdateInput {
	name?: string;
	sportId?: number | null;
	updatedBy?: string;
}

const getAllTeams = async () => {
	return prisma.team.findMany();
};

const getTeams = async (createdBy: string) => {
	return prisma.team.findMany({ where: { createdBy } });
};

const getTeam = async (id: number, includeUsers: boolean) => {
	return prisma.team.findUnique({ 
		where: { id },
		include:{
			teamUser: includeUsers
		}

	});
};

const createTeam = async (team: Team) => {
	return prisma.team.create({ 
		data: {
			...team,
			teamUser: {
				create: {
				userId: team.createdBy,
				active: true,
				}
			}
		}	
		
	});
};

const updateTeam = async (id: number, team: Team) => {
	return prisma.team.update({ where: { id }, data: team });
};

const deleteTeam = async (id: number, createdByBy: string) => {

	return prisma.team.delete({ where: { id: id, createdBy:createdByBy } });
};

const getTeamsByUser = async (userId: string) => {
	return prisma.team.findMany({
		where:{
			teamUser: {
				some:{
					userId: userId,
					active: true
				}

			} 
		}	
	})
}

const addTeamUser = async(id: number, userId: string) => {
	return prisma.teamUser.create({
		data: {
			teamId: id,
			userId: userId,
			active: true
		}
	})

}

export default {
	getAllTeams,
	getTeams,
	getTeam,
	createTeam,
	updateTeam,
	deleteTeam,
	getTeamsByUser,
	addTeamUser
};
