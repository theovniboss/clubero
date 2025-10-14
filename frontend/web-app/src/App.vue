<template>
	<main class="flex flex-col flex-wrap w-full">
		<Header />
		<main class="flex grow">
			<Menu />
			<section class="flex p-5"><RouterView /></section>
		</main>
		<footer class="border-t border-gray-300 flex h-20 p-5 col-span-2 mt-auto">footer</footer>
	</main>




</template>

<script setup>

	import Header from './components/Header.vue';
	import Menu from './components/Menu.vue';

</script>

<style scoped></style>
