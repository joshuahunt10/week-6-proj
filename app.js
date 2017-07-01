const express = require('express');
const app = express();
const mustache = require("mustache-express");
const models = require("./models")
const bodyparser = require("body-parser");
const faker = require("faker")
const session = require('express-session');


app.engine('mustache', mustache());
app.set('view engine', 'mustache');
app.use(express.static('public'));
app.use(bodyparser.urlencoded({extended: false}))

app.listen(3000, function(){
  console.log('I created Facebook in a week');
})

app.use(session({
  secret: 'puppers',
  resave: false,
  saveUninitialized: true
}));

// var user = models.Username.build({
//   username: 'josh',
//   password: '123'
// })
// user.save();

app.post('/authenticate', function(req, res){
  let user = false;
  username = req.body.username;
  password = req.body.password;
  let userQuery = models.Username.findOne({
    where:{
      username: username
    }
  }).then(function(userQuery){
      if(username === userQuery.username){
        if(password === userQuery.password){
          console.log('login success');
          user = userQuery.username;
        }
      }
      if(user){
        req.session.user = userQuery.username;
        console.log('logging the session', req.session.user);
        res.redirect("/")
      }else{
        res.render('loginerror');
      }
  })

})


app.get('/', function(req, res){
  res.render('index', {
    title: 'Home Page!!',
    user: req.session.user
  });
})

app.get('/login', function(req, res){
  res.render('login');
})

app.get('/newPost', function(req,res){
  res.render('newPost')
})
