import express from "express";
//import compression from "compression";
import router from "./router/index.js";

const app = express();
//app.use(compression()); 
app.use(express.json());

app.use('/api', router);


export default app;