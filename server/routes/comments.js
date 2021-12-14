var express = require('express');
var router = express.Router();
const Comments = require("../models/Comments");
const validateToken = require("../auth/validateToken.js");


/* GET all the comments. */
router.get('/', function(req, res, next) {
   // Comments.collection.drop();

    Comments.find({}, (err,comments) => {
        if(err) return next(err);
        if(!comments) {
            return res.send("ei kommentteja");
        } else {
            return res.json(comments);
        }
    })
});

/* POST new comment to the database. */
router.post('/', validateToken, function(req, res, next) {
    console.log(req.body);
    console.log("lisätään kommentti");
    const newComment = Comments.create({
        comment: req.body.comment,
        user: req.user.id,
        code: req.body.code,
        like: 0,
        dislike: 0
        },
    (err,ok) => {
        if(err) throw err;
        res.json(newComment);

    });
        
    
});

router.post('/addLike', validateToken, function(req, res, next) {
    Comments.findOne({_id: req.body.id}, (err,comment) => {
        if(err) throw err;
        if(comment) {
            if(!comment.users_voted.includes(req.user.id)) {
                comment.users_voted.push(req.user.id);
                comment.like=comment.like+1;
                comment.save();
                console.log("1 like added")
            }
        }
    })
});

router.post('/disLike', validateToken, function(req, res, next) {
    Comments.findOne({_id: req.body.id}, (err,comment) => {
        if(err) throw err;
        if(comment) {
            if(!comment.users_voted.includes(req.user.id)) {
                comment.users_voted.push(req.user.id);
                comment.dislike=comment.dislike+1;
                comment.save();
                console.log("1 dislike added")
            }
        }
    })
});


module.exports = router;