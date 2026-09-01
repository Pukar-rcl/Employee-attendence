import {
  showApproval,
  approveDelay
} from "../controllers/approvalController.js";
import { Router } from "express";
import loggerMiddleware from "../middleware/loggerMiddleware.js";
import asyncWrapper from "../utils/asyncWrapper.js";

const router = Router();

router.post("/records", loggerMiddleware, asyncWrapper(showApproval));
router.post("/approve", loggerMiddleware, asyncWrapper(approveDelay));

export default router;
