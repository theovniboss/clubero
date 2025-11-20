<template>
	<header class="flex h-20 border-b border-gray-300">
		<section class="min-w-3xs flex justify-center items-center border-r border-gray-300 p-5 ">
			<h1><img src="/images/logo.svg" alt="Seu clube em suas mãos" class="h-10" /></h1>
		</section>
		<section class="flex justify-center items-center px-5 grow">
			
			<ClubSelector />
			
			<UserBox />
		</section>
	</header>

</template>
<script setup>

	import ClubSelector from './ClubSelector.vue';	
import UserBox from './UserBox.vue';
	
	



</script>