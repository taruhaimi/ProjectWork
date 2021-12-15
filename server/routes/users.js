var express = require('express');
var router = express.Router();
const multer = require("multer")
const storage = multer.memoryStorage();
const upload = multer({storage})
const mongoose = require("mongoose");
const Users = require("../models/Users");
const bcrypt = require("bcryptjs");
const {body, validationResult} = require('express-validator');
const jwt = require("jsonwebtoken");




/* GET all the users from the database */
router.get('/', function(req, res, next) {
  //Users.collection.drop();

  Users.find({}, (err,users) => {
    if(err) return next(err);
    res.send(users)
  })
});

/* POST new user to the database */
router.post('/register', 
  upload.none(),
  // User cannot register without good enough password. */
  body("password").isStrongPassword({
    minLength: 8,
    minLowercase: 1,
    minUppercase: 1,
    minNumbers: 1,
    minSymbols: 1
  }).withMessage("Password is not strong enough"),
  function(req, res, next) {
    console.log(req.body);
    const errors = validationResult(req);
    console.log({errors: errors.array()});
    if(!errors.isEmpty()) {
      console.log(errors.errors[0].msg)
      return res.status(400).json(errors);
    }

    // User can only be added if it doesn't already exist in the database
    Users.findOne({email: req.body.email}, (err,user) => {
      if(err) throw err;
      if(user){
        const errtext = {errors:[{msg: "Email already in use"}]};
        console.log(errtext);
        return res.status(403).json(errtext);
      } else {
        console.log("rekisteröidytään");
        // password is encrypted
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(req.body.password, salt, (err, hash) => {
            if(err) throw err;
            Users.create({
              email: req.body.email,
              username: req.body.username,
              password: hash
            },
            (err,ok) => {
              if(err) throw err;
              return res.redirect("/users/login");
            }
            );
          });
        });
      }
    });
});

/* POST makes user authorised to have extra features at the web application */
router.post('/login',
  upload.none(),
  (req, res, next) => {
    Users.findOne({email: req.body.email}, (err, user) => {
      if(err) throw err;
      if(!user) {
        return res.status(403).json({message: "Invalid credentials"});
      } else {
        bcrypt.compare(req.body.password, user.password, (err, isMatch) => {
          if(err) throw err;
          if(isMatch) {
            const jwtPayload = {
              id: user._id,
              email: user.email
            }
            jwt.sign(
              jwtPayload,
              process.env.SECRET,
              {
                expiresIn: 120
              },
              (err, token) => {
                res.json({success: true, token}); // returns token for authorization
              }
            );
          } else {
            return res.status(403).json({message: "Invalid credentials"});
          }
        })
      }
    })
});

module.exports = router;
