import { ManagementClient, AuthenticationClient } from "auth0";
import type{ User } from './../models/user.model'

const management =  new ManagementClient({
	domain: Bun.env.AUTH0_CLUBERO_DOMAIN || '',
	clientId:Bun.env.AUTH0_CLUBERO_M2M_CLIENT_ID || '',
	clientSecret: Bun.env.AUTH0_CLUBERO_M2M_CLIENT_SECRET || ''
});

const authentication = new AuthenticationClient({
	domain: Bun.env.AUTH0_CLUBERO_DOMAIN || '',
	clientId: Bun.env.AUTH0_CLUBERO_M2M_CLIENT_ID || '',
	clientSecret: Bun.env.AUTH0_CLUBERO_M2M_CLIENT_SECRET || '',
})

const updateUser = async (id: string, dataToUpdate: User) => {
	return await management.users.update(id, dataToUpdate);
};

const getUser = async (id: string) => {
	return await management.users.get(id);
};


const getUsersById = async (users: string[], page: number = 0, perPage: number = 50) => {

	const query = users.map(id => `user_id:"${id}"`).join(' OR ');
	return await management.users.list({
		include_totals:true,
		fields: 'user_id,email,picture,name,nickname,user_metadata.birthDate',
		q:query,
		sort: 'name:1',
		page: page,
		per_page: perPage
		
	});
}

const createUser = async (user: User) => {
	const dynamicPass = await Bun.password.hash(Bun.randomUUIDv7(), { algorithm: "bcrypt" });


	return await management.users.create({
		connection: Bun.env.AUTH0_CLUBERO_CONNECTION || '',
		email: user.email,
		name: user.name,
		nickname: user.nickname,
		password: dynamicPass,
		email_verified: false,
		verify_email: false
	})
}

const changePasswordUser = async (email: string) => {
	return await authentication.database.changePassword({
		connection: Bun.env.AUTH0_CLUBERO_CONNECTION || '',
		email: email
	})

}



export default { 
	updateUser,
	getUser,
	getUsersById,
	createUser,
	changePasswordUser 
}
