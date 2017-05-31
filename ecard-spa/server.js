const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongodb = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;

const MONGO_URL = 'mongodb://localhost:27017/ecard-db';

const app = express();
const jsonParser = bodyParser.json();

app.use(express.static('public'));

let db = null;
async function startDbAndServer() {
  db = await mongodb.connect(MONGO_URL);
  await app.listen(3000);
  console.log('Listening on port 3000');
};

startDbAndServer();

////////////////////////////////////////////////////////////////////////////////

async function onSaveCard(req, res) {
  const style = req.body.style;
  const message = req.body.message;

  const doc = {
    style: style,
    message: message
  };
  const collection = db.collection('card');
  const response = await collection.insertOne(doc);

  res.json({ cardId: response.insertedId });
}
app.post('/save', jsonParser, onSaveCard);

async function onGetCard(req, res) {
  const cardId = req.params.cardId;
  const collection = db.collection('card');
  const response = await collection.findOne({ _id: ObjectID(cardId) });
  res.json(response);
}
app.get('/get/:cardId', onGetCard);

async function onGetCardView(req, res) {
  res.sendFile(path.resolve(__dirname, 'public', 'index.html'));
}
app.get('*', onGetCardView);
