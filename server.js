const http = require('http');
const dotenv = require('dotenv');
const path = require('path');
const { getAllPerson, getPerson, createPerson, updatePerson, deletePerson } = require('./controllers/PersonController')
dotenv.config({
    path: path.join(__dirname, './.env')
  });
const server = http.createServer((req, res) => {
    if(req.url === '\/person' && req.method === 'GET') {
        getAllPerson(req, res)
    } else if(req.url.match(/\/person\/\w+/) && req.method === 'GET') {
        const id = req.url.split('/')[2]
        getPerson(req, res, id)
    } else if(req.url === '/person' && req.method === 'POST') {
        createPerson(req, res)
    } else if(req.url.match(/\/person\/\w+/) && req.method === 'PUT') {
        const id = req.url.split('/')[2]
        updatePerson(req, res, id)
    } else if(req.url.match(/\/person\/\w+/) && req.method === 'DELETE') {
        const id = req.url.split('/')[2]
        deletePerson(req, res, id)
    } else {
        res.writeHead(404, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({ message: 'Route Not Found' }))
    }
})
const PORT =  process.env.PORT || 5000

server.listen(PORT, () => console.log(`Server running on port ${PORT}`))

module.exports = server;
