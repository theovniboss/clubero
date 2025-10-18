import { ManagementClient, UserInfoClient } from "auth0";

const management = () => new ManagementClient({
	domain: process.env.AUTH0_DOMAIN,
	clientId: process.env.AUTH0_M2M_CLIENT_ID,
	clientSecret: process.env.AUTH0_M2M_CLIENT_SECRET,
	scope: "read:users update:users",
});

const updateUser = async (id, dataToUpdate) => {
	return await management().users.update(id, dataToUpdate);
};

const getUser = async (id) => {
	return await management().users.get(id);
};

const getUserId = (accessToken) => {
	const userInfo = new UserInfoClient({
		domain: process.env.AUTH0_DOMAIN,
	});
	return new Promise((resolve, reject) => {
		userInfo.getUserInfo(accessToken).then((user) => {
			resolve(user.data.sub);
		}, (error) => {
			reject(error);
		});
	});
};

export default { updateUser, getUser, getUserId };
