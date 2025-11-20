import { HTTP } from "../utils/http";

const getClubs = () => {
	return new Promise((resolve, reject) => {
		HTTP.get("/clubs").then((response) => {
			resolve(response);
		}, (error) => {
			reject(error);
		});
	});
};




export default {
	getClubs
}
