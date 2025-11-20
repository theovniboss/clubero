import { ref } from "vue"
import { defineStore } from 'pinia';
import { useAuth0 } from '@auth0/auth0-vue';

export const useUserStore = defineStore("userStore", () =>{

	
	const auth0 = useAuth0();

	const profile = ref({});
	const isLogged = ref(false);
	const isLoading = ref(true);
	const lastSync = ref('');
	

	const init = async (init)=>{
		if(!init) init = auth0;

		profile.value = init.user;
		isLogged.value = init.isAuthenticated;
		isLoading.value = false;
		lastSync.value = new Date().toISOString();
		console.log(init)
	}

	const clear = () =>{
		profile.value = {};
		isLogged.value = false;
		lastSync.value = '';
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
