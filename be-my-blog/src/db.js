import { MongoClient } from "mongodb";

let db;

async function connectToDB() {
    const client = new MongoClient("mongodb://127.0.0.1:27017");
    const dbName = 'react-blog-db';
    await client.connect();
    db = client.db(dbName);
}

export {
    db,
    connectToDB
}