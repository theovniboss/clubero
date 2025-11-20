<template>
	<div class="chat-container">
		<div class="chat-header">
			<h3>Chat do Clube</h3>
			<!-- Você pode adicionar o nome do clube dinamicamente aqui -->
		</div>
		<div class="messages-area" ref="messagesContainer">
			<div
				v-for="message in messages"
				:key="message.id"
				class="message-wrapper"
				:class="message.userId === currentUser.id ? 'sent' : 'received'"
			>
				<div class="message">
					<div class="message-sender" v-if="message.userId !== currentUser.id">
						{{ message.userName }}
					</div>
					<div class="message-content">
						{{ message.content }}
					</div>
					<div class="message-timestamp">
						{{ new Date(message.createdAt).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }) }}
					</div>
				</div>
			</div>
		</div>
		<div class="message-input-area">
			<form @submit.prevent="sendMessage" class="message-form">
				<input
					type="text"
					v-model="newMessage"
					placeholder="Digite sua mensagem..."
					class="message-input"
					autocomplete="off"
				/>
				<button type="submit" class="send-button">Enviar</button>
			</form>
		</div>
	</div>
</template>


<script setup>
import { ref, onMounted, onUnmounted, nextTick, computed, watch } from 'vue';
import { useUserStore } from '../store/user.store';
import { useClubStore } from '../store/club.store';

const clubStore = useClubStore();
const userStore = useUserStore();

const clubId = computed(()=> clubStore.selectedClub.id)
// Usuário atual obtido do seu store (Pinia)
// O backend usa o 'sub' do token como 'userId'
const currentUser = computed(() => {
	return { 
		id: userStore.profile.value?.sub, 
		name: userStore.profile.value?.name 
	};
});

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
	if (!clubId.value || !currentUser.value.id || !currentUser.value.name) {
		console.log("Aguardando dados do clube e do usuário para conectar ao chat.");
		return;
	}

    // Fecha conexão antiga se existir
    if (socket) {
        socket.close();
    }

	// O backend espera os parâmetros na URL
	const params = new URLSearchParams({
		clubId: clubId.value,		
		userId: currentUser.value.id,
		userName: currentUser.value.name,
		// teamId: null // Adicione se for usar chat de times
	});

	const socketUrl = `${import.meta.env.VITE_WEBSOCKET_URL}?${params.toString()}`;

	socket = new WebSocket(socketUrl);

	socket.onopen = () => {
		console.log(`[WS] Conectado ao chat do clube ${clubId.value}`);
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
watch([() => clubId.value, () => currentUser.value], () => {
    connectWebSocket();
}, { immediate: true }); // `immediate: true` executa a função assim que o componente é montado

onUnmounted(() => {
	// Desconecta o socket para limpar os recursos quando o componente for destruído
	if (socket && socket.readyState === WebSocket.OPEN) {
		socket.close();
	}
});
</script>

<style scoped>
.chat-container {
	display: flex;
	flex-direction: column;
	height: 500px; /* Altura de exemplo */
	border: 1px solid #ccc;
	border-radius: 8px;
	overflow: hidden;
	font-family: sans-serif;
}

.chat-header {
	padding: 1rem;
	background-color: #f5f5f5;
	border-bottom: 1px solid #ccc;
	text-align: center;
}

.chat-header h3 {
	margin: 0;
	font-size: 1.2rem;
}

.messages-area {
	flex-grow: 1;
	padding: 1rem;
	overflow-y: auto;
	background-color: #e9e9e9;
	display: flex;
	flex-direction: column;
	gap: 0.75rem;
}

.message-wrapper {
	display: flex;
	max-width: 70%;
}

.message-wrapper.sent {
	align-self: flex-end;
}

.message-wrapper.received {
	align-self: flex-start;
}

.message {
	padding: 0.5rem 0.75rem;
	border-radius: 12px;
	word-wrap: break-word;
}

.sent .message {
	background-color: #dcf8c6;
	border-bottom-right-radius: 2px;
}

.received .message {
	background-color: #ffffff;
	border-bottom-left-radius: 2px;
}

.message-sender {
	font-size: 0.8rem;
	font-weight: bold;
	color: #333;
	margin-bottom: 0.25rem;
}

.message-content {
	font-size: 0.95rem;
}

.message-timestamp {
	font-size: 0.7rem;
	color: #888;
	text-align: right;
	margin-top: 0.25rem;
}

.message-input-area {
	padding: 0.5rem 1rem;
	background-color: #f5f5f5;
	border-top: 1px solid #ccc;
}

.message-form {
	display: flex;
	gap: 0.5rem;
}

.message-input {
	flex-grow: 1;
	padding: 0.75rem;
	border: 1px solid #ccc;
	border-radius: 20px;
	font-size: 1rem;
}

.send-button {
	padding: 0.75rem 1.5rem;
	border: none;
	background-color: #007bff;
	color: white;
	border-radius: 20px;
	cursor: pointer;
	font-size: 1rem;
	font-weight: bold;
}

.send-button:hover {
	background-color: #0056b3;
}
</style>