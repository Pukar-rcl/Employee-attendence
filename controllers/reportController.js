import response from "../utils/respose.js";
import Attendence from "../models/attendence.js";
import rangeValidator from "../utils/rangeValidator.js";
import errorDef from "../utils/errorDef.js";

export const attendenceCheck = async (req, res) => {
  const { from, to } = req.body;
  //2026-05-17

  if (!from || !to) {
    response(res, false, "missing parameters");
  }

  rangeValidator(res, from, to);

  const startDate = new Date(from);
  const endDate = new Date(to);

  startDate.setHours(0, 0, 0, 0);
  endDate.setHours(23, 59, 59, 999);

  const report = await Attendence.find({
    date: {
      $gt: startDate,
      $lt: endDate
    }
  })
    .populate("employee")
    .sort({ date: 1 })
    .select("employeeName date checkInStatus checkOutStatus");
  if (report.length === 0) {
    throw new errorDef(500, "Report data fetch failed");
  }
  return response(res, true, "report data :", report);
};
