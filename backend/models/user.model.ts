export interface User {
	readonly user_id: string,
	picture?: string,
	name?: string,
	readonly email: string,
	nickname?: string, 
	user_metadata: {
		birthDate?: Date
	}
}

enum Gender {
	MALE,
	FEMALE, 
	MIXED
}

