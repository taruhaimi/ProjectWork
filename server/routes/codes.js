var express = require('express');
var router = express.Router();
const Codes = require("../models/Codes");
const validateToken = require("../auth/validateToken.js");


/* GET all the codes. */
router.get('/', function(req, res, next) {
    //  Codes.collection.drop();

    Codes.find({}, (err,code) => {
        if(err) return next(err);
        if(!code) {
            return res.send("ei koodeja");
        } else {
            return res.json(code);
        }
    })
});

/* POST new code snippet to the database */
router.post('/', validateToken, function(req, res, next) {
    console.log(req.body);
    console.log("lisätään koodi");
    Codes.create({
        code: req.body.code,
        user: req.user.id,
        like: 0,
        dislike: 0,
        code_clicked: false,
        users_voted: []
        },
    (err,ok) => {
        if(err) throw err;
        /*
        Users.findOne({_id: req.user.id}, (err,user) => {
            console.log(req.user.id);
            if(err) throw err;
            if(!user) {
                console.log("user not found");
                res.json("User not found");
            } else {
                user.codes.push(req.body.code);
                user.save();
                console.log("koodi lisätty käyttäjälle");
                console.log(user);
            }
        })*/
        res.json({success: true});

    });
        
    
});

router.post('/addLike', validateToken, function(req, res, next) {
    Codes.findOne({_id: req.body.id}, (err,code) => {
        if(err) throw err;
        if(code) {
            if(!code.users_voted.includes(req.user.id)) {
                code.users_voted.push(req.user.id);
                code.like=code.like+1;
                code.save();
                console.log("1 like added")
            }
        }
    })
});

router.post('/disLike', validateToken, function(req, res, next) {
    Codes.findOne({_id: req.body.id}, (err,code) => {
        if(err) throw err;
        if(code) {
            if(!code.users_voted.includes(req.user.id)) {
                code.users_voted.push(req.user.id);
                code.dislike=code.dislike+1;
                code.save();
                console.log("1 dislike added")
            }
        }
    })
});


module.exports = router;
