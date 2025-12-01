<template>
	<aside class="min-w-3xs border-r border-gray-300 flex p-5">
		<nav class="flex flex-col w-full">
			<router-link to="/" class="menu-item">
				<font-awesome-icon icon="fa-solid fa-house" class="mr-2" />
				<span>Início</span>
			</router-link>
			<router-link to="/club" class="menu-item">
				<span>
					<font-awesome-icon icon="fa-solid fa-ranking-star" class="mr-2" />
					<span>Meu Clube</span>
				</span>
			</router-link>
			<router-link to="/club/cash-flow" class="menu-item">
				<font-awesome-icon icon="fa-solid fa-money-bill" class="mr-2" />
				<span>Fluxo de caixa</span>
			</router-link>

		</nav>

	</aside>

</template>
<script setup></script>