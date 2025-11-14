<template>
	<header class="flex h-20 border-b border-gray-300">
		<section class="min-w-3xs flex justify-center items-center border-r border-gray-300 p-5 ">
			<h1><img src="/images/logo.svg" alt="Seu clube em suas mãos" class="h-10" /></h1>
		</section>
		<section class="flex justify-center items-center p-5 grow">
			<section class="flex ml-auto relative" v-if="isLogged && !isLoading">
				<div class="h-10 v-10 rounded-full border-1 border-gray-300 p-2 bg-white mr-4 hover:bg-gray-50 ">
					<font-awesome-icon icon="fa-solid fa-bell" class="h-6 w-6 text-gray-500" />
				</div>
				<div v-click-outside="closeUserBox">
					<picture class="h-10 w-10 cursor-pointer" v-on:click="toggleUserBox">
						<img :src="profile.picture" :alt="profile?.name"
							class="h-10 w-10 rounded-full border-gray-300 border-1" />
					</picture>
					<div class="flex flex-col absolute right-0 top-12 boxed w-70" v-if="showUserBox">
						<div class="flex items-center">
							<picture class="min-h-10 min-w-10">
								<img :src="profile.picture" :alt="profile.name"
									class="h-10 w-10 rounded-full border-gray-300 border-1" />
							</picture>
							<div class="flex flex-col ml-2 overflow-hidden">
								<span class="text-sm font-medium text-gray-700 overflow-hidden text-ellipsis">{{ profile?.name }}</span>
								<span class="text-xs text-gray-500 overflow-hidden text-ellipsis">{{ profile?.email }}</span>
							</div>
						</div>
						<hr class="mt-4 mb-2 border-gray-200" />
						<router-link to="/user" class="rounded-md p-2 text-sm text-gray-600 hover:bg-gray-100 " @click="closeUserBox">
							<font-awesome-icon icon="fa-solid fa-user" class=" mr-2" />
							<span>Meu Perfil</span>
						</router-link>
						<hr class="my-2 border-gray-200" />
						<a v-on:click="logout"
							class="flex items-center-safe rounded-md p-2 text-sm text-gray-600 cursor-pointer hover:bg-danger-100 ">
							<font-awesome-icon icon="fa-solid fa-arrow-right-from-bracket" class="mr-2" />
							<span>Desconectar</span>
						</a>
					</div>
				</div>
			</section>
		</section>
	</header>

</template>
<script setup>
	import { ref, computed } from 'vue';
	import { useUserStore } from '../store/user.store.js';
	
	// DATA
	const showUserBox = ref(false);

	// COMPUTED
	const profile = computed(() => useUserStore().profile.value);
	const isLogged = computed(() => useUserStore().isLogged);
	const isLoading = computed(() => useUserStore().isLoading.value);


	// METHODS
	const toggleUserBox = () => {
		showUserBox.value = !showUserBox.value;
	};
	const closeUserBox = () => {
		showUserBox.value = false;
	};

	const logout = () => {
		useUserStore().logout();
	}
	



</script>