import express from "express";
import morgan from "morgan";

import route from "./routes/posts.routes";

const app = express();

//setings
app.set('port',4444);

//middlewares
app.use((req, res, next) => {

    res.setHeader('Access-Control-Allow-Origin', '*');
 
    res.setHeader('Access-Control-Allow-Methods', 'GET');
 
    res.setHeader('Access-Control-Allow-Headers', '*');
 
 next();
 });
app.use(morgan('dev'));

//routes
app.use('/api/testing',route);

export default app;