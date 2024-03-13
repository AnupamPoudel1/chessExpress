const jwt = require('jsonwebtoken');

const verifyJWT = (req, res, next) => {
    // const authHeader = req.headers.authorization || req.headers.Authorization;
    // if (!authHeader?.startsWith('Bearer ')) return res.sendStatus(401); //unauthorized access
    // const token = authHeader.split(' ')[1];
    // jwt.verify(
    //     token,
    //     process.env.ACCESS_TOKEN_SECRET,
    //     (err, decoded) => {
    //         if (err) {
    //             res.sendStatus(403);    //the token is available but is tampered with
    //             res.redirect('/login');
    //         } else {
    //             req.user = decoded.UserInfo.username;
    //             req.roles = decoded.UserInfo.roles;
    //             next();
    //         }
    //     }
    // )

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