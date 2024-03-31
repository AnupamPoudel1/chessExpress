const express = require('express');
const router = express.Router();
const path = require('path');

router.get('/game(.html)?', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'views', 'FirstbotGame.html'));
});
router.get('/game2(.html)?', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'views', 'SecondbotGame.html'));
});

module.exports = router;