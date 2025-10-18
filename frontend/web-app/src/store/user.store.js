import { ref } from "vue"
import { defineStore } from 'pinia';
import { useAuth0 } from '@auth0/auth0-vue';

export const useUserStore = defineStore("useStore", () =>{

	
	const auth0 = useAuth0();

	const profile = ref(null);
	const isLogged = ref(false);
	const isLoading = ref(null);
	const lastSync = ref(null);
	

	const init = async (init)=>{
		if(!init) init = auth0;

		profile.value = init.user;
		isLogged.value = init.isAuthenticated;
		isLoading.value = init.isLoading;
		lastSync.value = new Date().toISOString();
	}

	const clear = () =>{
		profile.value = null;
		isLogged.value = false;
		lastSync.value = null;
	}

	const logout = () =>{
		auth0.logout();
	}

	const getAccessToken = async () =>{
		return await auth0.getAccessTokenSilently();
	}



	return {
		profile,
		isLogged,
		isLoading,
		lastSync,
		
		init,
		clear,
		logout,
		getAccessToken
	}







})
