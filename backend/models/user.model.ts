export interface User {
	picture?: string,
	name?: string,
	readonly email: string,
	nickname?: string, 
	user_metadata: {
		birthDate?: Date
	}
}


