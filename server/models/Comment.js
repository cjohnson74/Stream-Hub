const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = new Schema(
    {
        author: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Streamer',
        },
        title: {
            type: String,
        },
        body: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

const Comment = mongoose.model("Comment", CommentSchema);

module.exports = Comment;