import mongoose from "mongoose"

const configModel = new mongoose.Schema({
    punchInTime : {type : Date, required : true},
    punchOutTime : {type : Date, required : true}
})
export default mongoose.model('Configuration', configModel);