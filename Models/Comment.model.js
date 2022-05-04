const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
    idObject: { type: 'string', required: true },
    idCustomer: { type: 'string', required: true },
    content: { type: 'string', defaultsTo: '' },
});

const Comment = mongoose.model("Comment", CommentSchema);
module.exports = Comment;
