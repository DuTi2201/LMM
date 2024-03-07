import express from "express";
import bodyParser from "body-parser";
import configViewEngine from './config/viewEngine';
import initWebRoutes from './routes/web';
import connectDB from './config/connectDB';
// import cors from 'cors';

require('dotenv').config();
let app = express();
//staticFile
// app.use(cors({ origin: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// app.get('/favico.ico', (req, res) => {
//     res.sendFile(path.join(__dirname, 'public', 'favico.ico'));
// });



connectDB();

configViewEngine(app);

initWebRoutes(app);


let port = process.env.PORT;

app.listen(port, () => {
    console.log("Backend Nodejs is running on the port: " + port)
})