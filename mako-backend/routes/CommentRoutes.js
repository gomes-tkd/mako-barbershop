const router = require("express").Router();
const verifyToken = require("../helpers/verify-token");
const CommentController = require("../controller/CommentController");

// GETS
router.get("/", CommentController.getAllComments);

// protected routes
router.post("/postcomment", verifyToken, CommentController.postComment);


module.exports = router;
