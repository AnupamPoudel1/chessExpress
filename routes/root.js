const express = require('express');
const router = express.Router();
const path = require('path');

router.get('^/$|/index(.html)?', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'views', 'index.html'));
});
router.get('/login(.html)?', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'views', 'login.html'));
});
router.get('/register(.html)?', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'views', 'register.html'));
});
router.get('/game(.html)?', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'views', 'game.html'));
});

module.exports = router;