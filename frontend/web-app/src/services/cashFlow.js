import { HTTP } from "../utils/http";

const getCashFlows = (clubId) => {
	return new Promise((resolve, reject) => {
		HTTP.get(`/cashflow/club/${clubId}`).then(
			(response) => {
				resolve(response);
			},
			(error) => {
				reject(error);
			}
		);
	});
};

const getCashFlowCategories = (clubId) => {
	return new Promise((resolve, reject) => {
		HTTP.get(`/cashflow/categories/club/${clubId}`).then(
			(response) => {
				resolve(response);
			},
			(error) => {
				reject(error);
			}
		);
	});
};

const createCashFlow = (data) => {
	return new Promise((resolve, reject) => {
		HTTP.post("/cashflow", data).then(
			(response) => {
				resolve(response);
			},
			(error) => {
				reject(error);
			}
		);
	});
};

export default {
	getCashFlows,
	getCashFlowCategories,
	createCashFlow,
};
