// process.route.ts
import { Router } from "express";
import {
  createProcess,
  getAllProcesses,
  getProcessById,
  updateProcess,
  deleteProcess,
} from "./process.controller";
import auth from "../../midleware/authMidleware";

const workingProcess = Router();

workingProcess.post("/", auth("ADMIN", "MODARATOR"), createProcess);
workingProcess.get("/", getAllProcesses);
workingProcess.get("/:id", getProcessById);
workingProcess.put("/:id", auth("ADMIN", "MODARATOR"), updateProcess);
workingProcess.delete("/:id", auth("ADMIN", "MODARATOR"), deleteProcess);

export default workingProcess;
