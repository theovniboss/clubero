import axios from "axios";
import { useUserStore } from "../store/user.store.js";

const instance = axios.create({
	baseURL: import.meta.env.VITE_API_URL,
});

instance.interceptors.request.use(async (config) => {
		const userStore = useUserStore();
        const token = await userStore.getAccessToken();
        config.headers.Authorization = `Bearer ${token}`;
        return config;
	},
	(error) => {
		return Promise.reject(error);
	}
);

instance.interceptors.response.use((response) => response,
	(error) => {
		const userStore = useUserStore();
		if (error.response && error.response.status === 401) {
			// Token expired or invalid
			userStore.logout();
			// Redirect to login page or show a message
		}
		return Promise.reject(error);
	}
);

export const HTTP = instance;
