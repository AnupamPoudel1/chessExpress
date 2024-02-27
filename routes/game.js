const express = require('express');
const router = express.Router();
const path = require('path');
const rolesList = require('../config/rolesList');
// const verifyRoles = require('../middleware/verifyRoles');

// router.get('/game(.html)?', verifyRoles(rolesList.Admin, rolesList.User), (req, res) => {
//     res.sendFile(path.join(__dirname, '..', 'views', 'game.html'));
// });
router.get('/game(.html)?', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'views', 'game.html'));
});

module.exports = router;