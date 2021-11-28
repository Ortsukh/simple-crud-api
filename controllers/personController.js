const Person = require("../models/personModel");
const { validationTypeAtr, isUUID } = require("../validation/validation");

const { getPostData } = require("../utils");

async function getAllPerson(req, res) {
  try {
    const people = await Person.findAll();

    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(people));
  } catch (error) {
    res.writeHead(500, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: error }));
  }
}

async function getPerson(req, res, id) {
  try {
    const person = await Person.findById(id);
    if (!isUUID(id)) {
      res.writeHead(400, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "Invalid ID" }));
    } else if (!person) {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "Person Not Found" }));
    } else {
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(person));
    }
  } catch (error) {
    res.writeHead(500, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: error }));
  }
}

async function createPerson(req, res) {
  try {
    const body = await getPostData(req);
    const { name, description, age, hobbies } = JSON.parse(body);
    if (!name || !description || !age || !hobbies) {
      res.writeHead(400, { "Content-Type": "application/json" });
      return res.end(JSON.stringify({ message: "The request body does not contain required fields or some fields is incorrect" }));
    }
    if (!validationTypeAtr(body)) {
      res.writeHead(400, { "Content-Type": "application/json" });
      return res.end(JSON.stringify({ message: "The request body does not contain required fields or some fields is incorrect" }));
    }
    const person = {
      name,
      description,
      age,
      hobbies,
    };

    const newPerson = await Person.create(person);

    res.writeHead(201, { "Content-Type": "application/json" });
    return res.end(JSON.stringify(newPerson));
  } catch (error) {
    res.writeHead(500, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: error }));
  }
}

async function updatePerson(req, res, id) {
  try {
    const person = await Person.findById(id);
    if (!isUUID(id)) {
      res.writeHead(400, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "Invalid ID" }));
    } else if (!person) {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "Person Not Found" }));
    } else {
      const body = await getPostData(req);

      const { name, description, age, hobbies } = JSON.parse(body);

      const personData = {
        name: name || person.name,
        description: description || person.description,
        age: age || person.age,
        hobbies: hobbies || person.hobbies,
      };

      const updPerson = await Person.update(id, personData);

      res.writeHead(200, { "Content-Type": "application/json" });
      return res.end(JSON.stringify(updPerson));
    }
  } catch (error) {
    res.writeHead(500, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: error }));
  }
}

async function deletePerson(req, res, id) {
  try {
    const person = await Person.findById(id);

    if (!isUUID(id)) {
      res.writeHead(400, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "Invalid ID" }));
    } else if (!person) {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "Person Not Found" }));
    } else {
      await Person.remove(id);
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: `Person ${id} removed` }));
    }
  } catch (error) {
    res.writeHead(500, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: error }));
  }
}

module.exports = {
  getAllPerson,
  getPerson,
  createPerson,
  updatePerson,
  deletePerson,
};
