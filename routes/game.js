const express = require('express');
const router = express.Router();
const path = require('path');

router.get('/home(.html)?', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'views', 'home.html'));
});
router.get('/magnus(.html)?', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'views', 'SecondbotGame.html'));
});
router.get('/hikaru(.html)?', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'views', 'FirstbotGame.html'));
});

module.exports = router;