/**
 * @author Maryam
 */
const express = require('express');
const router = express.Router();
const User = require('./../models/user');
const jwt = require('jsonwebtoken');
const secret = 'harrypotter';

/**
 * @description Middleware taks string with special meaning and returns fail or success message to login and register page
 * @param {String} msg
 * @param {String} msgok
 * @returns {String} msg
 * @returns {String} msgok
 */
router.use((req, res, next) => {
  switch (req.query.msg) {
    case 'fail':
      res.locals.msg = 'Username or Password is not matched!';
      break;
    case 'failemail':
      res.locals.msg = 'this email is already exist!!!';
      break;
    case 'failauthenticate':
      res.locals.msg = 'could not authenticate user';
      break;
    case 'failauthenticatetoken':
      res.locals.msg = "no token provided can't access to this page";
      break;
  
    default:
      res.locals.msg = '';
      break;
  }

  switch (req.query.msgok) {
    case 'welcome':
      res.locals.msgok = 'your account made successfuly';
      break;
  
    default:
      res.locals.msgok = '';
      break;
  }
  next();
});

/**
 * @description Add new user to DB if not added before if new user registered pass to login page
 * @param {String} email
 * @param {String} username
 * @param {String} password
 * @returns {String} msg
 * @returns {String} username
 */
router.post('/newUser', (req, res) => {
  User.count({ email: req.body.email }, function(err, c) {
    if (c === 0) {
      User.count({ username: req.body.username }, function(err, c) {
        if (c === 0) {
          if (
            req.body.username.trim() == '' ||
            req.body.password == '' ||
            req.body.email == '' ||
            req.body.username == null ||
            req.body.password == null ||
            req.body.email == null
          )
            res.redirect('/users/register?msg=fail');
          else {
            let myUser = new User();
            myUser.username = req.body.username;
            myUser.email = req.body.email;
            myUser.password = req.body.password;
            User.create(myUser)
              .then(function(dbUser) {
                res.cookie('username', dbUser.username);
                res.redirect('/users/login?msg=welcome');
              })
              .catch(function(err) {
                res.redirect('/users/register?msg=fail'); 
              });
          }
        } else res.redirect('/users/register?msg=failemail');
      }).catch(function(err) {
        res.redirect('/users/register?msg=fail'); 
      });
    } else res.redirect('/users/register?msg=failemail'); 
  });
});

/**
 * @description render login.hbs page with get method 
 * @description uses this /login inside of this class to prevent mess in index.js class and usin msg middleware
 */
router.get('/login', (req, res, next) => {
  res.render('login');
});

/**
 * @description render register.hbs page with get method
 */
router.get('/register', (req, res, next) => {
  res.render('register');
});

/**
 * @description check user to connect to DB if email or password doesn't exist givs error othervise shows inventory of user
 * @description in this project we have only one inventory to show to all users after login
 * @param {String} email
 * @param {String} username
 * @returns {String} auth
 * @returns {String} reviewer
 * @returns inventory.hbs page
 */
let validPassword;
router.post('/loginUser', (req, res) => {
  User.findOne({ email: req.body.emaillogin })
    .select('username password email')
    .exec(function(err, user) {
      if (err) res.redirect('/users/login?msg=failauthenticate');
      if (!user) res.redirect('/users/login?msg=failauthenticate');
      else {
        const selectedUser = new User(user);

        if (req.body.passwordlogin)
          validPassword = selectedUser.comparePasword(req.body.passwordlogin);
        else res.redirect('/users/login?msg=fail');
        if (!validPassword) res.redirect('/users/login?msg=failauthenticate');
        else {
          let token = jwt.sign(
            { username: User.username, email: User.email },
            secret,
            { expiresIn: '24h' }
          );
          res.cookie('auth', token);
          res.cookie('reviewer', selectedUser.username);
          res.redirect(`/inventories/${selectedUser.username}`);
        }
      }
    });
});

/**
 * @description Middleware to check auth(token) after router redirect if client didn't login doesn't let him to see inventory and edit inventory pages
 * @property {String} auth
 */
router.use((req, res, next) => {
  let token =
    req.headers.authorization ||
    req.cookies.auth ||
    req.body.token ||
    req.body.query ||
    req.headers['x-access-token'];
  if (token) {
    jwt.verify(token, secret, function(err, decoded) {
      if (err) res.redirect('/users/login?msg=failauthenticatetoken');
      else {
        req.decoded = decoded;
        next();
      }
    });
  } else {
    res.redirect('/users/login?msg=failauthenticatetoken');
  }
});

module.exports = router;
