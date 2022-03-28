import supertest from "supertest";

const request = supertest("http://localhost:"+ process.env.port);

describe("Employee Test Suite", () => {
	try {
		beforeEach(function () {
			//
			 
		});

		afterEach(function () {
			//
		});
 
		test("GET employees", async () => {
			await request.get(`/api/employees`)
				.expect(200);
		});

		test("GET employees by id", async () => {
			await request.get(`/api/employees/1`)
				.expect(404);
		});

		test("GET employees by id 6238e8210000646efa367326", async () => {
			await request.get(`/api/employees/6238e8210000646efa367326`)
				.expect(200);
		});

 		test("POST employees no inputs", async () => {
			await request.post(`/api/employees`)
				.expect(400);
		});
		
		test("POST employees", async () => {
			await request.post(`/api/employees`)
			.send({
				title: `io`,
				latitude: 0,
				longitude: 0,
				url: `url`,
				description: `idescriptiono`

			})
			.expect(200);
		}); 

		test("DELETE employees", async () => {
			await request.delete(`/api/employees/1`)
				.expect(200);
		});

		test("PUT employees", async () => {
			await request.put(`/api/employees/1`)
				.expect(200);
		});
 
	} catch (err) {
		//console.log("Exception : ", err);
	}
});
   