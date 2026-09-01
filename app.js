import express from "express";
import attendenceRoute from "./route/attendenceRoute.js";
import logger from "./config/logger.js";
import errorMiddleware from "./middleware/errorMiddleware.js";
import { configDotenv } from "dotenv";
import connectDb from "./config/db.js";
import approvalRoute from './route/approvalRoute.js'

const app = express();
app.use(express.json());
configDotenv();

connectDb();
app.use("/attendance", attendenceRoute);//attendance/in attendance/out
app.use("/attendance", approvalRoute); //approval 

app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
  logger.info(`port running at  ${process.env.PORT}`);
});
