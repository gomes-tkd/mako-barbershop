function getToken(req) {
    // extract token from header and clean - remove "Bearer " from token
    const authHeader = req.headers.authorization;

    // get the token
    const token = authHeader.split(" ")[1];

    return token;
}

module.exports = getToken;
