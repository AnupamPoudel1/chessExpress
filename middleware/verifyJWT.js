const jwt = require('jsonwebtoken');

const verifyJWT = (req, res, next) => {
    const token = req.cookies.jwt;

    if (token) {
        jwt.verify(
            token,
            process.env.REFRESH_TOKEN_SECRET,
            (err, decoded) => {
                if (err) {
                    console.log(err.message);
                    res.redirect('/login');
                } else {
                    console.log(decoded);
                    next();
                }
            }
        )
    } else {
        res.redirect('/login');
    }
}

module.exports = verifyJWT;