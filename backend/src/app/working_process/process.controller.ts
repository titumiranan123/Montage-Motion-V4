// process.controller.ts
import { Request, Response } from "express";
import { asyncHandler } from "../../midleware/asyncHandler";
import { processService } from "./process.service";
import { responseHandler } from "../../utils/responseHandler";

// Create Process
export const createProcess = asyncHandler(
  async (req: Request, res: Response) => {
    const result = await processService.createProcess(req.body);
    return responseHandler(
      res,
      201,
      true,
      "Process created successfully",
      result
    );
  }
);

// Get All Processes
export const getAllProcesses = asyncHandler(
  async (_req: Request, res: Response) => {
    const result = await processService.getAllProcesses();
    return responseHandler(res, 200, true, "All processes fetched", result);
  }
);

// Get Process By ID
export const getProcessById = asyncHandler(
  async (req: Request, res: Response) => {
    const result = await processService.getProcessById(req.params.id);
    if (!result) return responseHandler(res, 404, false, "Process not found");
    return responseHandler(res, 200, true, "Process fetched", result);
  }
);

// Update Process
export const updateProcess = asyncHandler(
  async (req: Request, res: Response) => {
    const result = await processService.updateProcess(req.params.id, req.body);
    return responseHandler(
      res,
      200,
      true,
      "Process updated successfully",
      result
    );
  }
);

// Delete Process
export const deleteProcess = asyncHandler(
  async (req: Request, res: Response) => {
    const result = await processService.deleteProcess(req.params.id);
    if (!result) return responseHandler(res, 404, false, "Process not found");
    return responseHandler(
      res,
      200,
      true,
      "Process deleted successfully",
      result
    );
  }
);
