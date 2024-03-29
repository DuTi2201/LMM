require('dotenv').config();
import express from "express";
import expressLayout from 'express-ejs-layouts';
import configViewEngine from "./config/viewEngine";
import initWebRoutes from "./routes/web";
import bodyParser from "body-parser";
import cookieParser from 'cookie-parser';
import session from "express-session";
import connectFlash from "connect-flash";
import passport from "passport";

let app = express();



//config session
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 // 86400000 1 day
    }
}));

// Enable body parser post data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//use cookie parser
app.use(cookieParser());

//Config view engine
configViewEngine(app);

//Enable flash message
app.use(connectFlash());

app.use(express.static('public'));

// Templating Engine
app.use(expressLayout);
app.set('layout', './layouts/main');
app.set('view engine', 'ejs');

//Config passport middleware
app.use(passport.initialize());
app.use(passport.session());

// init all web routes
initWebRoutes(app);

app.use((req, res) => {
    return res.send('404 not found')
})

let port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Building LMM system is running on port ${port}!`));
