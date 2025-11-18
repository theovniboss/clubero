import { sqliteConn } from '../database/prisma'
import type { Team } from "../database/generated/sqlite/client";

export interface TeamUpdateInput {
	name?: string;
	sportId?: number | null;
	updatedBy?: string;
}

const getAllTeams = async () => {
	return sqliteConn.team.findMany();
};

const getTeams = async (createdBy: string) => {
	return sqliteConn.team.findMany({ where: { createdBy } });
};

const getTeam = async (id: number, includeUsers: boolean) => {
	return sqliteConn.team.findUnique({ 
		where: { id },
		include:{
			teamUser: includeUsers
		}

	});
};

const createTeam = async (team: Team) => {
	return sqliteConn.team.create({ 
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
	return sqliteConn.team.update({ where: { id }, data: team });
};

const deleteTeam = async (id: number, createdByBy: string) => {

	return sqliteConn.team.delete({ where: { id: id, createdBy:createdByBy } });
};

const getTeamsByUser = async (userId: string) => {
	return sqliteConn.team.findMany({
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
	return sqliteConn.teamUser.create({
		data: {
			teamId: id,
			userId: userId,
			active: true
		}
	})

}


const isUserInTeam = async (userId: string, teamId: number): Promise<boolean> => {
    const teamMembership = await sqliteConn.teamUser.findUnique({
        where: { userId_teamId: { userId, teamId }, active: true },
    });
    return !!teamMembership;
};


export default {
	getAllTeams,
	getTeams,
	getTeam,
	createTeam,
	updateTeam,
	deleteTeam,
	getTeamsByUser,
	addTeamUser,
	isUserInTeam
};
