const express = require('express');
const dotenv = require('dotenv');
const expressLayout = require('express-ejs-layouts');
const session = require('express-session');
const flash = require('connect-flash');
require('./config/mongoose');
const Middleware = require('./config/middleware');

const app = express();

dotenv.config();

// Middleware
app.use(express.static('./assets'));
app.use(express.urlencoded({ extended: true }));
app.use(expressLayout);
// styles
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

// View engine
app.set('view engine', 'ejs');
app.set('views', './views');

// Session
app.use(session({
    secret: process.env.SECRET, 
    saveUninitialized: true,
    resave: true
}));

// Flash
app.use(flash());
app.use(Middleware.setFlash);

// Router
app.use('/', require('./routes'));

// Port
const port = process.env.PORT || 8200;
app.listen(port, () => {
    console.log("Connected successfully");
});
