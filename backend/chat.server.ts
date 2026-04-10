import chatController from "./controllers/chat.controller";

interface WebSocketData {
	room: string;
	clubId: number;
	teamId: number | null;
	userId: string;
	userName: string;
}

console.log("🔥 Starting WebSocket server for chat...");

const server = Bun.serve<WebSocketData>({
	port: Bun.env.SOCKET_SERVER_PORT, // Porta separada para o chat
	async fetch(req, server) {
		const url = new URL(req.url);

		// Extrai parâmetros da URL: ws://.../?clubId=1&teamId=2&userId=...&userName=...
		const clubId = parseInt(url.searchParams.get("clubId") as string, 10);
		const teamIdParam = url.searchParams.get("teamId");
		const teamId = teamIdParam ? parseInt(teamIdParam as string, 10) : null;
		console.log(clubId, teamId);
		const userId = url.searchParams.get("userId") || "";
		const userName = url.searchParams.get("userName") || "";

		if (!clubId || !userId || !userName) {
			return new Response("Missing required query parameters", {
				status: 400,
			});
		}

		// --- Lógica de Autorização ---
		// A lógica agora está encapsulada no serviço de autorização
		const isAuthorized = await chatController.canUserJoinChatRoom(
			userId,
			clubId,
			teamId
		);
		if (!isAuthorized) {
			return new Response("Unauthorized", { status: 403 });
		}

		// Define um nome único para a sala
		const room = teamId ? `team-${teamId}` : `club-${clubId}`;

		const success = server.upgrade(req, {
			data: { room, clubId, teamId, userId, userName },
		});

		return success
			? undefined
			: new Response("WebSocket upgrade error", { status: 400 });
	},
	websocket: {
		open(ws) {
			const { room, userId } = ws.data;
			console.log(`[WS] User ${userId} connected to room ${room}`);
			ws.subscribe(room); // Bun.js facilita o pub/sub!
		},

		message(ws, message) {
			console.log(message);
			const { room, clubId, teamId, userId, userName } = ws.data;
			const content = message.toString();
			const messageData = {
				createdAt: new Date(),
				content: content,
				clubId: clubId,
				teamId: teamId,
				userId: userId,
				userName: userName,
			};

			try {
				// 1. Salva a mensagem no MongoDB
				chatController.createMessage(messageData).then((message) => {
					// 2. Transmite a mensagem para todos na sala (incluindo quem enviou)
					server.publish(room, JSON.stringify(message));
				});
			} catch (error) {
				console.error(
					`[WS] Error processing message for room ${room}:`,
					error
				);
				// Opcional: enviar uma mensagem de erro de volta para o remetente
				ws.send(JSON.stringify({ error: "Failed to send message." }));
			}
		},

		close(ws) {
			const { room, userId } = ws.data;
			console.log(`[WS] User ${userId} disconnected from room ${room}`);
			// O `unsubscribe` é tratado automaticamente pelo Bun quando a conexão fecha
		},
	},
});

console.log(
	`WebSocket server listening on ws://${server.hostname}:${server.port}`
);
