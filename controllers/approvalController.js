import response from "../utils/respose.js";
import Approval from "../models/approval.model";
import Manager from "../models/manager.model.js";
import Attendence from "../models/attendence.js";
import errorDef from "../utils/errorDef.js";

export const showApproval = async (req, res) => {
  const approval = Approval.find();

  if (approval.length === 0) {
    return response(res, true, "Nothing to approve");
  }

  return response(res, true, "approval due: ", approval);
};

export const approveDelay = async (req, res) => {
  const { approval_id, manager_id } = req.headers;
  
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

  return response(res, true, "Successfully approved");
};
