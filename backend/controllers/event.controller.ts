import type { Request, Response } from 'express';
import userUtils from '../utils/user.utils';
import eventService from '../services/event.service';

const getEvents = async (request: Request, response: Response) => {
    const clubId = parseInt(request.params.clubId as string, 10);
    if (isNaN(clubId)) {
        return response.status(400).json();
    }

    const teamId = request.query.teamId ? parseInt(request.query.teamId as string, 10) : undefined;
    if (request.query.teamId && isNaN(teamId as number)) {
        return response.status(400).json();
    }

    const events = await eventService.getEvents(clubId, teamId);
    return response.status(200).json(events);
}

const getEvent = async (request: Request, response: Response) => {
    const id = parseInt(request.params.id as string, 10);
    if (isNaN(id)) {
        return response.status(400).json();
    }

    const event = await eventService.getEvent(id);
    if (!event) {
        return response.status(404).json();
    }

    return response.status(200).json(event);
}

const createEvent = async (request: Request, response: Response) => {
    const createdBy = userUtils.getUserId(request);
    const event = request.body;
    event.createdBy = createdBy;

    const newEvent = await eventService.createEvent(event);
    return response.status(201).json(newEvent);
}

const updateEvent = async (request: Request, response: Response) => {
    const id = parseInt(request.params.id as string, 10);
    if (isNaN(id)) {
        return response.status(400).json();
    }

    const updatedBy = userUtils.getUserId(request);
    const event = request.body;
    event.updatedBy = updatedBy;

    const updated = await eventService.updateEvent(id, event);
    return response.status(200).json(updated);
}

const deleteEvent = async (request: Request, response: Response) => {
    const id = parseInt(request.params.id as string, 10);
    if (isNaN(id)) {
        return response.status(400).json();
    }

    const deleted = await eventService.deleteEvent(id);
    return response.status(200).json(deleted);
}

// --- Event Participant Controllers ---

const getParticipants = async (request: Request, response: Response) => {
    const eventId = parseInt(request.params.eventId  as string, 10);
    if (isNaN(eventId)) {
        return response.status(400).json({ message: 'Event ID inválido.' });
    }

    const participants = await eventService.getParticipantsByEvent(eventId);
    if (!participants) {
        return response.status(404).json({ message: 'Participantes não encontrados para este evento.' });
    }
    return response.status(200).json(participants);
};

const addParticipants = async (request: Request, response: Response) => {
    
    const eventId = parseInt(request.params.eventId  as string, 10);
	if(!eventId) return response.status(400).json();

	const createdBy = userUtils.getUserId(request);
	
	const  {participants} = request.body;
	if(!participants || !participants.length) return response.status(400).json();

	for (let id = 0; id < participants.length; id++) {
		const element = participants[id];
		element.createdBy = createdBy;
		element.eventId = eventId;
	}

    const result = await eventService.addParticipants(participants);
    return response.status(200).json(result);
};

const updateParticipantStatus = async (request: Request, response: Response) => {

    const eventId = parseInt(request.params.eventId  as string, 10);
	if(!eventId) return response.status(400).json();

	const userId = userUtils.getUserId(request);

	const existParticipant = await eventService.existParticipant(eventId, userId);

	if(!existParticipant)
		return response.status(404).json();


    const { status } = request.body;

    const updatedParticipant = await eventService.updateParticipantStatus(userId, eventId, status.toUpperCase());
    return response.status(200).json(updatedParticipant);
};

const removeParticipant = async (request: Request, response: Response) => {
    const eventId = parseInt(request.params.eventId as string, 10);
    const { participants } = request.body;
		
    if (isNaN(eventId) || !participants || !participants.length) {
        return response.status(400).json();
    }
	for (let id = 0; id < participants.length; id++) {
		const element = participants[id];
		element.eventId = eventId;		
	}

    const deleted = await eventService.removeParticipants(participants);
    return response.status(200).send(deleted);
};

export default {
    getEvents,
    getEvent,
    createEvent,
    updateEvent,
    deleteEvent,
    getParticipants,
    addParticipants,
    updateParticipantStatus,
    removeParticipant
}
