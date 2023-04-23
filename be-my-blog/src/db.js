import { MongoClient } from "mongodb";

let db;

async function connectToDB() {
  const client = new MongoClient(
    `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@cluster0.11bqzwb.mongodb.net/?retryWrites=true&w=majority`
  );
  const dbName = "react-blog-db";
  await client.connect();
  db = client.db(dbName);
}

export { db, connectToDB };
