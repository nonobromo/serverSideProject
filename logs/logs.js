const fs = require("node:fs");
const path = require("node:path")

const filepath = path.resolve(__dirname, "./logfiles");
const newFileDate = new Date().toString().slice(0, 16)

function createNewLogFile(error){
    const logFilePath = path.resolve(filepath, `${newFileDate}.log`)

    const ws = fs.createWriteStream(logFilePath, {flags: "a"})

    ws.write(`${new Date().toISOString()} ${error}\n`)

    ws.end(() =>{
        console.log(`new log at ${logFilePath}`)
    })
}   

module.exports = {createNewLogFile}