const Comment = require("../model/CommentModel");
const getToken = require("../helpers/get-token");
const getUserByToken = require("../helpers/get-user-by-token");

module.exports = class CommentController {
    static async postComment(req, res) {
        // getting the user
        const token = getToken(req);
        const user = await getUserByToken(token);

        if (!user) {
            res.status(401).json({ message: "Usuário precisa estar logado para postar um comentário"});
            return false;
        }

        const { authorId, authorName, commentText } = req.body;

        if(!commentText) {
            res.status(401).json({ message: "Campo do comentário deve ser preenchido"});
            return false;
        }

        // creating a new commentary
        const comment = new Comment({
            authorId: user._id,
            authorName: user.name,
            commentText
        });

        try {
            // save the comment on DB
            const newComment = await comment.save();

            res.status(201).json({ message: "new comment added with success", newComment });
            return true;
        } catch (e) {
            res.status(500).json({ massage: e.toString() });
            return false;
        }
    }

    static async getAllComments(req, res) {

        try {
            const comments = await Comment.find().sort("-createdAt");

            res.status(200).json({ message: "All comments at moment!", comments: comments });

            return true;
        } catch (e) {
            console.log(e.toString());
            return false;
        }

    }
}
