const mongoose = require("mongoose");

const Schema = mongoose.Schema;

let codeSchema = new Schema ({
    code: {type: String},
    user: {type: String},
    like: {type: Number},
    dislike: {type: Number},
    code_clicked: {type: Boolean},
    users_voted: {type: Array}
});

module.exports = mongoose.model("codes", codeSchema);
