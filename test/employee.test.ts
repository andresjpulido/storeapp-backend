import config from "../src/config";
 
import  supertest from "supertest";
const request = supertest("http://localhost:4000");

describe("Activity Test Suite", () => {
	try {
		beforeEach(function () {
			//
		});

		afterEach(function () {
			//
		});
 
		test("GET activities", async () => {
			await request.get(`/api/activities`)
				.expect(200);
		});

		test("GET activities by id", async () => {
			await request.get(`/api/activities/1`)
				.expect(404);
		});

		test("GET activities by id 6238e8210000646efa367326", async () => {
			await request.get(`/api/activities/6238e8210000646efa367326`)
				.expect(200);
		});

 		test("POST activities no inputs", async () => {
			await request.post(`/api/activities`)
				.expect(400);
		});
		
		test("POST activities", async () => {
			await request.post(`/api/activities`)
			.send({
				title: `io`,
				latitude: 0,
				longitude: 0,
				url: `url`,
				description: `idescriptiono`

			})
			.expect(200);
		}); 

		test("DELETE activities", async () => {
			await request.delete(`/api/activities/1`)
				.expect(200);
		});

		test("PUT activities", async () => {
			await request.put(`/api/activities/1`)
				.expect(200);
		});
 
	} catch (err) {
		//console.log("Exception : ", err);
	}
});
   