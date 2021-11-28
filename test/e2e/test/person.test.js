const { request, routes, serverClose } = require("../lib");

const TEST_PERSON_DATA = {
  name: "Ivan",
  description: "student",
  age: 20,
  hobbies: ["reading", "sport"],
};
const TEST_PERSON_DATA_wrong = {
  name: "Ivan",
  description: "student",
  age: "20",
  hobbies: ["reading", "sport"],
};
describe("Hacker scope: scenario #1", () => {
  afterAll(() => {
    serverClose();
  });
  let personId;
  it("should get all people", async () => {
    const peopleResponse = await request
      .get(routes.person.getAll)
      .set("Accept", "application/json")
      .expect(200)
      .expect("Content-Type", /json/);

    expect(peopleResponse.status).toEqual(200);
    expect(Array.isArray(peopleResponse.body)).toBe(true);
    expect(peopleResponse.body.length).toBe(0);
  });
  it("should create person successfully", async () => {
    await request
      .post(routes.person.create)
      .set("Accept", "application/json")
      .send(TEST_PERSON_DATA)
      .expect(201)
      .expect("Content-Type", /json/)
      .then((res) => {
        expect(typeof res.body.id).toEqual("string");
        expect(res.body.name).toBe("Ivan");
        personId = res.body.id;
      });
  });
  it("should get a person by id", async () => {
    await request
      .get(routes.person.getById(personId))
      .set("Accept", "application/json")
      .expect(200)
      .expect("Content-Type", /json/)
      .then((res) => {
        expect(typeof res.body).toEqual("object");
        expect(res.body.id).toEqual(personId);
        expect(res.body.name).toEqual("Ivan");
      });
  });

  it("should put update person", async () => {
    const updatedPerson = {
      ...TEST_PERSON_DATA,
      name: "Autotest updated TEST_USER",
      id: personId,
    };
    await request
      .put(routes.person.update(personId))
      .set("Accept", "application/json")
      .send(updatedPerson)
      .expect(200)
      .expect("Content-Type", /json/)
      .then((res) => expect(res.body).toMatchObject(updatedPerson));
  });
  it("should delete person successfully", async () => {
    const deleteResponse = await request.delete(routes.person.delete(personId));
    expect(deleteResponse.status).toBe(200);
  });

  it("should get a person by id(deleted)", async () => {
    await request
      .get(routes.person.getById(personId))
      .set("Accept", "application/json")
      .expect(404)
      .then((res) => {
        expect(res.body.message).toBe("Person Not Found");
      });
  });
});
describe("Hacker scope: scenario #2", () => {
  it("should get 400 when invalid id", async () => {
    personId = 1234;
    await request
      .get(routes.person.getById(personId))

      .expect(400)
      .then((res) => {
        expect(res.body.message).toBe("Invalid ID");
      });
  });
});
describe("Hacker scope: scenario #3", () => {
  it("should get 400 when create with type of age is incorrect", async () => {
    personId = 1234;
    await request
      .post(routes.person.create)
      .set("Accept", "application/json")
      .send(TEST_PERSON_DATA_wrong)

      .expect(400)
      .then((res) => {
        expect(res.body.message).toBe("The request body does not contain required fields or some fields is incorrect");
      });
  });
});
