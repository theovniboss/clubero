import type { User }  from "./user.model";

export interface Team {
	id: Number;
	clubId: Number;
	sportId: Number;
	name: string;
	description?: string;
	image?: string;
	gender?: Gender;
	category?: string;
	active: boolean;
	createdBy: string;
	createdAt: Date;
	updatedBy?: string;
	updatedAt?: Date;
	users?: User[];
}

export enum Gender {
	MALE,
	FEMALE, 
	MIXED
}
