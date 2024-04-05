const mongoose = require("../db/conn");
const { Schema } = mongoose;

const Comment = mongoose.model(
    "Comment",
    new Schema({
            authorId: {
                type: String,
                required: true
            },
            authorName: {
                type: String,
                required: true
            },
            commentText: {
                type: String,
                required: true
            },
        },
        {
            timestamps: true
        })
);

module.exports = Comment;
