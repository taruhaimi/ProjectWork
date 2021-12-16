var express = require('express');
var router = express.Router();
const Comments = require("../models/Comments");
const validateToken = require("../auth/validateToken.js");


/* GET all the comments from the database */
router.get('/', function(req, res, next) {
    //Comments.collection.drop();

    Comments.find({}, (err,comments) => {
        if(err) return next(err);
        if(!comments) {
            return res.send("No comments");
        } else {
            return res.json(comments);
        }
    })
});

/* POST a new comment to the database */
router.post('/', validateToken, function(req, res, next) {
    console.log(req.body);
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
        console.log("Comment added");
    });
});

/* POST add one like for a specific comment and ensure that user has not voted yet (either like or dislike) */
router.post('/addLike', validateToken, function(req, res, next) {
    Comments.findOne({_id: req.body.id}, (err,comment) => {
        if(err) throw err;
        if(comment) {
            if(!comment.users_voted.includes(req.user.id)) {
                comment.users_voted.push(req.user.id);
                comment.like=comment.like+1;
                comment.save();
                console.log("1 like added")
                res.status(200).json({success: true});
            } else {
                res.status(400).json({error: "You have already voted"});
            }
        } else {
            res.status(400).json({error: "Can't vote"});
        }
    })
});

/* POST add one dislikelike for a specific comment and ensure that user has not voted yet (either like or dislike) */
router.post('/disLike', validateToken, function(req, res, next) {
    Comments.findOne({_id: req.body.id}, (err,comment) => {
        if(err) throw err;
        if(comment) {
            if(!comment.users_voted.includes(req.user.id)) {
                comment.users_voted.push(req.user.id);
                comment.dislike=comment.dislike+1;
                comment.save();
                console.log("1 dislike added")
                res.status(200).json({success: true});
            } else {
                res.status(400).json({error: "You have already voted"});
            }
        } else {
            res.status(400).json({error: "Can't vote"});
        }
    })
});

/* POST edit a specific comment */
router.post('/editComment', validateToken, function(req,res,next) {
    Comments.findOne({_id: req.body.id}, (err,comment) => {
        if(err) throw err;
        if(comment) {
            comment.comment=req.body.comment;
            comment.save();
            console.log("Comment edited: "+req.body.comment);
            res.json({success: true});
        } else {
            res.json({success: false});
        }
    })
})

module.exports = router;
