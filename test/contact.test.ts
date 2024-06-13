import supertest from "supertest";
import { UserTest, ContactTest } from "./test-util";
import { web } from "../src/app/web";
import { logger } from "../src/app/logging";

describe("POST /api/contacts", () => {
	beforeEach(async () => {
		await UserTest.create();
	});

	afterEach(async () => {
		await ContactTest.deleteAll();
		await UserTest.delete();
	});

	it("should create new contact", async () => {
		const response = await supertest(web)
			.post("/api/contacts")
			.set("X-API-TOKEN", "test")
			.send({
				first_name: "Prananda",
				last_name: "Yoga",
				email: "prananda@gmail.com",
				phone_number: "08123411111",
			});

		logger.debug(response.body);
		expect(response.status).toBe(200);
		expect(response.body.data.id).toBeDefined();
		expect(response.body.data.first_name).toBe("Prananda");
		expect(response.body.data.last_name).toBe("Yoga");
		expect(response.body.data.email).toBe("prananda@gmail.com");
		expect(response.body.data.phone_number).toBe("08123411111");
	});
	it("should reject create new contact if data invalid", async () => {
		const response = await supertest(web)
			.post("/api/contacts")
			.set("X-API-TOKEN", "test")
			.send({
				first_name: "",
				last_name: "",
				email: "",
				phone_number: "08123411111111111111112222222222221",
			});

		logger.debug(response.body);
		expect(response.status).toBe(400);
		expect(response.body.errors).toBeDefined();
	});
	it("should reject create new contact if token invalid", async () => {
		const response = await supertest(web)
			.post("/api/contacts")
			.set("X-API-TOKEN", "salah")
			.send({
				first_name: "Prananda",
				last_name: "Yoga",
				email: "prananda@mail.com",
				phone_number: "081111111111",
			});

		logger.debug(response.body);
		expect(response.status).toBe(401);
		expect(response.body.errors).toBeDefined();
	});
});

describe("GET /api/contacts/:contactId", () => {
	beforeEach(async () => {
		await UserTest.create();
		await ContactTest.create();
	});

	afterEach(async () => {
		await ContactTest.deleteAll();
		await UserTest.delete();
	});

	it("should be able to get contact", async () => {
		const contact = await ContactTest.get();
		const response = await supertest(web)
			.get(`/api/contacts/${contact.id}`)
			.set("X-API-TOKEN", "test");

		logger.debug(response.body);
		expect(response.status).toBe(200);
		expect(response.body.data).toBeDefined();
		expect(response.body.data.first_name).toBe(contact.first_name);
		expect(response.body.data.last_name).toBe(contact.last_name);
		expect(response.body.data.email).toBe(contact.email);
		expect(response.body.data.phone_number).toBe(contact.phone_number);
	});
	it("should be reject to get contact if id invalid", async () => {
		const contact = await ContactTest.get();
		const response = await supertest(web)
			.get(`/api/contacts/${contact.id + 1}`)
			.set("X-API-TOKEN", "test");

		logger.debug(response.body);
		expect(response.status).toBe(404);
		expect(response.body.errors).toBeDefined();
	});
});

describe("PUT /api/contacts/:contactId", () => {
	beforeEach(async () => {
		await UserTest.create();
		await ContactTest.create();
	});

	afterEach(async () => {
		await ContactTest.deleteAll();
		await UserTest.delete();
	});

	it("should be able to update contact", async () => {
		const contact = await ContactTest.get();
		const response = await supertest(web)
			.put(`/api/contacts/${contact.id}`)
			.set("X-API-TOKEN", "test")
			.send({
				first_name: "Prananda",
				last_name: "Yoga",
				email: "prananda@gmail.com",
				phone_number: "08123411111",
			});

		logger.debug(response.body);
		expect(response.status).toBe(200);
		expect(response.body.data.id).toBe(contact.id);
		expect(response.body.data.first_name).toBe("Prananda");
		expect(response.body.data.last_name).toBe("Yoga");
		expect(response.body.data.email).toBe("prananda@gmail.com");
		expect(response.body.data.phone_number).toBe("08123411111");
	});
	it("should be able to reject update contact if request is invalid", async () => {
		const contact = await ContactTest.get();
		const response = await supertest(web)
			.put(`/api/contacts/${contact.id}`)
			.set("X-API-TOKEN", "test")
			.send({
				first_name: "",
				last_name: "",
				email: "",
				phone_number: "",
			});

		logger.debug(response.body);
		expect(response.status).toBe(400);
		expect(response.body.errors).toBeDefined;
	});
	it("should be able to reject update contact if token is invalid", async () => {
		const contact = await ContactTest.get();
		const response = await supertest(web)
			.put(`/api/contacts/${contact.id}`)
			.set("X-API-TOKEN", "bobob")
			.send({
				first_name: "Prananda",
				last_name: "Yoga",
				email: "prananda@gmail.com",
				phone_number: "08123411111",
			});

		logger.debug(response.body);
		expect(response.status).toBe(401);
		expect(response.body.errors).toBeDefined;
	});
	it("should be able to reject update contact if id is invalid", async () => {
		const contact = await ContactTest.get();
		const response = await supertest(web)
			.put(`/api/contacts/${contact.id + 1}`)
			.set("X-API-TOKEN", "test")
			.send({
				first_name: "Prananda",
				last_name: "Yoga",
				email: "prananda@gmail.com",
				phone_number: "08123411111",
			});

		logger.debug(response.body);
		expect(response.status).toBe(404);
		expect(response.body.errors).toBeDefined;
	});
});

describe("DELETE /api/contacts/:contactId", () => {
	beforeEach(async () => {
		await UserTest.create();
		await ContactTest.create();
	});

	afterEach(async () => {
		await ContactTest.deleteAll();
		await UserTest.delete();
	});

	it("should be able to delete contact", async () => {
		const contact = await ContactTest.get();
		const response = await supertest(web)
			.delete(`/api/contacts/${contact.id}`)
			.set("X-API-TOKEN", "test");

		logger.debug(response.body);
		expect(response.status).toBe(200);
		expect(response.body.data).toBe("OK");
	});
	it("should be able reject to delete contact if contact is not found", async () => {
		const contact = await ContactTest.get();
		const response = await supertest(web)
			.delete(`/api/contacts/${contact.id + 1}`)
			.set("X-API-TOKEN", "test");

		logger.debug(response.body);
		expect(response.status).toBe(404);
		expect(response.body.errors).toBeDefined;
	});
});

describe("GET /api/contacts", () => {
	beforeEach(async () => {
		await UserTest.create();
		await ContactTest.create();
	});

	afterEach(async () => {
		await ContactTest.deleteAll();
		await UserTest.delete();
	});
	it("should be able to search contacts", async () => {
		const response = await supertest(web)
			.get("/api/contacts")
			.set("X-API-TOKEN", "test");

		logger.debug(response.body);
		expect(response.status).toBe(200);
		expect(response.body.data.length).toBe(1);
		expect(response.body.paging.current_page).toBe(1);
		expect(response.body.paging.total_pages).toBe(1);
		expect(response.body.paging.size).toBe(10);
	});
	it("should be able to search contacts using name", async () => {
		const response = await supertest(web)
			.get("/api/contacts")
			.query({
				name: "est",
			})
			.set("X-API-TOKEN", "test");

		logger.debug(response.body);
		expect(response.status).toBe(200);
		expect(response.body.data.length).toBe(1);
		expect(response.body.paging.current_page).toBe(1);
		expect(response.body.paging.total_pages).toBe(1);
		expect(response.body.paging.size).toBe(10);
	});
	it("should be able to search contacts using email", async () => {
		const response = await supertest(web)
			.get("/api/contacts")
			.query({
				email: "example",
			})
			.set("X-API-TOKEN", "test");

		logger.debug(response.body);
		expect(response.status).toBe(200);
		expect(response.body.data.length).toBe(1);
		expect(response.body.paging.current_page).toBe(1);
		expect(response.body.paging.total_pages).toBe(1);
		expect(response.body.paging.size).toBe(10);
	});
	it("should be able to search contacts using phone_number", async () => {
		const response = await supertest(web)
			.get("/api/contacts")
			.query({
				phone_number: "081",
			})
			.set("X-API-TOKEN", "test");

		logger.debug(response.body);
		expect(response.status).toBe(200);
		expect(response.body.data.length).toBe(1);
		expect(response.body.paging.current_page).toBe(1);
		expect(response.body.paging.total_pages).toBe(1);
		expect(response.body.paging.size).toBe(10);
	});
	it("should be able to search contacts no result", async () => {
		const response = await supertest(web)
			.get("/api/contacts")
			.query({
				name: "salah",
			})
			.set("X-API-TOKEN", "test");

		logger.debug(response.body);
		expect(response.status).toBe(200);
		expect(response.body.data.length).toBe(0);
		expect(response.body.paging.current_page).toBe(1);
		expect(response.body.paging.total_pages).toBe(0);
		expect(response.body.paging.size).toBe(10);
	});
	it("should be able to search contacts with paging", async () => {
		const response = await supertest(web)
			.get("/api/contacts")
			.query({
				page: 2,
				size: 1,
			})
			.set("X-API-TOKEN", "test");

		logger.debug(response.body);
		expect(response.status).toBe(200);
		expect(response.body.data.length).toBe(0);
		expect(response.body.paging.current_page).toBe(2);
		expect(response.body.paging.total_pages).toBe(1);
		expect(response.body.paging.size).toBe(1);
	});
});
