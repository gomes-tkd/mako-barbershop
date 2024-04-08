function getToken(req) {
    try {
        // extract token from header and clean - remove "Bearer " from token
        const authHeader = req.headers.authorization;

        // get the token
        const token = authHeader.split(" ")[1];

        return token;
    } catch (e) {
        console.log(e.message);
        return false;
    }

}

module.exports = getToken;
