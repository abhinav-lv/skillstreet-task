import { NextFunction, Request, Response } from "express";
import { Note } from "../entities";
import { db } from "..";
import { CreateNoteDto } from "../dto/createNote.dto";
import { UpdateNoteDto } from "../dto/updateNote.dto";
import { wrap } from "@mikro-orm/core";
import errorResponse from "../lib/errorResponse";

const NOTE_NOT_FOUND_MESSAGE = "Requested note was not found in the database";

export const createNote = async (req: Request, res: Response) => {
  const { title, content }: CreateNoteDto = req.body;

  const note = new Note({
    title,
    content,
  });

  await db.em.persistAndFlush(note);
  res
    .status(200)
    .json({ statusCode: 200, message: "Note created successfully" });
};

export const updateNote = async (req: Request, res: Response) => {
  const { id, title, content }: UpdateNoteDto = req.body;
  const note = await db.em.findOne(Note, { id });
  if (!note)
    return errorResponse({
      statusCode: 400,
      message: NOTE_NOT_FOUND_MESSAGE,
      res,
    });
  wrap(note).assign({
    title: title ?? note.title,
    content: content ?? note.content,
  });
  await db.em.flush();
  res
    .status(200)
    .json({ statusCode: 200, message: "Note updated successfully" });
};

export const getNotes = async (req: Request, res: Response) => {
  const queryId = req.query.id;
  const id = typeof queryId === "string" ? queryId : null;

  if (id) {
    const note = await db.em.findOne(Note, { id });
    if (!note)
      return errorResponse({
        statusCode: 400,
        message: NOTE_NOT_FOUND_MESSAGE,
        res,
      });
    res.json(note);
  } else {
    const notes = await db.em.find(Note, {});
    res.status(200).json(notes);
  }
};

export const deleteNote = async (req: Request, res: Response) => {
  const id = req.params.id;

  const note = await db.em.findOne(Note, { id });
  if (!note)
    return errorResponse({
      statusCode: 400,
      message: NOTE_NOT_FOUND_MESSAGE,
      res,
    });

  await db.em.remove(note).flush();
  res
    .status(200)
    .json({ statusCode: 200, message: "Note deleted successfully" });
};
