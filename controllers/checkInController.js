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

  let mark = "absent",
    inDelay;
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
