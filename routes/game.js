const express = require('express');
const router = express.Router();
const path = require('path');

router.get('/game(.html)?', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'views', 'game.html'));
});

module.exports = router;