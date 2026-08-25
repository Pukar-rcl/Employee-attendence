import response from "../utils/respose.js";
import Employee from "../models/employee.js";
import Configuration from "../models/config.model.js";
import errorDef from "../utils/errorDef.js";
import Attendence from "../models/attendence.js";

export const checkIn = async (req, res) => {
  const id = req.headers.id;

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

  const attendanceEntry = new Attendence({
    employee: id,
    checkIn: date,
    date: today,
    checkInStatus: mark,
    checkInDelay: inDelay
  });

  await attendanceEntry.save();

  return response(res, true, "Attedence recorded");
};

export const checkOut = async (req, res) => {
  const id = req.headers.id;

  const date = new Date();

  const today = new Date(date);
  today.setHours(0, 0, 0, 0);

  const hours = date.getHours();
  const minutes = date.getMinutes();

  const configuration = await Configuration.findOne();

  if (!configuration) {
    throw new errorDef(500, "Configuration not found");
  }

  const [outHours, outMinutes] = configuration.punchOutTime
    .split(":")
    .map(Number);

  const outTime = outHours * 60 + outMinutes;
  const totalMinutes = hours * 60 + minutes;

  let mark = "on time";
  let delay = 0;
  let extra = 0;

  if (totalMinutes < 14 * 60) {
    mark = "half";
  } else if (totalMinutes < outTime) {
    mark = "early";
    delay = outTime - totalMinutes;
  } else if (totalMinutes > outTime) {
    mark = "overtime";
    extra = totalMinutes - outTime;
  }

  const entry = await Attendence.findOneAndUpdate(
    {
      employee: id,
      date: today
    },
    {
      checkOut: date,
      checkOutStatus: mark,
      extraTime: extra,
      checkOutEarly: delay
    }
  );

  if (!entry) {
    throw new errorDef(
      404,
      "Attendance record not found for this employee today"
    );
  }

  return response(res, 200, "checked Out successfully");
};
