const User = require('../model/User');
const bcrypt = require('bcrypt');

const handleNewUser = async (req, res) => {
    const { username, email, password } = req.body;
    if (!username || !password || !email) return res.status(400).json({ 'message': 'username and password required' });

    // check for duplicates in database
    const duplicate = await User.findOne({ username: username, email: email }).exec();
    if (duplicate) return res.sendStatus(409); //confilict

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
        res.status(500).json({ 'message': err.message });
    }
}

module.exports = { handleNewUser };