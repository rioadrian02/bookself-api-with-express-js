import 'dotenv/config';

import express from "express";
import routes from "../routes/index.js";
import cors from "cors";
import ErrorHandler from "../middlewares/error.js";

const app = express();

app.use(express.json());
app.use(cors({
    origin: "*"
}));
app.use(routes);
app.use(ErrorHandler);

export default app;
