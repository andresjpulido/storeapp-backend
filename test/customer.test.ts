import supertest from "supertest";

const request = supertest("http://localhost:"+ process.env.port);

describe("Customer Test Suite", () => {
	try {
		beforeEach(function () {
			//
			 
		});

		afterEach(function () {
			//
		});
 
		test("GET customers", async () => {
			await request.get(`/api/customers`)
				.expect(200);
		});

		test("GET customers by id", async () => {
			await request.get(`/api/customers/1`)
				.expect(404);
		});

		test("GET customers by id 6238e8210000646efa367326", async () => {
			await request.get(`/api/customers/6238e8210000646efa367326`)
				.expect(200);
		});

 		test("POST customers no inputs", async () => {
			await request.post(`/api/customers`)
				.expect(400);
		});
		
		test("POST customers", async () => {
			await request.post(`/api/customers`)
			.send({
				title: `io`,
				latitude: 0,
				longitude: 0,
				url: `url`,
				description: `idescriptiono`

			})
			.expect(200);
		}); 

		test("DELETE customers", async () => {
			await request.delete(`/api/customers/1`)
				.expect(200);
		});

		test("PUT customers", async () => {
			await request.put(`/api/customers/1`)
				.expect(200);
		});
 
	} catch (err) {
		//console.log("Exception : ", err);
	}
});
   