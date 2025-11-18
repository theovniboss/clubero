import express from "express";
import eventController from "../controllers/event.controller";

const eventRouter = express.Router();

// --- Rotas de Eventos ---

// Listar eventos de um clube (com filtro opcional por time)
eventRouter.get("/club/:clubId/events", eventController.getEvents);

// Obter um evento específico
eventRouter.get("/event/:id", eventController.getEvent);

// Criar um novo evento
eventRouter.post("/event", eventController.createEvent);

// Atualizar um evento
eventRouter.put("/event/:id", eventController.updateEvent);

// Deletar um evento
eventRouter.delete("/event/:id", eventController.deleteEvent);

// --- Rotas para Participantes do Evento ---

// Listar todos os participantes de um evento específico
eventRouter.get("/event/:eventId/participants", eventController.getParticipants);

// Adicionar um ou mais participantes a um evento
eventRouter.post("/event/:eventId/participants", eventController.addParticipants);

// Atualizar o status de um participante (o usuário logado atualiza o seu próprio status)
eventRouter.put("/event/:eventId/participants/status", eventController.updateParticipantStatus);

// Remover um participante de um evento
eventRouter.delete("/event/:eventId/participants", eventController.removeParticipant);

export default eventRouter;