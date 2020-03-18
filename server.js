const express = require('express');
var bodyParser = require('body-parser')
const mongoose = require("mongoose");
const path = require("path");
const axios = require("axios");
const app = express();
// const port = 3001;
const PORT = process.env.PORT || 3001;
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
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "X-Requested-With, Access-Control-Allow-Headers, Content-Type, Authorization, Origin, Accept");
  res.setHeader('Access-Control-Allow-Credentials', true)
  // res.append('Access-Control-Allow-Origin', '*');
  // res.append('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  // res.append('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.use(routes);

app.get('/', (req, res) => res.send(`If you see this, then things are working!!! Good job!`));

app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`));