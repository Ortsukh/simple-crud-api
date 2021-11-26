const Person = require('../models/personModel')

const { getPostData } = require('../utils')

// @desc    Gets All people
// @route   GET /api/people
async function getAllPerson(req, res) {
    try {
        const people = await Person.findAll()

        res.writeHead(200, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify(people))
    } catch (error) {
        console.log(error)
    }
}

// @desc    Gets Single person
// @route   GET /api/person/:id
async function getPerson(req, res, id) {
    try {
        const person = await Person.findById(id)

        if(!person) {
            res.writeHead(404, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify({ message: 'Person Not Found' }))
        } else {
            res.writeHead(200, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify(person))
        }
    } catch (error) {
        console.log(error)
    }
}

// @desc    Create a person
// @route   POST /api/people
async function createPerson(req, res) {
    try {
        const body = await getPostData(req)
        console.log(body);
        const { name, description, age, hobbies } = JSON.parse(body)

        const person = {
            name,
            description,
            age,
            hobbies
        }

        const newPerson = await Person.create(person)

        res.writeHead(201, { 'Content-Type': 'application/json' })
        return res.end(JSON.stringify(newPerson))  

    } catch (error) {
        console.log(error)
    }
}

// @desc    Update a person
// @route   PUT /api/people/:id
async function updatePerson(req, res, id) {
    try {
        const person = await Person.findById(id)

        if(!person) {
            res.writeHead(404, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify({ message: 'Person Not Found' }))
        } else {
            const body = await getPostData(req)

            const { name, description, age, hobbies } = JSON.parse(body)

            const personData = {
                name: name || person.name,
                description: description || person.description,
                age: age || person.age,
                hobbies : hobbies || person.hobbies
            }

            const updPerson = await Person.update(id, personData)

            res.writeHead(200, { 'Content-Type': 'application/json' })
            return res.end(JSON.stringify(updPerson)) 
        }
 

    } catch (error) {
        console.log(error)
    }
}

// @desc    Delete Person
// @route   DELETE /api/Person/:id
async function deletePerson(req, res, id) {
    try {
        const person = await Person.findById(id)

        if(!person) {
            res.writeHead(404, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify({ message: 'Person Not Found' }))
        } else {
            await Person.remove(id)
            res.writeHead(200, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify({ message: `Person ${id} removed` }))
        }
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    getAllPerson,
    getPerson,
    createPerson,
    updatePerson,
    deletePerson
}