import prisma from "../database/prisma";
import type { Sport } from "../database/generated/prisma/client";

const getAllSports = async () => {
	return prisma.sport.findMany();
};

const getSport = async (id: number) => {
	return prisma.sport.findUnique({ where: { id } });
};

const createSport = async (sport: Sport) => {
	return prisma.sport.create({ data: sport });
};

const updateSport = async (id: number, sport: Sport) => {
	return prisma.sport.update({ where: { id }, data: sport });
};

const deleteSport = async (id: number) => {
	return prisma.sport.delete({ where: { id } });
};

export default {
	getAllSports,
	getSport,
	createSport,
	updateSport,
	deleteSport,
};
