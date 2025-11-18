import { PrismaClient as clientSQL } from "./generated/sqlite/client";
import { PrismaClient as clientMongo } from "./generated/mongodb/client";

const sqliteConn = new clientSQL();
const mongoConn = new clientMongo();

export {
	sqliteConn,
	mongoConn
}



