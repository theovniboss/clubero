<template>
	<div class="absolute right-5 bottom-5 flex flex-col w-full max-w-[400px] min-w-[300px] border border-gray-300 rounded-lg overflow-hidden font-sans transition-all duration-300 shadow-md"
		:class="isMinimized ? 'h-auto' : 'h-[500px]'">
		<div class="p-2 bg-gray-100 border-b border-gray-300 flex justify-between items-center cursor-pointer hover:bg-gray-200 transition-colors"
			@click="toggleMinimize">
			<h3 class="text-base font-medium">Chat: {{ selectedClub.name }}</h3>
			<button class="text-gray-600 hover:text-gray-800 focus:outline-none">
				<font-awesome-icon :icon="isMinimized ? 'fa-solid fa-chevron-up' : 'fa-solid fa-chevron-down'" />
			</button>
		</div>
		<div v-show="!isMinimized" class="flex-1 p-4 overflow-y-auto bg-gray-200 flex flex-col gap-3"
			ref="messagesContainer">
			<div v-for="message in messages" :key="message.id" class="flex max-w-[70%]"
				:class="message.userId === currentUser.id ? 'self-end' : 'self-start'">
				<div class="px-3 py-2 rounded-xl break-words"
					:class="message.userId === currentUser.id ? 'bg-[#dcf8c6] rounded-br-sm' : 'bg-white rounded-bl-sm'">
					<div class="text-xs font-bold text-gray-800 mb-1" v-if="message.userId !== currentUser.id">
						{{ message.userName }}
					</div>
					<div class="text-[0.95rem]">
						{{ message.content }}
					</div>
					<div class="text-[0.7rem] text-gray-500 text-right mt-1">
						{{ new Date(message.createdAt).toLocaleTimeString('pt-BR', {
							day: '2-digit', month: '2-digit', year: '2-digit', hour: '2-digit', minute: '2-digit'
						}) }}
					</div>
				</div>
			</div>
		</div>
		<div v-show="!isMinimized" class="p-2 bg-gray-100 border-t border-gray-300">
			<form @submit.prevent="sendMessage" class="flex gap-2">
				<Input type="text" v-model="newMessage" placeholder="Digite sua mensagem..."
					class="flex-1 p-3 rounded-full text-base" autocomplete="off" />
				<Button type="submit" variant="primary">
					<font-awesome-icon icon="fa-solid fa-paper-plane" />
				</Button>
			</form>
		</div>
	</div>
</template>


<script setup>
import { ref, onMounted, onUnmounted, nextTick, computed, watch } from 'vue';
import { useUserStore } from '../store/user.store';
import { useClubStore } from '../store/club.store';
import Input from './form/Input.vue';
import Button from './elements/Button.vue';

const clubStore = useClubStore();
const userStore = useUserStore();

const selectedClub = computed(() => clubStore.selectedClub)
// Usuário atual obtido do seu store (Pinia)
// O backend usa o 'sub' do token como 'userId'
const currentUser = computed(() => {
	return {
		id: userStore.profile.value?.sub,
		name: userStore.profile.value?.name
	};
});

// Estado para controlar se o chat está minimizado
const isMinimized = ref(true);

const toggleMinimize = () => {
	isMinimized.value = !isMinimized.value;
};

// Estado para armazenar as mensagens do chat
const messages = ref([]);

// Estado para a nova mensagem sendo digitada
const newMessage = ref('');

// Referência ao container das mensagens para controlar o scroll
const messagesContainer = ref(null);

// Instância do Socket
let socket = null;

// Função para rolar para a última mensagem
const scrollToBottom = async () => {
	await nextTick(); // Espera o DOM ser atualizado
	if (messagesContainer.value) {
		messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight;
	}
};

// Função para enviar uma nova mensagem
const sendMessage = async () => {
	if (newMessage.value.trim() === '') return;

	// O backend espera receber apenas o conteúdo da mensagem como uma string
	socket.send(newMessage.value);

	// Limpa o campo de input
	newMessage.value = '';
};

const connectWebSocket = () => {
	// Garante que temos os dados necessários para conectar
	if (!selectedClub.value.id || !currentUser.value.id || !currentUser.value.name) {
		console.log("Aguardando dados do clube e do usuário para conectar ao chat.");
		return;
	}

	// Fecha conexão antiga se existir
	if (socket) {
		socket.close();
	}

	// O backend espera os parâmetros na URL
	const params = new URLSearchParams({
		clubId: selectedClub.value.id,
		userId: currentUser.value.id,
		userName: currentUser.value.name,
	});

	const socketUrl = `${import.meta.env.VITE_WEBSOCKET_URL}?${params.toString()}`;

	socket = new WebSocket(socketUrl);

	socket.onopen = () => {
		console.log(`[WS] Conectado ao chat do clube ${selectedClub.value.id}`);
		// TODO: Implementar no backend uma forma de buscar o histórico ao conectar
		// Ex: O cliente envia uma mensagem especial ou o servidor envia ao abrir.
		// Por enquanto, apenas limpamos as mensagens antigas.
		messages.value = [];
	};

	socket.onmessage = (event) => {
		try {
			const message = JSON.parse(event.data);
			// O backend já retorna o objeto da mensagem salvo no banco.
			// A estrutura é { id, createdAt, content, clubId, teamId, userId, userName }
			messages.value.push(message);
			scrollToBottom();
		} catch (error) {
			console.error("[WS] Erro ao processar mensagem recebida:", error);
		}
	};

	socket.onclose = () => {
		console.log("[WS] Desconectado do servidor de chat.");
	};

	socket.onerror = (error) => {
		console.error("[WS] Erro na conexão:", error);
		// Attempt to log more specific error details if they exist
		if (error && error.message) {
			console.error("[WS] Mensagem de erro detalhada:", error.message);
		}
		if (error && error.code) {
			console.error("[WS] Código de erro:", error.code);
		}
	};
};

// Observa mudanças no clubId ou no usuário para reconectar ao WebSocket
watch([() => selectedClub.value.id, () => currentUser.value], () => {
	connectWebSocket();
}, { immediate: true }); // `immediate: true` executa a função assim que o componente é montado

onUnmounted(() => {
	// Desconecta o socket para limpar os recursos quando o componente for destruído
	if (socket && socket.readyState === WebSocket.OPEN) {
		socket.close();
	}
});
</script>