import response from "../utils/respose.js";
import checkInService from "../services/checkIn.service.js";
import checkOutsservice from "../services/checkOut.service.js";

export const checkIn = async (req, res) => {
  const id = req.headers.id;

  await checkInService(req, res, id);

  return response(res, true, "Attedence recorded");
};

export const checkOut = async (req, res) => {
  const id = req.headers.id;

  await checkOutsservice(res, id);

  return response(res, 200, "checked Out successfully");
};
