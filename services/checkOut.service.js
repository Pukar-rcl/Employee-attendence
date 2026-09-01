import Configuration from "../models/config.model.js";
import errorDef from "../utils/errorDef.js";
import Attendence from "../models/attendence.js";

const checkOutsservice = async(res, id)=>{
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
}

export default checkOutsservice;