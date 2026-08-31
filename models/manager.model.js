import mongoose from "mongoose";

const managerSchema = mongoose.Schema({
    name : {type : String, required : true},
})

export default mongoose.model('Manager', managerSchema);