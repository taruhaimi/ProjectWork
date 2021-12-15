var express = require('express');
var router = express.Router();
const Codes = require("../models/Codes");
const validateToken = require("../auth/validateToken.js");


/* GET all the codes from databse */
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
        res.json({success: true});

    });
        
    
});

/* POST add one like for a specific code and ensure that user has not voted yet (either like or dislike) */
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

/* POST add one dislike for a specific code and ensure that user has not voted yet (either like or dislike) */
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

/* POST edit a specific code */
router.post('/editCode', validateToken, function(req,res,next) {
    Codes.findOne({_id: req.body.id}, (err,code) => {
        if(err) throw err;
        if(code) {
            code.code=req.body.code;
            code.save();
            console.log("Code edited: "+req.body.code);
        }
    })
})

module.exports = router;
