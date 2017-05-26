const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongodb = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;
const exphbs  = require('express-handlebars');

const MONGO_URL = 'mongodb://localhost:27017/ecard-db';

const app = express();
const jsonParser = bodyParser.json();

const hbs = exphbs.create();
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.static('public'));

let db = null;
mongodb.connect(MONGO_URL, async function(err, database) {
  if (err) {
    throw err;
  }

  db = database;

  await app.listen(3000);
  console.log('Listening on port 3000');
});

function onGetMain(req, res) {
  res.render('index');
}
app.get('/', onGetMain);

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

  res.render('card', { message: response.message, style: response.style } );
}
app.get('/id/:cardId', onGetCard);
