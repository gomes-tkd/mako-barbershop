const router = require("express").Router();
const UserController = require("../controller/UserController");

// middleware
const verifyToken = require("../helpers/verify-token");
const { imageUpload } = require("../helpers/image-upload");

// POSTS
router.post("/register", UserController.register);
router.post("/login", UserController.login);

// GETS
router.get("/checkuser", UserController.checkUser);
router.get("/:id", UserController.getUserById);

// PROTECTED ROUTES
// --> verify user's token
// --> make the image upload, only one per time
router.patch("/edit/:id", verifyToken, imageUpload.single("image"),UserController.editUser);

module.exports = router;
