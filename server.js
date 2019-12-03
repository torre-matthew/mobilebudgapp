const express = require('express');
var bodyParser = require('body-parser')
const mongoose = require("mongoose");
const path = require("path");
const axios = require("axios");
const app = express();
const port = 3001;
const routes = require("./routes");

let databaseUri = "mongodb://localhost/budgetAppDB"; 

if (process.env.MONGODB_URI) {
  mongoose.connect(process.env.MONGODB_URI);
}
else {
  mongoose.connect(databaseUri);
}

// Connect to the Mongo DB
let db = mongoose.connection;

db.on('error', function(err) {
  console.log('Mongoose Error: ', err);
});

db.once('open', function() {
  console.log("Mongoose Connection Successful!!!");
});


app.use(bodyParser.json());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

app.use(routes);

app.get('/', (req, res) => res.send(`Is this what the fuck I'm talking about???`));

app.listen(port, () => console.log(`Example app listening on port ${port}!`));