import { sqliteConn } from '../database/prisma'
import type { Event, EventParticipant, EventConfirmationStatus } from '../database/generated/sqlite/client';

const getEvents = async (clubId: number, teamId?: number) => {
    return await sqliteConn.event.findMany({
        where: {
            clubId: clubId,
            teamId: teamId
        },
		include: {
			participants: true
		}
    });
}

const getEvent = async (id: number) => {
    return await sqliteConn.event.findUnique({
        where: {
            id: id
        },
		include: {
			participants: true
		}
    });
}

const createEvent = async (event: Event) => {
    return await sqliteConn.event.create({
        data: event
    });
}

const updateEvent = async (id: number, event: Event) => {
    return await sqliteConn.event.update({
        data: event,
        where: {
            id: id
        }
    })
}

const deleteEvent = async (id: number) => {
    return await sqliteConn.event.delete({
        where: {
            id: id
        }
    });
}

// --- Event Participant Services ---

const getParticipantsByEvent = async (eventId: number) => {
    return await sqliteConn.eventParticipant.findMany({
        where: {
            eventId: eventId
        }
    });
}

const existParticipant = async	(eventId: number, userId: string) => {
    const participant =  await sqliteConn.eventParticipant.findFirst({
        where: {
			AND: {
				eventId: eventId,
				userId: userId
			}
        }
    });

	return participant!==null;
}


const addParticipants = async (participants: EventParticipant[]) => {
    return await sqliteConn.eventParticipant.createManyAndReturn({
        data: participants
    });
}

const updateParticipantStatus = async (userId: string, eventId: number, status: EventConfirmationStatus) => {
    return await sqliteConn.eventParticipant.update({
        where: {	
			eventId_userId:{		         
				eventId: eventId,
				userId: userId
			}
        },
        data: {
            status: status,
            updatedBy: userId
        }
    });
}

const removeParticipants = async (participants: EventParticipant[]) => {
    return await sqliteConn.eventParticipant.deleteMany({
        where: {
            OR: participants.map(p => ({
                eventId: p.eventId,
                userId: p.userId
            }))
        }
    });
}

export default {
    getEvents,
    getEvent,
    createEvent,
    updateEvent,
    deleteEvent,
    getParticipantsByEvent,
    addParticipants,
    updateParticipantStatus,
    removeParticipants, // Renomeado de removeParticipants para removeParticipant
	existParticipant
}
