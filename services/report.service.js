import errorDef from "../utils/errorDef.js";

const reportService = async (from, to) => {
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

  return report;
};
export default reportService;