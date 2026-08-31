import mongoose from "mongoose"

const attendence = new mongoose.Schema({
  employee: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Employee",
    required: true
  },
  checkIn: { type: Date},
  checkOut: { type: Date },
  employeeName : {type  : String},
  date: { type: Date, required: true },
  checkInStatus: { type: String, enum: ["on time", "delay", "absent"]},
  checkOutStatus: { type: String, enum: ["on time", "early", "overtime", "half"] },
  checkInDelay : {type : Number, default : 0},
  checkOutEarly : {type : Number, default : 0},
  extraTime : {type : Number, default : 0}
});
 attendence.index(
  { employee: 1, date: 1 },
  { unique:true }
);

export default mongoose.model('Attendence', attendence);