const jwt = require('jsonwebtoken')

const authenticate = async (req, res, next) => {
    console.log('req :>> ', req.headers);
    // Get the auth header value
    const bearerHeader = req.headers;
    // check if bearer is undefined
    if (typeof bearerHeader !== 'undefined') {
        console.log('bearerHeader :', bearerHeader);
        // Split at the space
        const bearer = bearerHeader.authorization.split(' ');
        console.log('token...', bearer)
        // Get token from bearer array
        const bearerToken = bearer[1]
        // Set the token
        req.token = bearerToken;
        // Verify token
        let user = await jwt.verify(req.token, 'secretword')

        req.user = user
        // Next middleware
        next();
    } else {
        // Forbidden
        res.sendStatus(403)
    }
}




module.exports = authenticate;
