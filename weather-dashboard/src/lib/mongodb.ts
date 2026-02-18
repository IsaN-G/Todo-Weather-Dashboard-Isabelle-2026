import { MongoClient } from "mongodb";

if (!process.env.MONGODB_URI) {
  throw new Error('Bitte definiere die MONGODB_URI in deiner .env.local Datei');
}

const uri = process.env.MONGODB_URI;
const options = {};

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

// Wir definieren hier genau, was im globalen Objekt gespeichert werden darf
declare global {
  
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

if (process.env.NODE_ENV === "development") {
  // Im Entwicklungsmodus nutzen wir die globale Variable
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  // Im Produktionsmodus erstellen wir jedes Mal einen neuen Client
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

export default clientPromise;