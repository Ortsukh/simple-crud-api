let people = require('../data/people')
const { v4: uuidv4 } = require('uuid')

const { writeDataToFile } = require('../utils')

function findAll() {
    console.log(people);
    return new Promise((resolve, reject) => {
        resolve(people)
    })
}

function findById(id) {
    return new Promise((resolve, reject) => {
        const person = people.find((p) => p.id === id)
        resolve(person)
    })
}

function create(person) {
    return new Promise((resolve, reject) => {
        const newPerson = {id: uuidv4(), ...person}
        writeDataToFile(newPerson);
        resolve(newPerson)
    })
}

function update(id, person) {
    return new Promise((resolve, reject) => {
        const index = people.findIndex((p) => p.id === id)
        people[index] = {id, ...person}
        writeDataToFile(people);
        resolve(people[index])
    })
}

function remove(id) {
    return new Promise((resolve, reject) => {
        people = people.filter((p) => p.id !== id)
        if (process.env.NODE_ENV !== 'test') {
            writeDataToFile('./data/people.json', people);
        }
        resolve()
    })
}

module.exports = {
    findAll,
    findById,
    create,
    update,
    remove
}