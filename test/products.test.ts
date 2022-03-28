import supertest from "supertest";

const request = supertest("http://localhost:"+ process.env.port);

describe("Product Test Suite", () => {
	try {
		beforeEach(function () {
			//
			 
		});

		afterEach(function () {
			//
		});
 
		test("GET products", async () => {
			await request.get(`/api/products`)
				.expect(200);
		});

		test("GET products by id", async () => {
			await request.get(`/api/products/1`)
				.expect(404);
		});

		test("GET products by id 6238e8210000646efa367326", async () => {
			await request.get(`/api/products/6238e8210000646efa367326`)
				.expect(200);
		});

 		test("POST products no inputs", async () => {
			await request.post(`/api/products`)
				.expect(400);
		});
		
		test("POST products", async () => {
			await request.post(`/api/products`)
			.send({
				title: `io`,
				latitude: 0,
				longitude: 0,
				url: `url`,
				description: `idescriptiono`

			})
			.expect(200);
		}); 

		test("DELETE products", async () => {
			await request.delete(`/api/products/1`)
				.expect(200);
		});

		test("PUT products", async () => {
			await request.put(`/api/products/1`)
				.expect(200);
		});
 
	} catch (err) {
		//console.log("Exception : ", err);
	}
});
   