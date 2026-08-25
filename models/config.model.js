import mongoose from "mongoose";

const configModel = new mongoose.Schema({
  punchInTime: { type: String, required: true },
  punchOutTime: { type: String, required: true }
});
export default mongoose.model("Configuration", configModel);
