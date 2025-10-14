<template>
	<header class="flex h-20 border-b border-gray-300">
		<section class="min-w-3xs flex justify-center items-center border-r border-gray-300 p-5 ">
			<h1><img src="/images/logo.svg" alt="Seu clube em suas mãos" class="h-10" /></h1>
		</section>
		<section class="flex justify-center items-center p-5 grow">

			<section class="flex ml-auto" v-if="isAuthenticated">
				<div class="h-10 v-10 rounded-full border-1 border-gray-300 p-2 bg-white mr-4 hover:bg-gray-50 duration-300">
					<font-awesome-icon icon="fa-regular fa-bell" class="h-6 w-6 text-gray-500"  />
				</div>
				<picture class="h-10 w-10 cursor-pointer">
					<img :src="user.picture" :alt="user.name" class="h-10 w-10 rounded-full border-gray-300 border-1" />
				</picture>
				<div class="flex flex-col justify-center ml-3 mr-6">
					<span class="text-sm font-medium text-gray-700">{{ user.name }}</span>
					<span class="text-xs text-gray-500">{{ user.email }}</span>
					<button @click="userLogout" class="h-10 px-2 bg-red-500 text-white rounded-md hover:bg-danger-600 duration-300">Sair</button>
				</div>
				
			</section>

		</section>
	</header>

</template>
<script setup>
	import { useAuth0 } from '@auth0/auth0-vue';


	const { isAuthenticated, user, logout } = useAuth0();

	const userLogout = () => {
		logout({ logoutParams: { returnTo: window.location.origin } });
	}





</script>