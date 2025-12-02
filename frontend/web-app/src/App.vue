<template>
	<main class="flex flex-col flex-wrap w-full">
		<Header />
		<main class="flex grow">
			<Menu />
			<section class="p-5 w-full">
				<RouterView />
			</section>
		</main>
		<footer class="border-t border-gray-300 flex h-20 p-5 col-span-2 mt-auto"></footer>
		<Chat />
	</main>




</template>

<script setup>

import Chat from './components/Chat.vue';
import Header from './components/Header.vue';
import Menu from './components/Menu.vue';

</script>

<style scoped></style>
