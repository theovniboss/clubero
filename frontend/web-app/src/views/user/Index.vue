<template>
	<h2>Meu Perfil</h2>
	<div class="area w-full ">
		<div class="flex items-center ">
			<picture class="min-h-35 min-w-35 mr-4">
				<img :src="formUser.picture" alt="formUser.name"
					class="h-35 w-35 rounded-full border-gray-300 border-1" />
			</picture>

			<ul class="grid grid-cols-3 gap-x-6 gap-y-6 w-full">
				<li class="flex grow flex-col group">
					<label for="formUser.name" class="text-gray-500 text-sm group-focus-within:text-primary">Nome</label>
					<input :class="{'input':activatedEdit}" v-model="formUser.name" :readonly="!activatedEdit" :disabled="!activatedEdit" id="formUser.name" />
				</li>
				<li class="flex flex-col group">
					<label for="formUser.email" class="text-gray-500 text-sm group-focus-within:text-primary">E-mail</label>
					<input :class="{'input border-0':activatedEdit}, 'font-medium'" v-model="formUser.email" :readonly="true" :disabled="true" id="formUser.email"/>
				</li>
				<li class="flex flex-col group">
					<label for="formUser.nickname" class="text-gray-500 text-sm group-focus-within:text-primary">Apelido</label>
					<input :class="{'input':activatedEdit}, 'font-medium'" v-model="formUser.nickname" :readonly="!activatedEdit" :disabled="!activatedEdit" id="formUser.nickname"/>
				</li>
				<li class="flex flex-col group">
					<label for="formUser.user_metadata.birthDate" class="text-gray-500 text-sm group-focus-within:text-primary">Data Nascimento</label>
					<input :class="{'input':activatedEdit}, 'font-medium'"  v-model="formUser.user_metadata.birthDate" :readonly="!activatedEdit" :disabled="!activatedEdit" id="formUser.user_metadata.birthDate"/>
				</li>
				<li class="col-start-3 flex">
					<button class="btn-primary-sm mt-auto" v-on:click="activeEdit" v-if="!activatedEdit">
						<font-awesome-icon icon="fa-solid fa-pen-to-square" class="mr-2" />
						<span>Editar Perfil</span>
					</button>
					<button class="btn-success-sm mt-auto" v-on:click="save"  v-if="activatedEdit">
						<font-awesome-icon icon="fa-solid fa-floppy-disk" class="mr-2" />
						<span>Salvar</span>
					</button>
					<button class="btn-danger-sm mt-auto" v-on:click="cancelEdit(true)" v-if="activatedEdit">
						<font-awesome-icon icon="fa-solid fa-xmark" class="mr-2" />
						<span>Cancelar</span>
					</button>
				</li>
			</ul>


		</div>



	</div>

</template>
<script setup>
	import { onMounted, ref } from 'vue';
	import servUser from '../../services/user.js'

	const activatedEdit = ref(false); 

	const formUser = ref({
		picture: null,
		name: null,
		email: null,
		nickname: null, 
		user_metadata: {
			birthDate:null
		}})

	onMounted(()=>{
		loadUser();
	});

	const loadUser = () =>{
		servUser.getUser().then(response=>{
			const data = response.data;
			parseFormUserData(data);
		})
	}

	const parseFormUserData = (data) => {
		formUser.value.picture = data.picture;
		formUser.value.name = data.name;
		formUser.value.email = data.email;
		formUser.value.nickname = data.nickname;
		formUser.value.user_metadata.birthDate = data.user_metadata.birthDate;
	}

	const activeEdit = () => {
		activatedEdit.value = true;
	};
	const cancelEdit = (load) => {
		activatedEdit.value = false;
		if(load==true)
			loadUser();
	};

	const save = async () => {
		delete formUser.value.picture;
		delete formUser.value.email;
		servUser.saveUser(formUser.value).then((response)=>{			
			parseFormUserData(response.data);
			cancelEdit();			
		}, error=>{
			console.error(error);
		})


	};






</script>