import { sqliteConn } from '../database/prisma'
import type { Sport } from "../database/generated/sqlite/client";

const getAllSports = async () => {
	return sqliteConn.sport.findMany();
};

const getSport = async (id: number) => {
	return sqliteConn.sport.findUnique({ where: { id } });
};

const createSport = async (sport: Sport) => {
	return sqliteConn.sport.create({ data: sport });
};

const updateSport = async (id: number, sport: Sport) => {
	return sqliteConn.sport.update({ where: { id }, data: sport });
};

const deleteSport = async (id: number) => {
	return sqliteConn.sport.delete({ where: { id } });
};

export default {
	getAllSports,
	getSport,
	createSport,
	updateSport,
	deleteSport,
};
