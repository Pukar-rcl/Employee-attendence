import express from "express";
import attendenceRoute from "./route/attendenceRoute.js";
import logger from "./config/logger.js";
import errorMiddleware from './middleware/errorMiddleware.js'

const app = express();

app.use('/attendance', attendenceRoute);

app.use(errorMiddleware);

app.listen(process.env.PORT, ()=>{
    logger.info("port running at ", process.env.PORT)
});