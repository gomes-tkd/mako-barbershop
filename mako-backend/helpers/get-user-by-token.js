const jwt = require("jsonwebtoken");
const User = require("../model/UserModel");

// get user by JWT

async function getUserByToken(token) {
    if(!token) {
        res.status(401).json({ message: "Denied access!!" });
        return;
    }

    const decoded = jwt.verify(token, "nossosecret");
    const userId = decoded.id;

    const user = await User.findOne({ _id: userId });

    return user;
}

module.exports = getUserByToken;
