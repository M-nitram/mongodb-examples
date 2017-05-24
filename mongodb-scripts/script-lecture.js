//
// This is a script that shows basic operations on a MongoDB database.
// This is a command-line script; it does *not* launch a server and does
// not run on localhost.
//
const MongoClient = require('mongodb').MongoClient;

const DATABASE_NAME = 'eng-dict';
const MONGO_URL = `mongodb://localhost:27017/${DATABASE_NAME}`;

let db = null;
async function main() {
  db = await MongoClient.connect(MONGO_URL);
}
main();

// Callback verison of the above code:
// MongoClient.connect(MONGO_URL, function (err, database) {
//   db = database;
//   insertWord('hello', 'a greeting');
//   printDefinition('hello');
// });

////////////////////////////////////////////////////////////////////////////////

// Database helper functions

function insertWord(word, definition) {
  const doc = {
    word: word,
    definition: definition
  };
  // Callback version of insertOne.
  collection.insertOne(doc, function (err, result) {
    console.log(`Document id: ${result.insertedId}`);
  });
}

async function insertWordAsync(word, definition) {
  const doc = {
    word: word,
    definition: definition
  };
  // Promise version of insertOne.
  const result = await collection.insertOne(doc);
  console.log(`Document id: ${result.insertedId}`);
}

async function printWord(word) {
  const queryDoc = {
    word: word
  };
  const response = await collection.findOne(queryDoc);
  console.log(`Word: ${response.word}, definition: ${response.definition}`);
}

async function updateWord(word, definition) {
  const query = {
    word: word
  };
  const newEntry = {
    word: word,
    definition: definition
  };
  const response = await collection.update(query, newEntry);
}

// Update word, and insert it if it doesn't exist.
async function upsertWord(word, definition) {
  const query = {
    word: word
  };
  const newEntry = {
    word: word,
    definition: definition
  };
  // See: https://docs.mongodb.com/manual/reference/method/db.collection.update/
  const params = {
    upsert: true
  }
  const response = await collection.update(query, newEntry, params);
}

async function deleteWord(word) {
  const query = {
    word: word
  };
  const response = await collection.deleteOne(query);
  console.log(`Number deleted: ${response.deletedCount}`);
}

async function deleteAllWords() {
  const response = await collection.deleteMany();
  console.log(`Number deleted: ${response.deletedCount}`);
}

async function printAllWords() {
  const results = await collection.find().toArray();
  for (const result of results) {
    console.log(`Word: ${result.word}, definition: ${result.definition}`);
  }
}
