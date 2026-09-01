import response from "../utils/respose.js";
import rangeValidator from "../utils/rangeValidator.js";
import reportService from "../services/report.service.js";

export const attendenceCheck = async (req, res) => {
  const { from, to } = req.body;
  //2026-05-17

  if (!from || !to) {
    response(res, false, "missing parameters");
  }

  rangeValidator(res, from, to);

  const report = await reportService(from, to);
  return response(res, true, "report data :", report);
};
