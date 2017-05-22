const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongodb = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;
const exphbs  = require('express-handlebars');

const MONGO_URL = 'mongodb://localhost:27017/ecard-db';

const app = express();
const jsonParser = bodyParser.json();

app.use(express.static('public'));

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

let db = null;
mongodb.connect(MONGO_URL, async function(err, database) {
  if (err) {
    throw err;
  }

  db = database;

  await app.listen(3000);
  console.log('Listening on port 3000');
});

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
  console.log(`cardId: ${cardId}`);
  const collection = db.collection('card');
  const response = await collection.findOne({ _id: ObjectID(cardId) });
  console.log(response);
  console.log(response.style);
  console.log(response.message);

  res.render('card', { message: response.message, style: response.style } );
}
app.get('/id/:cardId', onGetCard);
