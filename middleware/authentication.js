const jwt = require('jsonwebtoken');

const authentication = (req, res, next) => {
    const token = req.headers.authorization;
    if (token) {
        jwt.verify(token, process.env.secret_key, (err, decode) => {
            if (decode) {
                email = decode.user_email;
                next();
            } else {
                console.log({ "messege": err });
            }
        })
    } else {
        res.send('Protected Route, Login first!')
    }
}

module.exports = { authentication };