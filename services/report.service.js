import errorDef from "../utils/errorDef.js";
import checkString from "../utils/joiStringChecker.js";
import response from "../utils/respose.js";

const reportService = async (from, to, filter) => {
  const startDate = new Date(from);
  const result = checkString(filter);

  if(result === false){
    return response(response, false, "Invalid filtering body");
  }

  startDate.setHours(0, 0, 0, 0);
  endDate.setHours(23, 59, 59, 999);
  
  const report = await Attendence.find({status : filter},{
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