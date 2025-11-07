import express from "express";
import cors from "cors"
import router from "./router/index.router";
import jwtCheck from "./middlewares/jwtbearer.middleware";
import errorHandler from "./middlewares/errorhandler.middleware";

const app = express();


app.use(cors());
app.use(express.json({
	strict:false
}));

app.use('/api', jwtCheck, router);

app.use(errorHandler);

export default app;


