require('dotenv').config();
const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const corsOptions = require('./config/corsOptions');
const verifyJWT = require('./middleware/verifyJWT');
const cookieParser = require('cookie-parser');
const credentials = require('./middleware/credentials');
const mongoose = require('mongoose');
const connectDB = require('./config/dbConn');
const PORT = process.env.PORT || 3500;

// connect ot mongoDB
connectDB();

// cross origin resource sharing
app.use(credentials);
app.use(cors(corsOptions));

app.use(express.urlencoded({ extended: false }));

// built-in middleware for json
app.use(express.json());

// middleware for cookies
app.use(cookieParser());

// serve static file
app.use(express.static(path.join(__dirname, '/public')));

// routes
app.use('/', require('./routes/root'));
app.use('/register', require('./routes/register'));
app.use('/auth', require('./routes/auth'));
app.use('/refresh', require('./routes/refresh'));
app.use('/logout', require('./routes/logout'));

app.get('/home', verifyJWT, require('./routes/game'));
app.get('/magnus', verifyJWT, require('./routes/game'));
app.get('/hikaru', verifyJWT, require('./routes/game'));

app.all('*', (req, res) => {
    res.status(404);
    if (req.accepts('html')) {
        res.sendFile(path.join(__dirname, 'views', '404.html'));
    } else if (req.accepts('json')) {
        res.json({ 'error': '404 not found' });
    } else {
        res.type('txt').send("404 error!! Not found");
    }
});

mongoose.connection.once('open', () => {
    console.log("connected to mongo db");
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
