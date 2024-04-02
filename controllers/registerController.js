const User = require('../model/User');
const bcrypt = require('bcrypt');

const handleNewUser = async (req, res) => {
    const { username, email, password } = req.body;
    if (!username || !password || !email) return res.status(400).json({ 'error': 'username, email and password required' });

    // check for duplicates in database
    const duplicateUsername = await User.findOne({ username: username }).exec();
    const duplicateEmail = await User.findOne({ email: email }).exec();
    if (duplicateUsername) return res.status(409).json({ "error": "Username already taken. Use another username" }); //confilict
    if (duplicateEmail) return res.status(409).json({ "error": "Email already in use. Use another email" }); //confilict

    try {
        // encrypting the message format: (pass, saltOrRounds)
        const encryptedPsw = await bcrypt.hash(password, 10);

        // create and store username and password
        const result = await User.create({
            'username': username,
            'email': email,
            'password': encryptedPsw
        });

        console.log(result);
        res.status(201).json({ 'success': 'new user was registered successfully' });
    } catch (err) {
        res.status(500).json({ 'error': err.message });
    }
}

module.exports = { handleNewUser };