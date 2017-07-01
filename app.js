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
  models.Post.findAll({
    order:[
      ['createdAt', 'DESC']
    ]
  }).then(function(posts){
      res.render('index', {
        title: 'Home Page!!',
        user: req.session.user,
        posts: posts
    })
  })
})

app.get('/login', function(req, res){
  res.render('login', {
    user: req.session.user
  });
})

app.use(function( req, res, next){
  if(req.session.user){
    next()
  }else{
    res.redirect('/login')
  }
});

app.get('/newPost', function(req,res){
  res.render('newPost', {
    user: req.session.user
  })
})

app.post('/publishPost', function(req, res){
  models.Username.findOne({
    where:{
      username: req.session.user
    }
  }).then(function(userQuery){
    var newPost = models.Post.build({
      title: req.body.entryTitle,
      body: req.body.entry,
      user: userQuery.id
    })
    newPost.save().then(function(){
      res.redirect('/');
    })
  })
})

app.post('/deletePost', function(req, res){
  delButt = req.body.delButt;
  console.log('value of delButt is', delButt);
  // models.Post.destroy({
  //   where:{
  //     id: req.body.delButt
  //   }
  // })
  res.redirect('/');
})
