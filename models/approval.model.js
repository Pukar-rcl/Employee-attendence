import mongoose from "mongoose";

const approvalModel = new mongoose.Schema({
  employee: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Employee",
    required: true
  },
  checkIn: { type: Date },
  employeeName: { type: String },
  date: { type: Date, required: true },
  checkInStatus: { type: String, enum: ["on time", "delay", "absent"] },
  checkInDelay: { type: Number, default: 0 },
  managerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Manager"
  },
  status: {
    type: String,
    enum: ["unapproved", "approved"],
    default: "unapproved"
  }
});

export default mongoose.model("Approval", approvalModel);
