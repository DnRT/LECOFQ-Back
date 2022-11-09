import express from "express";
import morgan from "morgan";
import cors from 'cors';

import routePosts from "./routes/posts.routes";
import routeClimate from "./routes/climate.routes";

const app = express();

//setings
app.set('port',4444);


//middlewares
app.use(cors());
app.use((req, res, next) => {

    res.setHeader('Access-Control-Allow-Origin', '*');
 
    res.setHeader('Access-Control-Allow-Methods', '*');
 
    res.setHeader('Access-Control-Allow-Headers', '*');
 
 next();
 });
app.use(morgan('dev'));

//routes
app.use('/api/noticias',routePosts);
app.use('/api/clima',routeClimate);

export default app;