import {checkIn} from "../controllers/checkInController.js"
import { Router } from "express";
import asyncWrapper from "../utils/asyncWrapper.js"
import loggerMiddleware from "../middleware/loggerMiddleware.js";
const router = Router();

router.post('/in', loggerMiddleware,asyncWrapper(checkIn));

export default router;