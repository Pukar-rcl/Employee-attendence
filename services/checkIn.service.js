import response from "../utils/respose.js";
import Employee from "../models/employee.js";
import Configuration from "../models/config.model.js";
import errorDef from "../utils/errorDef.js";
import Attendence from "../models/attendence.js";
import Approval from "../models/approval.model.js";

const checkInService = async(req, res, id)=>{
    const employee = await Employee.findById(id);

  if (!employee) {
    return response(res, false, "Employee not found");
  }
  const date = new Date();

  const today = new Date(date);
  today.setHours(0, 0, 0, 0);

  const hours = date.getHours();
  const minutes = date.getMinutes();

  const configuration = await Configuration.findOne();

  if (!configuration) {
    throw new errorDef(500, "Configuration not found");
  }

  const currentMinutes = hours * 60 + minutes;

  const [inHours, inMinutes] = configuration.punchInTime.split(":").map(Number);

  const configInMinutes = inHours * 60 + inMinutes;

  const checkinMinutes = currentMinutes - configInMinutes;

  let mark = "on time";
  let inDelay = 0;

  if (checkinMinutes > 0) {
    mark = "delay";
    inDelay = checkinMinutes;
  }

  if(mark === "delay"){
    const approval  = new Approval({
    employee: id,
    employeeName : employee.name,
    checkIn: date,
    date: today,
    checkInStatus: mark,
    checkInDelay: inDelay
  });
    await approval.save();

    return response(res, true, "Please wait for approval");
  }

  const attendanceEntry = new Attendence({
    employee: id,
    employeeName : employee.name,
    checkIn: date,
    date: today,
    checkInStatus: mark,
    checkInDelay: inDelay
  });

  await attendanceEntry.save();
}

export default checkInService;