const mongoose = require("mongoose");

const Schema = mongoose.Schema;

let commentSchema = new Schema ({
    comment: {type: String},
    user: {type: String},
    code: {type: String},
    like: {type: Number},
    dislike: {type: Number},
    users_voted: {type: Array}
});

module.exports = mongoose.model("comments", commentSchema);
