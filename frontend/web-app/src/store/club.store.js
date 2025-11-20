import { useLocalStorage } from '@vueuse/core'

import { defineStore } from 'pinia';


export const useClubStore = defineStore("clubStore", () =>{

	const selectedClub = useLocalStorage('selectedClub', {});

	const selectClub = (club) =>{
		selectedClub.value = club;
	}

	return {
		selectedClub,
		selectClub
	}

});