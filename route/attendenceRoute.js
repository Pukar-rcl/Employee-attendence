import {checkIn, checkOut} from "../controllers/checkInController.js"
import { Router } from "express";
import asyncWrapper from "../utils/asyncWrapper.js"
import loggerMiddleware from "../middleware/loggerMiddleware.js";
import { attendenceCheck } from "../controllers/reportController.js";

const router = Router();

router.post('/in', loggerMiddleware,asyncWrapper(checkIn));
router.post('/out', loggerMiddleware, asyncWrapper(checkOut));
router.post('/report', loggerMiddleware, asyncWrapper(attendenceCheck));

export default router;