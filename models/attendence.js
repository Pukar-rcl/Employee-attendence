const attendence = new mongoose.Schema({
  employee: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Employee",
    required: true
  },
  checkIn: { type: Date, required: true },
  checkout: { type: Date, required: true },
  date: { type: Date, required: true },
  checkInStatus: { type: String, enum: ["on time", "delay", "absent"], default : "absent" },
  checkOutStatus: { type: String, enum: ["on time", "early", "overtime", "half"] },
  checkInDelay : {type : Number, default : 0},
  checkOutEarly : {type : Number, default : 0},
  extraTime : {type : Number, default : 0}
});

export default mongoose.model('Attendence', attendence);