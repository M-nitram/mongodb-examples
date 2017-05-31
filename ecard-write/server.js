const express = require('express');
const MongoClient = require('mongodb').MongoClient;

const app = express();

app.use(express.static('public'));

const DATABASE_NAME = 'ecard-db';
const MONGO_URL = `mongodb://localhost:27017/${DATABASE_NAME}`;

let db = null;
MongoClient.connect(MONGO_URL, async function(err, database) {
  if (err) { throw err; }
  db = database;
  await app.listen(3000);
  console.log('Listening on port 3000');
});

async function onSaveCard(req, res) {
  const style = req.body.style;
  const message = req.body.message;

  const cardId = ''; // something
  res.json({ cardId: cardId });
}
app.post('/save', jsonParser, onSaveCard);
