import { Request, Response } from "express";
import { Note } from "../entities";
import { db } from "..";

export const createNote = async (req: Request, res: Response) => {
  const { title, content }: { title: string; content: string } = req.body;
  if (!title || !content)
    return res
      .status(400)
      .json({ message: "Title and content must be valid strings" });

  const note = new Note({
    title,
    content,
  });

  await db.em.persistAndFlush(note);
  return res.status(200).json({ message: "Note created successfully" });
};

export const getNotes = async (_: Request, res: Response) => {
  const notes = await db.em.find(Note, {});
  res.status(200).json(notes);
};
