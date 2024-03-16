import express from "express";
import bodyParser from "body-parser";
import cookieParser from 'cookie-parser';
import configViewEngine from './config/viewEngine';
import initWebRoutes from './routes/web';
import initApiRoutes from './routes/api';
import configCors from './config/cors';
import connectDB from './config/connectDB';
import { configPassport } from './controller/passportController'; 
// import cors from 'cors';

require('dotenv').config();
let app = express();
//staticFile
// app.use(cors({ origin: true }));

// //config cors
// configCors(app);

//config view engine
configViewEngine(app);

//config body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//cofig cookie-parser
app.use(cookieParser());


//connection db
connectDB();


//init web routes
initWebRoutes(app);
// initApiRoutes(app);

//req =>middleware => res
app.use((req, res) => {
    return res.send('404 not found')
})

configPassport();


let port = process.env.PORT;

app.listen(port, () => {
    console.log("Backend Nodejs is running on the port: " + port)
})