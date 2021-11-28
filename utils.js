const people = require('./data/people')

function writeDataToFile(content) {
      people.push(content);
 }

function getPostData(req) {
    return new Promise((resolve, reject) => {
        try {
            let body = ''

            req.on('data', (chunk) => {
                body += chunk.toString()
            })

            req.on('end', () => {
                resolve(body)
            })
        } catch (error) {
            reject(err)
        }
    })
}

module.exports = {
    writeDataToFile,
    getPostData
}