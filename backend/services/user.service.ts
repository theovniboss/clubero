import { ManagementClient, UserInfoClient } from "auth0";
import type{ User } from './../models/user.model'

const management = () => new ManagementClient({
	domain: Bun.env.AUTH0_DOMAIN || '',
	clientId: Bun.env.AUTH0_M2M_CLIENT_ID || '',
	clientSecret: Bun.env.AUTH0_M2M_CLIENT_SECRET || '',
	//scope: 'read:users update:users';
});

const updateUser = async (id: string, dataToUpdate: User) => {
	return await management().users.update(id, dataToUpdate);
};

const getUser = async (id: string) => {
	return await management().users.get(id);
};


export default { updateUser, getUser };
