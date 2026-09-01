import response from "../utils/respose.js";
import Approval from "../models/approval.model.js";
import Manager from "../models/manager.model.js";
import Attendence from "../models/attendence.js";

const approvalService = async(req, res, manager_id, approval_id)=>{
    const manager = await Manager.findById(manager_id);

   if (!manager) {
    return response(res, false, "Incorrect manager ID:");
  }

  const pendingApproval = await Approval.findByIdAndUpdate(approval_id, {
    managerId: manager_id
  });

  if(pendingApproval.status === "approved"){
    response(res, false, "cannot approve: already approved");
  }

 const attendence = new Attendence({
    employee: pendingApproval.employee,
    employeeName : pendingApproval.employeeName,
    checkIn: pendingApproval.checkIn,
    date: pendingApproval.date,
    checkInStatus: pendingApproval.checkInStatus,
    checkInDelay: pendingApproval.checkInDelay
 })

 await attendence.save();

 const status_update = await Approval.findByIdAndUpdate(approval_id, {
    status : "approved"
  });

  if(!status_update){
    return response(res, false, "Updating status failed");
  }
}

export default approvalService;