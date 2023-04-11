const jwt = require('jsonwebtoken');    // importing jsonwebToken
const JWT_SECRET = "ThisIsMERNproject#10"   // server secrete key (not left open, should be kept safe)

const fetchuser = (req, res, next) => {
    // get user from jwt token and add id to request object
    const token = req.header("auth-token")  // this is our header token
    if (!token) {
        res.status(401).send({ error: "Please authenticate using valid token" })
    }
    try {
        const data = jwt.verify(token, JWT_SECRET)  // verifying token
        req.user = data.user
        next()  // give this result to next request, response
    } catch (error) {
        res.status(401).send({ error: "Please authenticate using valid token" })
    }
}

module.exports = fetchuser