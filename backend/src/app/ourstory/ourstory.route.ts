import { Router } from "express";
import {
  upsertStory,
  getAllStories,
  getStoryById,
  updateStory,
  deleteStory,
} from "./ourstory.controller";
import auth from "../../midleware/authMidleware";

const ourstoryRouter = Router();

// CREATE বা UPSERT
ourstoryRouter.post(
  "/",
  auth("ADMIN", "MODERATOR"),
  upsertStory,
);

// GET ALL
ourstoryRouter.get("/", getAllStories);

// GET ONE
ourstoryRouter.get("/:id", getStoryById);

// UPDATE
ourstoryRouter.put(
  "/:id",
  auth("ADMIN", "MODERATOR"),
  updateStory,
);

// DELETE
ourstoryRouter.delete(
  "/:id",
  auth("ADMIN", "MODERATOR"),
  deleteStory,
);

export default ourstoryRouter;