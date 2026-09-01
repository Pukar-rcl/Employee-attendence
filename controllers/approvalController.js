import response from "../utils/respose.js";
import Approval from "../models/approval.model.js";
import approvalService from "../services/approval.service.js";

export const showApproval = async (req, res) => {
  const approval = await Approval.find().select("-__v");

  if (approval.length === 0) {
    return response(res, true, "Nothing to approve");
  }

  return response(res, true, "approval due: ", approval);
};

export const approveDelay = async (req, res) => {
  const { approval_id, manager_id } = req.headers;
  
  await approvalService(req, res, manager_id, approval_id);

  return response(res, true, "Successfully approved");
};
