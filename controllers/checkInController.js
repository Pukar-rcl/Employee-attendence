import { response } from "express";
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

  const { dateKey, timeKey } = date.toISOString().split("T");

  const { hours, minute } = timeKey.split(":").map(Number);
  const configuration = await Configuration.findOne();

  if (!configuration) {
    throw new errorDef(500, "configuration not found");
  }

  const CurrentinMinutes = hours * 60 + minute;

  const { inHours, inMinutes } = configuration.punchInTime
    .split(":")
    .map(Number);

  const configIntime = inHours * 60 + inMinutes;

  const checkinMinutes = CurrentinMinutes - configIntime;

  let mark, inDelay;
  if (checkinMinutes > 0) {
    mark = "delay";
    inDelay = checkinMinutes;
  } else {
    mark = "on time";
  }

  const attendenceEntry = new Attendence({
    employee: id,
    checkIn: timeKey,
    date: dateKey,
    checkInStatus: mark
  });

  await attendenceEntry.save();

  return response(res, true, "Attedence recorded");
};

export const checkOut = async (req, res) => {
  const id = req.headers.id;

  const date = new Date();

  const { dateKey, timeKey } = date.toISOString().split("T");

  const { hours, minutes } = timeKey.split(":").map(Number);

  const configurtion = await Configuration.findOne();

  if (!configurtion) {
    throw new errorDef(500, "configuration not found");
  }

  const { outHours, outMinutes } = configurtion.punchOutTime
    .split(":")
    .map(Number);

  const outTime = outHours * 60 + outMinutes;

  const totalMinutes = hours * 60 + minutes;

  let mark = "on time",
    delay,
    extra = 0;

  if (outTime < totalMinutes) {
    mark = "early";
    delay = outTime - totalMinutes;
  }

  if (totalMinutes < 840) {
    mark = "half day";
    delay = outTime - 840;
  }

  if (totalMinutes < outTime) {
    mark = "overtime";
    extra = Math.abs(outTime - totalMinutes);
    delay = 0;
  }

  const entry = await Attendence.findOneAndUpdate(
    { employee: id, date: dateKey },
    {
      checkOut: timeKey,
      checkOutStatus: mark,
      extraTime: extra,
      checkOutEarly: delay
    }
  );

  if(!entry){
    throw new errorDef(500, "Employee id not found in Attendence Database")
  }

  return response(res, true, "Check out successful");
};
