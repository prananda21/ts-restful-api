import supertest from "supertest";
import { UserTest, ContactTest, AddressTest } from "./test-util";
import { web } from "../src/app/web";
import { logger } from "../src/app/logging";

describe("POST /api/contacts/:contactId/addresses", () => {
	beforeEach(async () => {
		await UserTest.create();
		await ContactTest.create();
	});

	afterEach(async () => {
		await AddressTest.deleteAll();
		await ContactTest.deleteAll();
		await UserTest.delete();
	});
	it("should be able to create address", async () => {
		const contact = await ContactTest.get();
		const response = await supertest(web)
			.post(`/api/contacts/${contact.id}/addresses`)
			.set("X-API-TOKEN", "test")
			.send({
				street: "Jalan",
				city: "Badung",
				province: "Bali",
				country: "Indonesia",
				postal_code: "80361",
			});
		logger.debug(response.body);
		expect(response.status).toBe(200);
		expect(response.body.data.id).toBeDefined();
		expect(response.body.data.street).toBe("Jalan");
		expect(response.body.data.city).toBe("Badung");
		expect(response.body.data.province).toBe("Bali");
		expect(response.body.data.country).toBe("Indonesia");
		expect(response.body.data.postal_code).toBe("80361");
	});
	it("should be able to reject create address if invalid request", async () => {
		const contact = await ContactTest.get();
		const response = await supertest(web)
			.post(`/api/contacts/${contact.id}/addresses`)
			.set("X-API-TOKEN", "test")
			.send({
				street: "",
				city: "",
				province: "",
				country: "",
				postal_code: "",
			});
		logger.debug(response.body);
		expect(response.status).toBe(400);
		expect(response.body.errors).toBeDefined();
	});

	it("should be able to reject create address if contact is not found", async () => {
		const contact = await ContactTest.get();
		const response = await supertest(web)
			.post(`/api/contacts/${contact.id + 1}/addresses`)
			.set("X-API-TOKEN", "test")
			.send({
				street: "Jalan",
				city: "Badung",
				province: "Bali",
				country: "Indonesia",
				postal_code: "80361",
			});
		logger.debug(response.body);
		console.log(response.body);
		expect(response.status).toBe(404);
		expect(response.body.errors).toBeDefined();
	});
});

describe("GET /api/contacts/:contactId/addresses/:addressId", () => {
	beforeEach(async () => {
		await UserTest.delete();
		await UserTest.create();
		await ContactTest.create();
		await AddressTest.create();
	});

	afterEach(async () => {
		await AddressTest.deleteAll();
		await ContactTest.deleteAll();
		await UserTest.delete();
	});

	it("should able to get address data", async () => {
		const contact = await ContactTest.get();
		const address = await AddressTest.get();

		const response = await supertest(web)
			.get(`/api/contacts/${contact.id}/addresses/${address.id}`)
			.set("X-API-TOKEN", "test");

		logger.debug(response.body);
		expect(response.status).toBe(200);
		expect(response.body.data.id).toBeDefined();
		expect(response.body.data.street).toBe(address.street);
		expect(response.body.data.city).toBe(address.city);
		expect(response.body.data.province).toBe(address.province);
		expect(response.body.data.country).toBe(address.country);
		expect(response.body.data.postal_code).toBe(address.postal_code);
	});
	it("should able to reject get address data if address id not found", async () => {
		const contact = await ContactTest.get();
		const address = await AddressTest.get();

		const response = await supertest(web)
			.get(`/api/contacts/${contact.id}/addresses/${address.id + 1}`)
			.set("X-API-TOKEN", "test");

		logger.debug(response.body);
		expect(response.status).toBe(404);
		expect(response.body.errors).toBeDefined();
	});
	it("should able to reject get address data if contact id not found", async () => {
		const contact = await ContactTest.get();
		const address = await AddressTest.get();

		const response = await supertest(web)
			.get(`/api/contacts/${contact.id + 1}/addresses/${address.id}`)
			.set("X-API-TOKEN", "test");

		logger.debug(response.body);
		expect(response.status).toBe(404);
		expect(response.body.errors).toBeDefined();
	});
});

describe("PUT /api/contacts/:contactId/addresses/:addressId", () => {
	beforeEach(async () => {
		await UserTest.delete();
		await UserTest.create();
		await ContactTest.create();
		await AddressTest.create();
	});

	afterEach(async () => {
		await AddressTest.deleteAll();
		await ContactTest.deleteAll();
		await UserTest.delete();
	});

	it("should be able to update address", async () => {
		const contact = await ContactTest.get();
		const address = await AddressTest.get();

		const response = await supertest(web)
			.put(`/api/contacts/${contact.id}/addresses/${address.id}`)
			.set("X-API-TOKEN", "test")
			.send({
				street: "Jalan",
				city: "Badung",
				province: "Bali",
				country: "Indonesia",
				postal_code: "80361",
			});

		logger.debug(response.body);
		expect(response.status).toBe(200);
		expect(response.body.data.id).toBe(address.id);
		expect(response.body.data.street).toBe("Jalan");
		expect(response.body.data.city).toBe("Badung");
		expect(response.body.data.province).toBe("Bali");
		expect(response.body.data.country).toBe("Indonesia");
		expect(response.body.data.postal_code).toBe("80361");
	});
	it("should be able to reject update address if request invalid", async () => {
		const contact = await ContactTest.get();
		const address = await AddressTest.get();

		const response = await supertest(web)
			.put(`/api/contacts/${contact.id}/addresses/${address.id}`)
			.set("X-API-TOKEN", "test")
			.send({
				street: "",
				city: "",
				province: "",
				country: "",
				postal_code: "",
			});

		logger.debug(response.body);
		expect(response.status).toBe(400);
		expect(response.body.errors).toBeDefined;
	});
	it("should be able to reject update address if address not found", async () => {
		const contact = await ContactTest.get();
		const address = await AddressTest.get();

		const response = await supertest(web)
			.put(`/api/contacts/${contact.id}/addresses/${address.id + 1}`)
			.set("X-API-TOKEN", "test")
			.send({
				street: "Jalan",
				city: "Badung",
				province: "Bali",
				country: "Indonesia",
				postal_code: "80361",
			});

		logger.debug(response.body);
		expect(response.status).toBe(404);
		expect(response.body.errors).toBeDefined;
	});
	it("should be able to reject update address if contact not found", async () => {
		const contact = await ContactTest.get();
		const address = await AddressTest.get();

		const response = await supertest(web)
			.put(`/api/contacts/${contact.id + 1}/addresses/${address.id}`)
			.set("X-API-TOKEN", "test")
			.send({
				street: "Jalan",
				city: "Badung",
				province: "Bali",
				country: "Indonesia",
				postal_code: "80361",
			});

		logger.debug(response.body);
		expect(response.status).toBe(404);
		expect(response.body.errors).toBeDefined;
	});
});

describe("DELETE /api/contacts/:contactId/addresses/:addressId", () => {
	beforeEach(async () => {
		await UserTest.delete();
		await UserTest.create();
		await ContactTest.create();
		await AddressTest.create();
	});

	afterEach(async () => {
		await AddressTest.deleteAll();
		await ContactTest.deleteAll();
		await UserTest.delete();
	});

	it("should be able to remove address", async () => {
		const contact = await ContactTest.get();
		const address = await AddressTest.get();

		const response = await supertest(web)
			.delete(`/api/contacts/${contact.id}/addresses/${address.id}`)
			.set("X-API-TOKEN", "test");

		logger.debug(response.body);
		expect(response.status).toBe(200);
		expect(response.body.data).toBe("OK");
	});
	it("should reject to remove address if address is not found", async () => {
		const contact = await ContactTest.get();
		const address = await AddressTest.get();

		const response = await supertest(web)
			.delete(`/api/contacts/${contact.id}/addresses/${address.id + 1}`)
			.set("X-API-TOKEN", "test");

		logger.debug(response.body);
		expect(response.status).toBe(404);
		expect(response.body.errors).toBeDefined;
	});
	it("should reject to remove address if contact is not found", async () => {
		const contact = await ContactTest.get();
		const address = await AddressTest.get();

		const response = await supertest(web)
			.delete(`/api/contacts/${contact.id + 1}/addresses/${address.id}`)
			.set("X-API-TOKEN", "test");

		logger.debug(response.body);
		expect(response.status).toBe(404);
		expect(response.body.errors).toBeDefined;
	});
});

describe("GET /api/contacts/:contactId/addresses", () => {
	beforeEach(async () => {
		await UserTest.delete();
		await UserTest.create();
		await ContactTest.create();
		await AddressTest.create();
	});

	afterEach(async () => {
		await AddressTest.deleteAll();
		await ContactTest.deleteAll();
		await UserTest.delete();
	});

	it("should be able to list address", async () => {
		const contact = await ContactTest.get();

		const response = await supertest(web)
			.get(`/api/contacts/${contact.id}/addresses`)
			.set("X-API-TOKEN", "test");

		logger.debug(response.body);
		expect(response.status).toBe(200);
		expect(response.body.data.length).toBe(1);
	});
	it("should reject to remove address if contact is not found", async () => {
		const contact = await ContactTest.get();

		const response = await supertest(web)
			.get(`/api/contacts/${contact.id + 1}/addresses`)
			.set("X-API-TOKEN", "test");

		logger.debug(response.body);
		expect(response.status).toBe(404);
		expect(response.body.errors).toBeDefined;
	});
});
