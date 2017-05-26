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
  // insertWord('hello', 'a greeting');
  await insertWordAsync('hello', 'a greeting');
  console.log('insert finished?');


  db.close();
}
main();


// Callback verison of the above code:
// MongoClient.connect(MONGO_URL, function (err, database) {
//   db = database;
// });

////////////////////////////////////////////////////////////////////////////////

// Database helper functions

function insertWord(word, definition) {
  const doc = {
    word: word,
    definition: definition
  };
  const collection = db.collection('words');
  collection.insertOne(doc, function(err, response) {
    console.log('Inserted');
  });
}

async function insertWordAsync(word, definition) {
  const doc = {
    word: word,
    definition: definition
  };
  const collection = db.collection('words');
  const response = await collection.insertOne(doc);
  console.log('Inserted');
}

async function printWord(word) {
  const queryDoc = {
    word: word
  };
}

async function updateWord(word, definition) {
  const query = {
    word: word
  };
  const newEntry = {
    word: word,
    definition: definition
  };
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
}

async function deleteWord(word) {
  const query = {
    word: word
  };
}

async function deleteAllWords() {
}

async function printAllWords() {
}
