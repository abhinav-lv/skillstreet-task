import { Router } from "express";
import { createNote, getNotes } from "../controllers/note";

const noteRouter = Router();

noteRouter.get("/get", getNotes);

noteRouter.post("/create", createNote);

export { noteRouter };
