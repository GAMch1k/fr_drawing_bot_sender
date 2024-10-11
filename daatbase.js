const { MongoClient } = require("mongodb");
require('dotenv').config()

const uri = process.env.DB_STRING;
// console.log(uri)
const client = new MongoClient(uri);

async function run() {
    try {
        const database = client.db('sample_mflix');
        const movies = database.collection('movies');

        const query = { title: 'Back to the Future' };
        const movie = await movies.findOne(query);

        console.log(movie);
    } finally {
        await client.close();
    }
}
// run().catch(console.dir);

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
