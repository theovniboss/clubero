import { HTTP } from "../utils/http";

const getUser = () => {
	return new Promise((resolve, reject) => {
		HTTP.get("/user").then((response) => {
			resolve(response);
		}, (error) => {
			reject(error);
		});
	});
};

const saveUser = (user) => {
	return new Promise((resolve, reject) => {
		HTTP.put("/user", user).then((response) => {
			resolve(response);
		}, (error) => {
			reject(error);
		});
	});
};


export default {
	getUser,
	saveUser
}
