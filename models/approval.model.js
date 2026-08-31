import mongoose from "mongoose";

const approvalModel = new mongoose.Schema({
  delayMinutes: { type: Number },
  employee: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Employee",
    required: true
  },
  employeeName : {type :String, required : true},
  managerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Manager",
    required: true
  },
});

export default mongoose.model('Approval', approvalModel);