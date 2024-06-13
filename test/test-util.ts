import { Contact, User } from "@prisma/client";
import { prismaClient } from "../src/app/database";
import bcrypt from "bcrypt";

export class UserTest {
	static async delete() {
		await prismaClient.user.deleteMany({
			where: {
				username: "test",
			},
		});
	}

	static async create() {
		await prismaClient.user.create({
			data: {
				username: "test",
				name: "test",
				password: await bcrypt.hash("test", 10),
				token: "test",
			},
		});
	}

	static async get(): Promise<User> {
		const user = await prismaClient.user.findFirst({
			where: {
				username: "test",
			},
		});

		if (!user) {
			throw new Error("User not found");
		}

		return user;
	}
}

export class ContactTest {
	static async deleteAll() {
		await prismaClient.contact.deleteMany({
			where: {
				User: {
					username: "test",
				},
			},
		});
	}

	static async create() {
		await prismaClient.contact.create({
			data: {
				first_name: "test",
				last_name: "test",
				email: "test@example.com",
				phone_number: "081999999",
				username: "test",
			},
		});
	}

	static async get(): Promise<Contact> {
		const contact = await prismaClient.contact.findFirst({
			where: {
				username: "test",
			},
		});

		if (!contact) {
			throw new Error("Contact not found");
		}

		return contact;
	}
}
