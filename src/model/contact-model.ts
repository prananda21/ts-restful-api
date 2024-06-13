import { Contact } from "@prisma/client";

export type ContactResponse = {
	id: number;
	first_name: string;
	last_name?: string | null;
	email?: string | null;
	phone_number?: string | null;
};

export type CreateContactRequest = {
	first_name: string;
	last_name?: string;
	email?: string;
	phone_number?: string;
};
export type UpdateContactRequest = {
	id: number;
	first_name: string;
	last_name?: string;
	email?: string;
	phone_number?: string;
};

export type SearchContactRequest = {
	name?: string;
	phone_number?: string;
	email?: string;
	page: number;
	size: number;
};

export function toContactResponse(contact: Contact): ContactResponse {
	return {
		id: contact.id,
		first_name: contact.first_name,
		last_name: contact.last_name,
		email: contact.email,
		phone_number: contact.phone_number,
	};
}
