import express from "express";
import cors  from "cors";
import router from "./router/index.js";
import jwtCheck from "./middleware/authMiddleware.js";
import errorHandler from "./middleware/errorHandler.js";

const app = express();
app.use(express.json());
app.use(cors());

app.use('/api',jwtCheck, router);
app.use(errorHandler);

export default app;