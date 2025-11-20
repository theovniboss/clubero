<template>
	<section>
		<div class="relative h-full rounded-t cursor-pointer z-10" v-click-outside="closeAllClubs">
			<div class="flex items-center p-2 rounded-md w-[300px] " v-on:click="toggleClubs">
				<picture class="min-h-12 min-w-12 mr-4">
					<img :src="selectedClub?.image" :alt="selectedClub?.name"
						v-on:error="replaceImage($event, selectedClub.name)"
						class="h-12 w-12 rounded-full border-gray-300 border-1" />
				</picture>
				<p class="flex flex-col">
					<span class="uppercase font-semibold">
						{{ selectedClub?.name }}
					</span>
					<span class="text-xs">
						{{ selectedClub.country }} - {{ selectedClub.state }} - {{ selectedClub.city }}
					</span>
				</p>
				<font-awesome-icon icon="fa-solid fa-chevron-down fa-xl" class="ml-4"
					:class="{'rotate-180': showAllClubs}" v-if="clubs.length > 0" />
			</div>

			<div class="flex flex-col absolute left-0 top-17  w-[300px] p-2 boxed   " v-if="showAllClubs">
				<div class="flex items-center  rounded-md p-2 text-sm text-gray-600 hover:bg-gray-100"
					v-for="club in clubs" v-on:click="selectClub(club)">
					<picture class="min-h-8 min-w-8 mr-4">
						<img :src="club?.image" :alt="selectedClub?.name" v-on:error="replaceImage($event, club.name)"
							class="h-8 w-8 rounded-full border-gray-300 border-1" />
					</picture>
					<p class="flex flex-col">
						<span class="uppercase font-semibold text-sm">
							{{ club?.name }}
						</span>
						<span class="text-xs">
							{{ club.country }} - {{ club.state }} - {{ club.city }}
						</span>
					</p>
					<font-awesome-icon icon="fa-solid fa-chevron-down fa-xl" class="ml-auto" v-if="clubs.length > 1" />
				</div>
			</div>
		</div>
	</section>
</template>

<script setup>
	import { onMounted, ref, computed} from 'vue';
	import servClub from '../services/club.js'
	import { useClubStore } from '../store/club.store.js';

	onMounted(()=>{
		loadClubs();
	});

	const clubsData = ref([]);
	const showAllClubs = ref(false);
	const selectedClub = computed(() =>  useClubStore().selectedClub);

	const clubs = computed(() => clubsData.value.filter(club => club.id !== selectedClub.value.id));
	

	const loadClubs = async () =>{
		await servClub.getClubs().then(response=>{
			clubsData.value = response.data;
			if(selectedClub.value.id == null)
				useClubStore().selectClub(clubs.value[0]);
		}, error=>{
			console.error(error)
		});
	}

	const replaceImage = (e, name) =>{
		e.target.src = import.meta.env.VITE_AVATAR_PLACEHOLDER.replace(':seed', name);
	}

	const toggleClubs = () =>{
		showAllClubs.value = !showAllClubs.value;
	}
	const closeAllClubs = () =>{
		showAllClubs.value = false;
	}


	const selectClub = (club) =>{
		useClubStore().selectClub(club);
		showAllClubs.value = false;
	}



</script>