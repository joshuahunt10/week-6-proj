const express = require('express');
const app = express();
const mustache = require("mustache-express");
const models = require("./models")
const bodyparser = require("body-parser");
const faker = require("faker")


app.engine('mustache', mustache());
app.set('view engine', 'mustache');
app.use(express.static('public'));
app.use(bodyparser.urlencoded({extended: false}))

app.listen(3000, function(){
  console.log('I created Facebook in a week');
})

app.get('/', function(req, res){
  res.render('index', {
    title: 'Home Page!!'
  });
})
