// process.route.ts
import { Router } from "express";
import {
  createProcess,
  getAllProcesses,
  getProcessById,
  updateProcess,
  deleteProcess,
} from "./process.controller";

const workingProcess = Router();

workingProcess.post("/", createProcess);
workingProcess.get("/", getAllProcesses);
workingProcess.get("/:id", getProcessById);
workingProcess.put("/:id", updateProcess);
workingProcess.delete("/:id", deleteProcess);

export default workingProcess;
