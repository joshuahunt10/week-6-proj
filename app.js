const express = require('express');
const app = express();
const mustache = require("mustache-express");
const models = require("./models")
const bodyparser = require("body-parser");
const faker = require("faker")
const session = require('express-session');
const expressValidator = require('express-validator')


app.engine('mustache', mustache());
app.set('view engine', 'mustache');
app.use(express.static('public'));
app.use(bodyparser.urlencoded({extended: false}))
app.use(expressValidator());

app.listen(3000, function(){
  console.log('I created Facebook in a week');
})

app.use(session({
  secret: 'puppers',
  resave: false,
  saveUninitialized: false
}));

app.get('/signUp', function(req,res){
  res.render('signup', {
    title: "Sign Up!"
  })
})

app.post('/signUp', function(req, res){
  res.render('signup', {
    title: "Sign Up!"
  })
})

app.post('/registerToDB', function(req, res){
    let username = req.body.username;
    let password = req.body.password;
    let passwordConf = req.body.passwordTwo;

    req.checkBody('password', 'Your passswords must match').equals(passwordConf);
    req.checkBody('username', 'You must provide a username').notEmpty();
    req.checkBody('username', 'Your username must be at least 3 characters').len(3, 10);
    req.checkBody('username', 'Your username may only contain letters').isAlpha();

    var errors = req.validationErrors();

    if(errors){
      res.render('signup', {
        errors: errors,
        username: username,
        title: "Oops try again!"
      })
    }
    const signup = models.Username.build({
      username: username,
      password: password
    })
    signup.save().then(function(){
      return res.redirect('/login');
    })

})

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
      req.session.userID = userQuery.id;
      console.log('logging the session', req.session.user);
      console.log('logging the session userID', req.session.userID);
      res.redirect("/")
    }else{
      res.render('loginerror', {
        title: "Login Error!"
      });
    }
  })
})

app.get('/', function(req, res){
  models.Post.findAll({
    order:[
      ['createdAt', 'DESC']
    ],
  include: [
    {
      model: models.Username,
      as: 'username'
    }
  ]
}).then(function(posts){
  console.log('user id', req.session.userID);
    res.render('index', {
      title: 'Home Page!!',
      user: req.session.user,
      posts: posts,
      userID: req.session.userID
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

app.get('/logout', function(req, res){
  req.session.destroy();
  res.render('logout', {
    title: 'Come on Back!'
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
      userID: userQuery.id
    })
    newPost.save()
    .then(function(){
      res.redirect('/');
    })
    .catch(function(bigError){
      res.render('newPost', {
        post: newPost,
        error: bigError.errors,
        user: req.session.user,
        userID: req.session.userID,
        title: "Uh-Oh"
      })
    })
  })
})

app.post('/:id/deletePost', function(req, res){
  id = req.body.delButt;
  models.Post.destroy({
    where:{
      id: id
    }
  })
  res.redirect('/');
})

app.get('/:id/profilepage', function(req, res){
  id = parseInt(req.body.id);
  models.Post.findAll({
    where:{
      userID: req.session.userID
    },
    order:[
      ['createdAt', 'DESC']
    ],
    include: [
      {
        model: models.Username,
        as: 'username'
      }
    ]
  }).then(function(posts){
    console.log('posts from the profile page', posts[0].username.username);
    models.Username.findOne({
      where:{
        username: req.session.user
      }
    }).then(function(username){
      res.render('profilePage', {
        title: 'Profile Page',
        user: req.session.user,
        posts: posts,
        username: username
      })
    })
  })
})

// TODO: This is a work in progress

app.post('/:id/likePost', function(req, res){
  let userID = req.session.userID;
  let postID = req.params.id;

  let like = models.Like.build({
    userID: userID,
    postID: postID
  })
  like.save().then(function(){
    res.render('postLike')
  })
})

//// FIXME: ensure the likes table is linked together correctly.  The like is working but now we work on displaying the names of those who liked it.

app.get('/:postID/postLikes', function(req, res){
  let postID = req.params.postID;
  models.Like.findAll({
    where:{
      postID: postID
    }
  }).then(function(likes){
    console.log('logging the likes return', likes);
    res.render('postLike', {
      user: likes
    })
  })
})
