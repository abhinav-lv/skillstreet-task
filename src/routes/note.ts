import { Router } from "express";
import {
  createNote,
  deleteNote,
  getNotes,
  updateNote,
} from "../controllers/note";
import dtoValidationMiddleware from "../lib/middleware/validation";
import { CreateNoteDto } from "../dto/createNote.dto";
import { UpdateNoteDto } from "../dto/updateNote.dto";

const noteRouter = Router();

noteRouter.get("/get", getNotes);

noteRouter.post("/create", dtoValidationMiddleware(CreateNoteDto), createNote);

noteRouter.put("/update", dtoValidationMiddleware(UpdateNoteDto), updateNote);

noteRouter.delete("/delete/:id", deleteNote);

export { noteRouter };
