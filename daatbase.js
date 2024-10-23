const { MongoClient } = require("mongodb");
require('dotenv').config()

const uri = process.env.DB_STRING;
// console.log(uri)
const client = new MongoClient(uri);

async function info(){
    const database = client.db("drawings_bot")
    const collection = database.collection("users")
    return await collection.count()
}

async function getUsers() {
    const database = client.db("drawings_bot")
    const collection = database.collection("users")

    let cur = await collection.find({}, {})
    let res = await cur.toArray()
    return res
}

module.exports = {
    info,
    getUsers,
}
