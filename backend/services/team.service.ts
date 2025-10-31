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

const getTeam = async (id: number) => {
	return prisma.team.findUnique({ where: { id } });
};

const createTeam = async (team: Team) => {
	return prisma.team.create({ data: team });
};

const updateTeam = async (id: number, team: Team) => {
	return prisma.team.update({ where: { id }, data: team });
};

const deleteTeam = async (id: number, createdByBy: string) => {

	return prisma.team.delete({ where: { id: id, createdBy:createdByBy } });
};

export default {
	getAllTeams,
	getTeams,
	getTeam,
	createTeam,
	updateTeam,
	deleteTeam,
};
