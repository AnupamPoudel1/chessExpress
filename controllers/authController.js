const User = require('../model/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const handleLogin = async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) return res.status(400).json({ 'error': 'Username and password required' });

    // check for user in database
    const foundUser = await User.findOne({ username });
    if (!foundUser) return res.status(401).json({ 'error': 'User not found' }); //Unauthorized

    // evaluate password if user found
    const match = await bcrypt.compare(password, foundUser.password);
    if (match) {
        const roles = Object.values(foundUser.roles);
        //create JWT token if user login us succesful
        const accessToken = jwt.sign(
            {
                "UserInfo": {
                    "username": foundUser.username,
                    "roles": roles
                },
            },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '30m' }
        );
        const refreshToken = jwt.sign(
            { "username": foundUser.username },
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: '1d' }
        );
        // saving access and refresh token in the database
        foundUser.refreshToken = refreshToken;
        const result = foundUser.save();
        console.log(result);

        res.cookie('jwt', refreshToken, { httpOnly: true, sameSite: 'None', secure: true, maxAge: 24 * 60 * 60 * 1000 });
        res.json({ accessToken });
    } else {
        res.status(401).json({ 'error': 'Username and password does not match' }); //Unauthorized
    }
}

module.exports = { handleLogin };